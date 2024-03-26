import base64
import requests
from requests_toolbelt.multipart import decoder
import boto3
import os
import time
import hashlib
import json
import logging
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('accounts')

def lambda_handler(event, context):
    # Parse incoming event data
    body = event["body"]
    if event["isBase64Encoded"]:
        body = base64.b64decode(body)
    content_type = event["headers"]["content-type"]
    data = decoder.MultipartDecoder(body, content_type)

    binary_data = [part.content for part in data.parts]
    # Extract item information from the event data
    email = binary_data[0].decode()
    edited_field = binary_data[1].decode()
    
    # Check if the account exists
    response = table.get_item(
        Key={
            'account_id': email
        }
    )
    
    # If account doesn't exist, return error response
    if 'Item' not in response:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Account not found'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    if (edited_field == "profile_picture"):
         # Save the uploaded image to /tmp folder
        key = "closet.png"
        file_name = os.path.join("/tmp", key)
        with open(file_name, "wb") as f:
            f.write(binary_data[2])

        # Upload image to Cloudinary
        img_res = upload_to_cloudinary(file_name)
        new_value = img_res["url"]
    else:
        new_value = binary_data[2].decode()

    # Update the specified field with the new value
    update_expression = f"set #n = :val"
    expression_attribute_values = {":val": new_value}
    expression_attribute_names = {"#n": "name" if edited_field == "name" else edited_field}
    
    try:
        table.update_item(
            Key={
                'account_id': email
            },
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ExpressionAttributeNames=expression_attribute_names
        )
        
        # Prepare success response
        return {
            'statusCode': 200,
            'body': json.dumps({'message': f'Account {edited_field} updated successfully'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    except Exception as e:
        # Handle update error
        return {
            'statusCode': 500,
            'body': json.dumps({'message': f'Failed to update account {edited_field}: {str(e)}'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }

def upload_to_cloudinary(filename, resource_type="image", extra_fields={}):
    # Set up logging
    logging.basicConfig(level=logging.DEBUG)

    # Uploads file at filename path to Cloudinary
    # ADD YOUR OWN HERE
    api_key = "398899998347186"
    cloud_name = "KyMTZuGYAoMY-LWtBEXOKogiSJE"

    # Retrieve API secret from AWS SSM Parameter Store
    ssm = boto3.client('ssm')
    response = ssm.get_parameter(Name='C_API_SECRET', WithDecryption=True)
    api_secret = response['Parameter']['Value']

    # Construct request body
    body = {
        "api_key": api_key
    }
    files = {
        "file": open(filename, "rb")
    }
    timestamp = int(time.time())
    body["timestamp"] = timestamp
    body.update(extra_fields)
    body["signature"] = create_signature(body, api_secret)

    url = f"http://api.cloudinary.com/v1_1/{cloud_name}/{resource_type}/upload"

    # Log request details
    logging.info(f"Uploading file '{filename}' to Cloudinary URL: {url}")
    logging.debug(f"Request body: {body}")

    # Make the HTTP POST request to Cloudinary
    res = requests.post(url=url, files=files, data=body)

    # Log response details
    logging.info(f"Cloudinary upload response status code: {res.status_code}")
    logging.debug(f"Cloudinary upload response content: {res.content}")

    # Parse the JSON response
    json_response = res.json()
    logging.debug(f"Parsed JSON response: {json_response}")

    return json_response

def create_signature(body, api_secret):
    exclude = ["api_key", "resource_type", "cloud_name"]
    sorted_body = sort_dictionary(body, exclude)
    query_string = create_query_string(sorted_body)
    query_string_appended = f"{query_string}{api_secret}"
    hashed = hashlib.sha1(query_string_appended.encode())
    signature = hashed.hexdigest()
    return signature

def sort_dictionary(dictionary, exclude):
    return {k: v for k, v in sorted(dictionary.items(), key=lambda item: item[0]) if k not in exclude}

def create_query_string(body):
    query_string = ""
    for idx, (k, v) in enumerate(body.items()):
        query_string = f"{k}={v}" if idx == 0 else f"{query_string}&{k}={v}"
    return query_string

def generate_unique_id():
    # Generate a unique UUID (Universally Unique Identifier)
    unique_id = str(uuid.uuid4())
    return unique_id
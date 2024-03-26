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
items_table = dynamodb.Table('items')
accounts_table = dynamodb.Table('accounts')

def lambda_handler(event, context):
    # Parse incoming event data
    body = event["body"]
    if event["isBase64Encoded"]:
        body = base64.b64decode(body)
    content_type = event["headers"]["content-type"]
    data = decoder.MultipartDecoder(body, content_type)

    binary_data = [part.content for part in data.parts]
    # Extract item information from the event data
    colour = binary_data[1].decode()
    style = binary_data[2].decode()
    item_type = binary_data[3].decode()
    classification = binary_data[4].decode()
    account = binary_data[5].decode()

    # Save the uploaded image to /tmp folder
    key = "closet.png"
    file_name = os.path.join("/tmp", key)
    with open(file_name, "wb") as f:
        f.write(binary_data[0])

    # Upload image to Cloudinary
    img_res = upload_to_cloudinary(file_name)
    img_url = img_res["url"]

    # Check if the account exists
    response = accounts_table.get_item(
        Key={
            'account_id': account
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

    # Generate a unique ID for the item
    item_id = generate_unique_id()

    # Add the item information to the DynamoDB table
    response = items_table.put_item(
        Item={
            'item_id': item_id,  # Generating a unique ID for the item
            'type': item_type,
            'colour': colour,
            'style': style,
            'image_url': img_url,
            'classification': classification,
            'account_id': account
        }
    )

    # Prepare response
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        body = {
            "message": "Item saved successfully",
            "item_id": item_id
        }
        status_code = 200
    else:
        body = {
            "message": "Failed to save item"
        }
        status_code = 500

    return {
        'statusCode': status_code,
        'body': json.dumps(body),
        'headers': {
            'Content-Type': 'application/json'
        }
    }

def upload_to_cloudinary(filename, resource_type="image", extra_fields={}):
    # Set up logging
    logging.basicConfig(level=logging.DEBUG)

    # Uploads file at filename path to Cloudinary
    # ADD YOUR OWN HERE
    api_key = "122298827692248"
    cloud_name = "dnowxhqec"

    # Retrieve API secret from AWS SSM Parameter Store
    ssm = boto3.client('ssm')
    response = ssm.get_parameter(Name='/the-last-show/cloudinary-key', WithDecryption=True)
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
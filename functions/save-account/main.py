# import json
# import boto3

# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table('accounts')

# def lambda_handler(event, context):
#     # Parse incoming event data
#     data = json.loads(event['body'])
    
#     # Extract account information from the event data
#     # first_name = data['first_name']
#     # last_name = data['last_name']
#     # account_type = data['account_type']
#     email = data['email']
    
#     # Check if an account with the same unique ID (email) already exists
#     response = table.get_item(
#         Key={
#             "account_id": email
#         }
#     )
    
#     # If account already exists, return error response
#     if 'Item' in response:
#         return {
#             "statusCode": 400,
#             "body": json.dumps({"message": "Account already exists"}),
#             "headers": {
#                 "Content-Type": "application/json",
#             }
#         }
    
#     # Add the account information to the DynamoDB table
#     response = table.put_item(
#         Item={
#             "account_id": email,
#             # 'first_name': first_name,
#             # 'last_name': last_name,
#             # 'account_type': account_type,
#             "email": email
#         }
#     )
    
#     # Prepare response
#     if response['ResponseMetadata']['HTTPStatusCode'] == 200:
#         body = {
#             "message": "Account saved successfully"
#         }
#         status_code = 200
#     else:
#         body = {
#             "message": "Failed to save account"
#         }
#         status_code = 500
    
#     return {
#         "statusCode": status_code,
#         "body": json.dumps(body),
#         "headers": {
#             "Content-Type": "application/json",
#         }
#     }
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
    profile_picture_url = binary_data[0].decode()
    account_id = binary_data[1].decode()
    email = binary_data[2].decode()
    name = binary_data[3].decode()
    bio = binary_data[4].decode()

    # # Save the uploaded image to /tmp folder
    # key = "closet.png"
    # file_name = os.path.join("/tmp", key)
    # with open(file_name, "wb") as f:
    #     f.write(binary_data[0])

    # # Upload image to Cloudinary
    # img_res = upload_to_cloudinary(file_name)
    # img_url = img_res["url"]

    # Check if the account exists
    response = table.get_item(
        Key={
            'account_id': account_id
        }
    )

    # If account already exists, return error response
    if 'Item' in response:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Account already exists'}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }

    
    # Add the account information to the DynamoDB table
    response = table.put_item(
        Item={
            "account_id": account_id,
            "name": name,
            "bio": bio,
            "profile_picture_url": profile_picture_url,
            "email": email
        }
    )
    
    # Prepare response
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        body = {
            "message": "Account saved successfully"
        }
        status_code = 200
    else:
        body = {
            "message": "Failed to save account"
        }
        status_code = 500
    
    return {
        "statusCode": status_code,
        "body": json.dumps(body),
        "headers": {
            "Content-Type": "application/json",
        }
    }

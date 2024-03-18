import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('accounts')

def lambda_handler(event, context):
    # Parse incoming event data
    data = json.loads(event['body'])
    
    # Extract account information from the event data
    # first_name = data['first_name']
    # last_name = data['last_name']
    # account_type = data['account_type']
    email = data['email']
    
    # Check if an account with the same unique ID (email) already exists
    response = table.get_item(
        Key={
            "account_id": email
        }
    )
    
    # If account already exists, return error response
    if 'Item' in response:
        return {
            "statusCode": 400,
            "body": json.dumps({"message": "Account already exists"}),
            "headers": {
                "Content-Type": "application/json",
            }
        }
    
    # Add the account information to the DynamoDB table
    response = table.put_item(
        Item={
            "account_id": email,
            # 'first_name': first_name,
            # 'last_name': last_name,
            # 'account_type': account_type,
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

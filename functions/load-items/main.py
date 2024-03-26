import json
import boto3

dynamodb = boto3.resource('dynamodb')
accounts_table = dynamodb.Table('accounts')

def lambda_handler(event, context):
    # Parse incoming event data
    email = event["queryStringParameters"]["email"]
    # data = json.loads(event['body'])
    
    # Extract account information from the event data
    # email = data["email"]
    
    # Retrieve account details from the DynamoDB table
    response = accounts_table.get_item(
        Key={
            "account_id": email
        }
    )
    
    # If account exists, return account details
    if 'Item' in response:
        account_details = response['Item']
        return {
            "statusCode": 200,
            "body": json.dumps(account_details),
            "headers": {
                "Content-Type": "application/json"
                # "Access-Control-Allow-Origin": "*"
            }
        }
    # If account doesn't exist, return a specific response
    else:
        return {
            "statusCode": 404,
            "body": json.dumps({"message": "Account does not exist"}),
            "headers": {
                "Content-Type": "application/json"
                # "Access-Control-Allow-Origin": "*"
            }
        }
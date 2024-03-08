import json
import boto3

dynamodb = boto3.resource('dynamodb')
accounts_table = dynamodb.Table('accounts')

def lambda_handler(event, context):
    # Extract unique ID from the incoming event data
    account_id = event['pathParameters']['id']
    
    # Retrieve account details from the DynamoDB table
    response = accounts_table.get_item(
        Key={
            'id': account_id
        }
    )
    
    # If account exists, return account details
    if 'Item' in response:
        account_details = response['Item']
        return {
            'statusCode': 200,
            'body': json.dumps(account_details),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    # If account doesn't exist, return error response
    else:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Account not found'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

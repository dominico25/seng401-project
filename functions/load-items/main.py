import json
import boto3

dynamodb = boto3.resource('dynamodb')
items_table = dynamodb.Table('items')

def lambda_handler(event, context):
    # Extract account ID from the incoming event data
    account_id = event['pathParameters']['id']
    
    # Query items associated with the given account ID from the DynamoDB table
    response = items_table.query(
        KeyConditionExpression='account_id = :val',
        ExpressionAttributeValues={':val': account_id}
    )
    
    # If items associated with the account ID are found, return them
    if 'Items' in response:
        items = response['Items']
        return {
            'statusCode': 200,
            'body': json.dumps(items),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    # If no items associated with the account ID are found, return empty list
    else:
        return {
            'statusCode': 200,
            'body': json.dumps([]),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

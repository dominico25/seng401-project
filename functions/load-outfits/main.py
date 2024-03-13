import json
import boto3

dynamodb = boto3.resource('dynamodb')
outfits_table = dynamodb.Table('outfits')

def lambda_handler(event, context):
    # Extract account ID from the incoming event data
    account_id = event['pathParameters']['id']
    
    # Query outfits associated with the given account ID from the DynamoDB table
    response = outfits_table.query(
        KeyConditionExpression='account_id = :val',
        ExpressionAttributeValues={':val': account_id}
    )
    
    # If outfits associated with the account ID are found, return them
    if 'Items' in response:
        outfits = response['Items']
        return {
            'statusCode': 200,
            'body': json.dumps(outfits),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    # If no outfits associated with the account ID are found, return empty list
    else:
        return {
            'statusCode': 200,
            'body': json.dumps([]),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

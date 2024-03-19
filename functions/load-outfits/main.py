import json
import boto3
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
outfits_table = dynamodb.Table('outfits')

def lambda_handler(event, context):
    try:
        logger.info("Incoming event: {}".format(json.dumps(event)))

        # Extract account ID from the incoming event data
        account_id = event['queryStringParameters']['account_id']
        logger.info("Extracted account ID: {}".format(account_id))

        # Query outfits associated with the given account ID from the DynamoDB table
        response = outfits_table.scan(
                FilterExpression='account_id = :val',
                ExpressionAttributeValues={':val': account_id}
            )
        
        logger.info("DynamoDB query response: {}".format(response))

        # If outfits associated with the account ID are found, return them
        if 'Items' in response:
            outfits = response['Items']
            return {
                'statusCode': 200,
                'body': json.dumps(outfits),
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        # If no outfits associated with the account ID are found, return empty list
        else:
            return {
                'statusCode': 200,
                'body': json.dumps([]),
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        
    except Exception as e:
        # Log the exception
        logger.error("An error occurred: {}".format(str(e)))
        
        # Return an error response
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': str(e)
            }),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
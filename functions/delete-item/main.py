import json
import boto3
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
items_table = dynamodb.Table('items')

def lambda_handler(event, context):
    try:
        # Log the incoming event data
        logger.info("Incoming event: {}".format(json.dumps(event)))
        
        # Extract item ID and account ID from the incoming event data
        account_id = event['queryStringParameters']['account_id']
        item_id = event['queryStringParameters']['item_id']

        logger.info("Extracted item ID: {}, account ID: {}".format(item_id, account_id))
        
        # Delete the item from the DynamoDB table
        response = items_table.delete_item(
            Key={
                'item_id': item_id
            }
        )

        # Log the DynamoDB delete response
        logger.info("DynamoDB delete response: {}".format(response))
        
        # Return a success response
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Item deleted successfully'
            }),
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

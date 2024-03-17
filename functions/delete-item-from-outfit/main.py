import json
import boto3
from boto3.dynamodb.conditions import Attr
import logging

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
outfits_table = dynamodb.Table('outfits')

def lambda_handler(event, context):
    try:
        # Log the incoming event data
        logger.info("Incoming event: {}".format(json.dumps(event)))
        
        # Extract account ID, item ID, and type from the incoming event data
        account_id = event['queryStringParameters']['account_id']
        item_id = event['queryStringParameters']['item_id']
        type_value = event['queryStringParameters']['type']
        
        logger.info("Extracted item ID: {}, account ID: {}, type: {}".format(item_id, account_id, type_value))
        
        # Construct the attribute name dynamically
        attribute_name = type_value + '_id'
        
        # Perform a scan operation to find items with matching account_id and attribute_name
        response = outfits_table.scan(
            FilterExpression=Attr(attribute_name).eq(item_id) & Attr('account_id').eq(account_id)
        )
        
        # Update each item found in the scan
        for item in response['Items']:
            response = outfits_table.update_item(
                Key={'outfit_id': item['outfit_id']},
                UpdateExpression='set {} = :val'.format(attribute_name),
                ExpressionAttributeValues={':val': None},
                ConditionExpression=Attr('account_id').eq(account_id),  # Ensure account_id matches
                ReturnValues='UPDATED_NEW'
            )
            logger.info("DynamoDB update response: {}".format(response))
        
        # Return a success response
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Items updated successfully'
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

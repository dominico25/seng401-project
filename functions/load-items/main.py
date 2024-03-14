# import json
# import boto3

# dynamodb = boto3.resource('dynamodb')
# items_table = dynamodb.Table('items')

# def lambda_handler(event, context):
#     try:
#         # Extract account ID from the incoming event data
#         # account_id = event['queryStringParameters']['id']
#         account_id = event['id']

#         # Query items associated with the given account ID from the DynamoDB table
#         response = items_table.query(
#             KeyConditionExpression='account_id = :val',
#             ExpressionAttributeValues={':val': account_id}
#         )
    
#         # If items associated with the account ID are found, return them
#         if 'Items' in response:
#             items = response['Items']
#             return {
#                 'statusCode': 200,
#                 'body': json.dumps(items),
#                 'headers': {
#                     'Content-Type': 'application/json'
#                 }
#             }
#         # If no items associated with the account ID are found, return empty list
#         else:
#             return {
#                 'statusCode': 200,
#                 'body': json.dumps([]),
#                 'headers': {
#                     'Content-Type': 'application/json'
#                 }
#             }
#     except Exception as e:
#         # Print the exception for debugging purposes
#         print(e)
#         # Return an error response
#         return {
#             'statusCode': 500,
#             'body': json.dumps({
#                 'message': str(e)
#             }),
#             'headers': {
#                 'Content-Type': 'application/json'
#             }
#         }


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
        
        # Extract account ID from the incoming event data
        # account_id = event['account_id']
        account_id = event['queryStringParameters']['account_id']

        logger.info("Extracted account ID: {}".format(account_id))
        
        # Query items associated with the given account ID from the DynamoDB table
        # response = items_table.query(
        #     KeyConditionExpression='account_id = :val',
        #     ExpressionAttributeValues={':val': account_id}
        # )

        # response = items_table.query(
        #     KeyConditionExpression='account_id = :val AND item_id = :item_id_val',
        #     ExpressionAttributeValues={
        #         ':val': account_id,
        #         ':item_id_val': '1'
        #     }
        # )
        response = items_table.scan(
            FilterExpression='account_id = :val',
            ExpressionAttributeValues={':val': account_id}
        )

        # Log the DynamoDB query response
        logger.info("DynamoDB query response: {}".format(response))
        
        # If items associated with the account ID are found, return them
        if 'Items' in response:
            items = response['Items']
            return {
                'statusCode': 200,
                'body': json.dumps(items),
                'headers': {
                    'Content-Type': 'application/json'
                }
            }
        # If no items associated with the account ID are found, return empty list
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

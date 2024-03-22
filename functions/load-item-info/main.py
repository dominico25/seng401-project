# import json
# import boto3

# dynamodb = boto3.resource('dynamodb')
# items_table = dynamodb.Table('items')

# def lambda_handler(event, context):
    
#     # input_array = event['queryStringParameters']['input_array']
#     input_array = json.loads(event['queryStringParameters']['input_array'])
    
#     # Initialize the output array
#     output_array = []

#     # Define a function to fetch URL from DynamoDB table based on item_id
#     def get_url_from_item_id(item_id):
#         # Query DynamoDB table to get URL based on item_id
#         response = items_table.get_item(Key={'item_id': item_id})
#         # Extract URL from response
#         item = response.get('Item')
#         if item:
#             imageUrl = item.get('image_url')
#             class_ = item.get('classification')
#             colour = item.get('colour')
#             style = item.get('style')
#             item_id = item.get('item_id')
#             if imageUrl and class_ and colour and style and item_id:
#                 return imageUrl, class_, colour, style, item_id
#         else:
#             return None, None, None, None, None
    
#     # Iterate through each outfit in the input array
#     for outfit in input_array:
#         # Extract necessary values
#         outfit_name = outfit.get('name')
#         account_id = outfit.get('account_id')
#         outfit_id = outfit.get('outfit_id')
        
#         # Initialize dictionary for the modified outfit
#         modified_outfit = {'name': outfit_name, 'account_id': account_id, 'outfit_id': outfit_id}
        
#         # Iterate through keys in outfit
#         for key, value in outfit.items():
#             if key not in ['name', 'account_id', 'outfit_id']:
#                 # Fetch URL from DynamoDB table based on item_id
#                 imageUrl, class_, colour, style, item_id = get_url_from_item_id(value)
#                 # Add URL to the modified outfit
#                 modified_outfit[key] = {'imageUrl': imageUrl, 'class': class_, 'colour': colour, 'style': style, 'item_id': item_id} if imageUrl else value
        
#         # Add modified outfit to output array
#         output_array.append(modified_outfit)

#     return {
#         'statusCode': 200,
#         'body': json.dumps({'output_array': output_array}),
#         'headers': {
#             'Content-Type': 'application/json'
#         }
#     }



import json
import boto3
import logging

# Initialize logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource('dynamodb')
items_table = dynamodb.Table('items')

def lambda_handler(event, context):
    logger.info('Received event: %s', event)
    
    try:
        # input_array = event['queryStringParameters']['input_array']
        input_array = json.loads(event['queryStringParameters']['input_array'])

        # Initialize the output array
        output_array = []

        # Define a function to fetch URL from DynamoDB table based on item_id
        def get_url_from_item_id(item_id):
            # Query DynamoDB table to get URL based on item_id
            response = items_table.get_item(Key={'item_id': item_id})
            # Extract URL from response
            item = response.get('Item')
            if item:
                imageUrl = item.get('image_url')
                class_ = item.get('classification')
                colour = item.get('colour')
                style = item.get('style')
                item_id = item.get('item_id')
                if imageUrl and class_ and colour and style and item_id:
                    return imageUrl, class_, colour, style, item_id
            else:
                return None, None, None, None, None

        # Iterate through each outfit in the input array
        for outfit in input_array:
            # Extract necessary values
            outfit_name = outfit.get('name')
            account_id = outfit.get('account_id')
            outfit_id = outfit.get('outfit_id')

            # Initialize dictionary for the modified outfit
            modified_outfit = {'name': outfit_name, 'account_id': account_id, 'outfit_id': outfit_id}

            # Iterate through keys in outfit
            for key, value in outfit.items():
                if key not in ['name', 'account_id', 'outfit_id']:
                    if value is not None:
                        # Fetch URL from DynamoDB table based on item_id
                        imageUrl, class_, colour, style, item_id = get_url_from_item_id(value)
                        # Add URL to the modified outfit
                        modified_outfit[key] = {'imageUrl': imageUrl, 'class': class_, 'colour': colour, 'style': style, 'item_id': item_id} if imageUrl else value

            # Add modified outfit to output array
            output_array.append(modified_outfit)

        return {
            'statusCode': 200,
            'body': json.dumps({'output_array': output_array}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    except Exception as e:
        logger.error('An error occurred: %s', e)
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)}),
            'headers': {
                'Content-Type': 'application/json'
            }
        }

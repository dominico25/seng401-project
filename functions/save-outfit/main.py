import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
outfits_table = dynamodb.Table('outfits')
accounts_table = dynamodb.Table('accounts')
items_table = dynamodb.Table('items')

def lambda_handler(event, context):
    # Parse incoming event data
    data = json.loads(event['body'])
    
    # Extract outfit information from the event data
    top_id = data['top_id']
    bottom_id = data['bottom_id']
    dress_id = data['dress_id']
    outerwear_id = data['outerwear_id']
    accessories_id = data['accessories_id']
    shoes_id = data['shoes_id']
    hat_id = data['hat_id']
    bag_id = data['bag_id']
    account_id = data['account_id']
    
    # Check if the account exists
    response = accounts_table.get_item(
        Key={
            'id': account_id
        }
    )
    
    # If account doesn't exist, return error response
    if 'Item' not in response:
        return {
            'statusCode': 404,
            'body': json.dumps({'message': 'Account not found'}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }
    
    # Add the outfit information to the DynamoDB table
    response = outfits_table.put_item(
        Item={
            'id': generate_unique_id(),  # Generating a unique ID for the outfit
            'top_id': top_id,
            'bottom_id': bottom_id,
            'outerwear_id': outerwear_id,
            'accessories_id': accessories_id,
            'shoes_id': shoes_id,
            'hat_id': hat_id,
            'bag_id': bag_id,
            'account_id': account_id
        }
    )
    
    # Prepare response
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        body = {
            "message": "Outfit saved successfully"
        }
        status_code = 200
    else:
        body = {
            "message": "Failed to save outfit"
        }
        status_code = 500
    
    return {
        'statusCode': status_code,
        'body': json.dumps(body),
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

def generate_unique_id():
    # Generate a unique UUID (Universally Unique Identifier)
    unique_id = str(uuid.uuid4())
    return unique_id

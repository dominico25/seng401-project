import json
import boto3
import uuid
import cloudinary
from cloudinary.uploader import upload

dynamodb = boto3.resource('dynamodb')
items_table = dynamodb.Table('items')
accounts_table = dynamodb.Table('accounts')

# Configure Cloudinary
cloudinary.config(
    cloud_name='your_cloud_name',
    api_key='your_api_key',
    api_secret='your_api_secret'
)

def lambda_handler(event, context):
    # Parse incoming event data
    data = json.loads(event['body'])
    
    # Extract item information from the event data
    item_type = data['type']
    color = data['color']
    style = data['style']
    image = data['image']  # Base64 encoded image
    
    # Decode Base64 image
    image_data = base64.b64decode(image)
    
    # Upload image to Cloudinary
    cloudinary_response = upload(image_data)
    
    # Extract Cloudinary URL
    image_url = cloudinary_response['secure_url']
    
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
    
    # Generate a unique ID for the item
    item_id = generate_unique_id()
    
    # Add the item information to the DynamoDB table
    response = items_table.put_item(
        Item={
            'id': item_id,  # Generating a unique ID for the item
            'type': item_type,
            'color': color,
            'style': style,
            'image_url': image_url,
            'account_id': account_id
        }
    )
    
    # Prepare response
    if response['ResponseMetadata']['HTTPStatusCode'] == 200:
        body = {
            "message": "Item saved successfully",
            "item_id": item_id
        }
        status_code = 200
    else:
        body = {
            "message": "Failed to save item"
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

terraform {
  required_providers {
    aws = {
      version = ">= 4.0.0"
      source  = "hashicorp/aws"

    }
  }
}

provider "aws" {
  region = "ca-central-1"
  ## dont wanna add access key here
  access_key = ""
  secret_key = ""
}

# two lambda functions w/ function url
# one dynamodb table
# roles and policies as needed
# step functions (if you're going for the bonus marks)


# create archive file (this was from class)
# data "archive_file" "lambda" {
#   type = "zip"
#   # this file (main.py) needs to exist in the same folder as this
#   # Terraform configuration file
#   source_dir = "../functions/funcName"
#   #output_path = "artifact.zip" #do we want one or multiple for each function
#   output_path = "../functions/funcName/main/artifact.py"
# }

#want to post to create obit

#cd to functions then pip install requests-toolbelt
# "s3:*" in policy but dont use s3 im pretty sure actually
# up to here (from class)


#what i added also check the actual func names

#locals block
#variables we can use throughout the code

locals {
  load_acc_func = "load-account-info"
  load_acc_handler  = "main.lambda_handler"
  load_acc_artifact = "../functions/${local.load_acc_func}/load_acc_artifact.zip"
  load_acc_source_file = "../functions/${local.load_acc_func}"

  load_items_func = "load-items"
  load_items_handler  = "main.lambda_handler"
  load_items_artifact = "../functions/${local.load_items_func}/load_items_artifact.zip"
  load_items_source_file = "../functions/${local.load_items_func}"

  load_outfits_func = "load-outfits"
  load_outfits_handler  = "main.lambda_handler"
  load_outfits_artifact = "../functions/${local.load_outfits_func}/load_outfits_artifact.zip"
  load_outfits_source_file = "../functions/${local.load_outfits_func}"

  save_acc_func = "save-account"
  save_acc_handler  = "main.lambda_handler"
  save_acc_artifact = "../functions/${local.save_acc_func}/save_acc_artifact.zip"
  save_acc_source_file = "../functions/${local.save_acc_func}"

  save_item_func = "save-item"
  save_item_handler  = "main.lambda_handler"
  save_item_artifact = "../functions/${local.save_item_func}/save_item_artifact.zip"
  save_item_source_file = "../functions/${local.save_item_func}"

  save_outfit_func = "save-outfit"
  save_outfit_handler  = "main.lambda_handler"
  save_outfit_artifact = "../functions/${local.save_outfit_func}/load_outfits_artifact.zip"
  save_outfit_source_file = "../functions/${local.save_outfit_func}"

  load_item_info_func = "load-item-info"
  load_item_info_handler  = "main.lambda_handler"
  load_item_info_artifact = "../functions/${local.load_item_info_func}/load_item_info_artifact.zip"
  load_item_info_source_file = "../functions/${local.load_item_info_func}"
  
  delete_item_func = "delete-item"
  delete_item_handler  = "main.lambda_handler"
  delete_item_artifact = "../functions/${local.delete_item_func}/delete_item_artifact.zip"
  delete_item_source_file = "../functions/${local.delete_item_func}"

  delete_item_from_outfit_func = "delete-item-from-outfit"
  delete_item_from_outfit_handler  = "main.lambda_handler"
  delete_item_from_outfit_artifact = "../functions/${local.delete_item_from_outfit_func}/delete_item_from_outfit_artifact.zip"
  delete_item_from_outfit_source_file = "../functions/${local.delete_item_from_outfit_func}"

  delete_outfit_func = "delete-outfit"
  delete_outfit_handler  = "main.lambda_handler"
  delete_outfit_artifact = "../functions/${local.delete_outfit_func}/delete_outfit_artifact.zip"
  delete_outfit_source_file = "../functions/${local.delete_outfit_func}"

}


#create the lmabda functions

#create lambda loads
resource "aws_lambda_function" "load_acc_lambda" {
  role          = aws_iam_role.load_acc_role.arn
  function_name = local.load_acc_func
  handler       = local.load_acc_handler
  filename      = local.load_acc_artifact
  source_code_hash = data.archive_file.load_acc_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

resource "aws_lambda_function" "load_items_lambda" {
  role          = aws_iam_role.load_items_role.arn
  function_name = local.load_items_func
  handler       = local.load_items_handler
  filename      = local.load_items_artifact
  source_code_hash = data.archive_file.load_items_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

resource "aws_lambda_function" "load_outfits_lambda" {
  role          = aws_iam_role.load_outfits_role.arn
  function_name = local.load_outfits_func
  handler       = local.load_outfits_handler
  filename      = local.load_outfits_artifact
  source_code_hash = data.archive_file.load_outfits_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

resource "aws_lambda_function" "load_item_info_lambda" {
  role          = aws_iam_role.load_item_info_role.arn
  function_name = local.load_item_info_func
  handler       = local.load_item_info_handler
  filename      = local.load_item_info_artifact
  source_code_hash = data.archive_file.load_item_info_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

#create lambda saves
resource "aws_lambda_function" "save_acc_lambda" {
  role          = aws_iam_role.save_acc_role.arn
  function_name = local.save_acc_func
  handler       = local.save_acc_handler
  filename      = local.save_acc_artifact
  source_code_hash = data.archive_file.save_acc_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

resource "aws_lambda_function" "save_item_lambda" {
  role          = aws_iam_role.save_item_role.arn
  function_name = local.save_item_func
  handler       = local.save_item_handler
  filename      = local.save_item_artifact
  source_code_hash = data.archive_file.save_item_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

resource "aws_lambda_function" "save_outfit_lambda" {
  role          = aws_iam_role.save_outfit_role.arn
  function_name = local.save_outfit_func
  handler       = local.save_outfit_handler
  filename      = local.save_outfit_artifact
  source_code_hash = data.archive_file.save_outfit_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

resource "aws_lambda_function" "delete_item_lambda" {
  role          = aws_iam_role.delete_item_role.arn
  function_name = local.delete_item_func
  handler       = local.delete_item_handler
  filename      = local.delete_item_artifact
  source_code_hash = data.archive_file.delete_item_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

resource "aws_lambda_function" "delete_item_from_outfit_lambda" {
  role          = aws_iam_role.delete_item_from_outfit_role.arn
  function_name = local.delete_item_from_outfit_func
  handler       = local.delete_item_from_outfit_handler
  filename      = local.delete_item_from_outfit_artifact
  source_code_hash = data.archive_file.delete_item_from_outfit_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

resource "aws_lambda_function" "delete_outfit_lambda" {
  role          = aws_iam_role.delete_outfit_role.arn
  function_name = local.delete_outfit_func
  handler       = local.delete_outfit_handler
  filename      = local.delete_outfit_artifact
  source_code_hash = data.archive_file.delete_outfit_file.output_base64sha256
  runtime = "python3.9"
  timeout = 20
}

#roles

#creating role for loads
resource "aws_iam_role" "load_acc_role" {
  name               = "iam-for-load-acc-${local.load_acc_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "load_items_role" {
  name               = "iam-for-load-items-${local.load_items_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "load_outfits_role" {
  name               = "iam-for-load-outfits-${local.load_outfits_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "load_item_info_role" {
  name               = "iam-for-load-item-info-${local.load_item_info_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

#creating role for save lambda function
resource "aws_iam_role" "save_acc_role" {
  name               = "iam-for-save-acc-${local.save_acc_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "save_item_role" {
  name               = "iam-for-save-item-${local.save_item_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "save_outfit_role" {
  name               = "iam-for-save-outfit-${local.save_outfit_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "delete_item_role" {
  name               = "iam-for-delete-item-${local.delete_item_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "delete_item_from_outfit_role" {
  name               = "iam-for-delete-item-from-outfit-${local.delete_item_from_outfit_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role" "delete_outfit_role" {
  name               = "iam-for-delete-outfit-${local.delete_outfit_func}"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },


      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# policies

# creating policy for publishing save logs to cloudwatch
resource "aws_iam_policy" "save_acc_logs" {
  name        = "lambda-logging-${local.save_acc_func}"
  description = "IAM policy for logging from a lambda"


  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:PutItem",
        "ssm:GetParameter",
        "polly:SynthesizeSpeech",
        "dynamodb:GetItem"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.accounts.arn}", "*"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "save_item_logs" {
  name        = "lambda-logging-${local.save_item_func}"
  description = "IAM policy for logging from a lambda"


  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:PutItem",
        "ssm:GetParameter",
        "polly:SynthesizeSpeech"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.items.arn}", "*"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "save_outfit_logs" {
  name        = "lambda-logging-${local.save_outfit_func}"
  description = "IAM policy for logging from a lambda"


  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:PutItem",
        "ssm:GetParameter",
        "polly:SynthesizeSpeech",
        "dynamodb:GetItem"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.outfits.arn}", "*"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

# creating policy for publishing load logs to cloudwatch
resource "aws_iam_policy" "load_acc_logs" {
  name        = "lambda-logging-${local.load_acc_func}"
  description = "IAM policy for logging from a lambda"


  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:Query"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.accounts.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "load_items_logs" {
  name        = "lambda-logging-${local.load_items_func}"
  description = "IAM policy for logging from a lambda"


  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.items.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "load_outfits_logs" {
  name        = "lambda-logging-${local.load_outfits_func}"
  description = "IAM policy for logging from a lambda"


  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.outfits.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "load_item_info_logs" {
  name        = "lambda-logging-${local.load_item_info_func}"
  description = "IAM policy for logging from a lambda"


  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": ["arn:aws:logs:*:*:*", "${aws_dynamodb_table.items.arn}"],
      "Effect": "Allow"
    }
  ]
}
EOF
}


resource "aws_iam_policy" "delete_item_logs" {
  name        = "lambda-logging-${local.delete_item_func}"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DeleteLogGroup",
        "logs:DeleteLogStream",
        "dynamodb:DeleteItem",
        "ssm:GetParameter",
        "polly:SynthesizeSpeech"
      ],
      "Resource": [
        "arn:aws:logs:*:*:*",
        "${aws_dynamodb_table.items.arn}",
        "*"
      ],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "delete_item_from_outfit_logs" {
  name        = "lambda-logging-${local.delete_item_from_outfit_func}"
  description = "IAM policy for logging from a lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:UpdateItem",
        "dynamodb:Scan",
        "ssm:GetParameter",
        "polly:SynthesizeSpeech"
      ],
      "Resource": [
        "arn:aws:logs:*:*:*",
        "${aws_dynamodb_table.outfits.arn}",
        "*"
      ],
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "delete_outfit_logs" {
  name        = "lambda-logging-${local.delete_outfit_func}"
  description = "IAM policy for logging from a lambda"


  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "dynamodb:DeleteItem",
        "dynamodb:Scan",
        "ssm:GetParameter",
        "polly:SynthesizeSpeech"
      ],
      "Resource": [
        "arn:aws:logs:*:*:*",
        "${aws_dynamodb_table.outfits.arn}",
        "*"
      ],
      "Effect": "Allow"
    }
  ]
}
EOF
}


# attach policies to roles for lambda functions

# attach create policy to the loads function role
resource "aws_iam_role_policy_attachment" "load_acc_role_logs_a" {
  role       = aws_iam_role.load_acc_role.name
  policy_arn = aws_iam_policy.load_acc_logs.arn
}

resource "aws_iam_role_policy_attachment" "load_items_role_logs_a" {
  role       = aws_iam_role.load_items_role.name
  policy_arn = aws_iam_policy.load_items_logs.arn
}

resource "aws_iam_role_policy_attachment" "load_outfits_role_logs_a" {
  role       = aws_iam_role.load_outfits_role.name
  policy_arn = aws_iam_policy.load_outfits_logs.arn
}

resource "aws_iam_role_policy_attachment" "load_item_info_role_logs_a" {
  role       = aws_iam_role.load_item_info_role.name
  policy_arn = aws_iam_policy.load_item_info_logs.arn
}

# attach get policy to the saves function role
resource "aws_iam_role_policy_attachment" "save_acc_role_logs_a" {
  role       = aws_iam_role.save_acc_role.name
  policy_arn = aws_iam_policy.save_acc_logs.arn
}

resource "aws_iam_role_policy_attachment" "save_item_role_logs_a" {
  role       = aws_iam_role.save_item_role.name
  policy_arn = aws_iam_policy.save_item_logs.arn
}

resource "aws_iam_role_policy_attachment" "save_outfit_role_logs_a" {
  role       = aws_iam_role.save_outfit_role.name
  policy_arn = aws_iam_policy.save_outfit_logs.arn
}

resource "aws_iam_role_policy_attachment" "delete_item_role_logs_a" {
  role       = aws_iam_role.delete_item_role.name
  policy_arn = aws_iam_policy.delete_item_logs.arn
}

resource "aws_iam_role_policy_attachment" "delete_item_from_outfit_role_logs_a" {
  role       = aws_iam_role.delete_item_from_outfit_role.name
  policy_arn = aws_iam_policy.delete_item_from_outfit_logs.arn
}

resource "aws_iam_role_policy_attachment" "delete_outfit_role_logs_a" {
  role       = aws_iam_role.delete_outfit_role.name
  policy_arn = aws_iam_policy.delete_outfit_logs.arn
}

# creating function urls for lambda functions

# create a Function url for saves
resource "aws_lambda_function_url" "save_acc_url" {
  function_name      = aws_lambda_function.save_acc_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["POST"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "save_item_url" {
  function_name      = aws_lambda_function.save_item_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["POST"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "save_outfit_url" {
  function_name      = aws_lambda_function.save_outfit_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["POST"]
    allow_headers     = ["*"]
    expose_headers    = ["keep-alive", "date"]
  }
}

# create a Function url for gets
resource "aws_lambda_function_url" "load_acc_url" {
  function_name      = aws_lambda_function.load_acc_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "load_item_info_url" {
  function_name      = aws_lambda_function.load_item_info_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "load_outfits_url" {
  function_name      = aws_lambda_function.load_outfits_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    expose_headers    = ["keep-alive", "date"]
  }
}



resource "aws_lambda_function_url" "load_items_url" {
  function_name      = aws_lambda_function.load_items_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["GET"]
    expose_headers    = ["keep-alive", "date"]
  }
}



resource "aws_lambda_function_url" "delete_item_url" {
  function_name      = aws_lambda_function.delete_item_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["DELETE"]
    expose_headers    = ["keep-alive", "date"]
  }
}


resource "aws_lambda_function_url" "delete_item_from_outfit_url" {
  function_name      = aws_lambda_function.delete_item_from_outfit_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["PATCH"]
    expose_headers    = ["keep-alive", "date"]
  }
}

resource "aws_lambda_function_url" "delete_outfit_url" {
  function_name      = aws_lambda_function.delete_outfit_lambda.function_name
  authorization_type = "NONE"


  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["DELETE"]
    expose_headers    = ["keep-alive", "date"]
  }
}


# creating archive zip files for lambda function, idk if were supposed to zip them together or apart

# create archive files for loads
data "archive_file" "load_acc_file" {
  type = "zip"
  source_dir = local.load_acc_source_file
  output_path = local.load_acc_artifact
}

data "archive_file" "load_items_file" {
  type = "zip"
  source_dir = local.load_items_source_file
  output_path = local.load_items_artifact
}

data "archive_file" "load_outfits_file" {
  type = "zip"
  source_dir = local.load_outfits_source_file
  output_path = local.load_outfits_artifact
}

data "archive_file" "load_item_info_file" {
  type = "zip"
  source_dir = local.load_item_info_source_file
  output_path = local.load_item_info_artifact
}

# create archive file for gets
data "archive_file" "save_acc_file" {
  type = "zip"
  source_dir = local.save_acc_source_file
  output_path = local.save_acc_artifact
}

data "archive_file" "save_item_file" {
  type = "zip"
  source_dir = local.save_item_source_file
  output_path = local.save_item_artifact
}

data "archive_file" "save_outfit_file" {
  type = "zip"
  source_dir = local.save_outfit_source_file
  output_path = local.save_outfit_artifact
}

data "archive_file" "delete_item_file" {
  type = "zip"
  source_dir = local.delete_item_source_file
  output_path = local.delete_item_artifact
}

data "archive_file" "delete_item_from_outfit_file" {
  type = "zip"
  source_dir = local.delete_item_from_outfit_source_file
  output_path = local.delete_item_from_outfit_artifact
}

data "archive_file" "delete_outfit_file" {
  type = "zip"
  source_dir = local.delete_outfit_source_file
  output_path = local.delete_outfit_artifact
}

# creating dynamodb table

resource "aws_dynamodb_table" "accounts" {
  name         = "accounts"
  billing_mode = "PROVISIONED"

  read_capacity = 1
  write_capacity = 1


  # we only need a student id to find an item in the table; therefore, we
  # don't need a sort key here
  hash_key = "account_id" # ADD RIGHT VARIABLE
  #range_key = "id"


  # the hash_key data type is string
  attribute {
    name = "account_id"
    type = "S" #string type?
  }


  # attribute {
  #   name = "id" #note id
  #   type = "S"
  # }
}

resource "aws_dynamodb_table" "items" {
  name         = "items"
  billing_mode = "PROVISIONED"

  read_capacity = 1
  write_capacity = 1


  # we only need a student id to find an item in the table; therefore, we
  # don't need a sort key here
  hash_key = "item_id" # ADD RIGHT VARIABLE
  #range_key = "id"


  # the hash_key data type is string
  attribute {
    name = "item_id"
    type = "S" #string type?
  }


  # attribute {
  #   name = "id" #note id
  #   type = "S"
  # }
}

resource "aws_dynamodb_table" "outfits" {
  name         = "outfits"
  billing_mode = "PROVISIONED"

  read_capacity = 1
  write_capacity = 1


  # we only need a student id to find an item in the table; therefore, we
  # don't need a sort key here
  hash_key = "outfit_id" # ADD RIGHT VARIABLE
  #range_key = "id"


  # the hash_key data type is string
  attribute {
    name = "outfit_id"
    type = "S" #string type?
  }


  # attribute {
  #   name = "id" #note id
  #   type = "S"
  # }
}


output "lambda_load_acc_url" {
  value = aws_lambda_function_url.load_acc_url.function_url
}

output "lambda_load_items_url" {
  value = aws_lambda_function_url.load_items_url.function_url
}

output "lambda_load_outfits_url" {
  value = aws_lambda_function_url.load_outfits_url.function_url
}

output "lambda_save_acc_url" {
  value = aws_lambda_function_url.save_acc_url.function_url
}

output "lambda_save_item_url" {
  value = aws_lambda_function_url.save_item_url.function_url
}

output "lambda_save_outfit_url" {
  value = aws_lambda_function_url.save_outfit_url.function_url
}


output "lambda_load_item_info_url" {
  value = aws_lambda_function_url.load_item_info_url.function_url
}
  
output "lambda_delete_item_url" {
  value = aws_lambda_function_url.delete_item_url.function_url
}

output "lambda_delete_item_from_outfit_url" {
  value = aws_lambda_function_url.delete_item_from_outfit_url.function_url
}

output "lambda_delete_outfit_url" {
  value = aws_lambda_function_url.delete_outfit_url.function_url

}




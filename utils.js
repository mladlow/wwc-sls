const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.getUrls = async () => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };

  try {
    const result = await dynamo.scan(params).promise();
    console.log('result:');
    console.log(result);
    if (result && result.Items) {
      urls = result.Items.map((dynamoItem) => dynamoItem.ImgUrl);
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'great success',
          urls,
        }),
      };
    } else {
      console.log('tragic failure!');
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'tragic failure',
        }),
      };
    }
  } catch(e) {
    // NOTE: we probably don't want to directly return the AWS error to the user, but it's useful while
    // debugging.
    /*
    console.log(e);
    return e;
    */
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error scanning from dynamodb',
        error: e,
      }),
    };
  }
};

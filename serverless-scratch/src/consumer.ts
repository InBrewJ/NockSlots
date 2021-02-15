// Load the AWS SDK for Node.js
import * as AWS from "aws-sdk";

const QUEUE_URL="http://localhost:9324/queue/nockslots-norris";

const SQS_ENDPOINT="http://localhost:9324";

var config = {
  endpoint: new AWS.Endpoint(SQS_ENDPOINT),
  accessKeyId: 'na',
  secretAccessKey: 'na',
  region: 'REGION'
}
var sqs = new AWS.SQS(config);

var params = {
 AttributeNames: [
    "SentTimestamp"
 ],
 MaxNumberOfMessages: 10,
 MessageAttributeNames: [
    "All"
 ],
 QueueUrl: QUEUE_URL,
 VisibilityTimeout: 20,
 WaitTimeSeconds: 0
};

sqs.receiveMessage(params, function(err: any, data: any) {

  console.log("Raw received response: ", data);

  if (err) {
    console.log("Receive Error", err);
  } else if (data.Messages) {

    console.log("MESSAGES MAN! ::->  ", data.Messages);

    // data.Messages roughly maps onto the awk sdk type:
    // SQSEvent.Records, which is in turn of type 'SQSRecord'
    // This is what should go into the lambda handler as arg:
    // "event: SQSEvent"

    var deleteParams = {
      QueueUrl: QUEUE_URL,
      ReceiptHandle: data.Messages[0].ReceiptHandle
    };

    sqs.deleteMessage(deleteParams, function(err: any, data: any) {
      if (err) {
        console.log("Delete Error", err);
      } else {
        console.log("Message Deleted", data);
      }
    });
  }
});

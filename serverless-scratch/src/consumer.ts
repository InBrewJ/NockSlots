// Load the AWS SDK for Node.js
import * as AWS from "aws-sdk";
import { prettyPrint } from "./utils";

const QUEUE_URL = "http://localhost:9324/queue/nockslots-norris";

const SQS_ENDPOINT = "http://localhost:9324";

var config = {
  endpoint: new AWS.Endpoint(SQS_ENDPOINT),
  accessKeyId: "na",
  secretAccessKey: "na",
  region: "REGION",
};
var sqs = new AWS.SQS(config);

var params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: ["All"],
  QueueUrl: QUEUE_URL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

export const consume = (cb: (message: any) => any) => {
  sqs.receiveMessage(params, function (err: any, data: any) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      const { Messages } = data;
      const [ firstMessage ] = Messages;
      console.log("MESSAGES MAN! ::->  ", prettyPrint(data.Messages));
      cb(firstMessage);

      // data.Messages roughly maps onto the awk sdk type:
      // SQSEvent.Records, which is in turn of type 'SQSRecord'
      // This is what should go into the lambda handler as arg:
      // "event: SQSEvent"

      var deleteParams = {
        QueueUrl: QUEUE_URL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };

      // perhaps only delete if the lambda (triggered by the callback = cb)
      // was successful?

      sqs.deleteMessage(deleteParams, function (err: any, data: any) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message Deleted", data);
        }
      });
    }
  });
};

consume(() => {});

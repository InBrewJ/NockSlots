import { prettyPrint } from './utils';
import { consume } from "./consumer";

const pollIntervalMs: number = 1000;

const timestamp = () => new Date();

const mapMessageToSQSLambdaEvent = (message: any) => {
  return {
    messageId: "059f36b4-87a3-44ab-83d2-661975830a7d",
    receiptHandle: "AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a...",
    body: message.Body,
    attributes: {
      ApproximateReceiveCount: "1",
      SentTimestamp: "1545082649183",
      SenderId: "AIDAIENQZJOLO23YVJ4VO",
      ApproximateFirstReceiveTimestamp: "1545082649185",
    },
    messageAttributes: {},
    md5OfBody: "098f6bcd4621d373cade4e832627b4f6",
    eventSource: "aws:sqs",
    eventSourceARN: "arn:aws:sqs:us-east-2:123456789012:my-queue",
    awsRegion: "eu-west-1",
  };
};

const triggerLambda = (message: any) => {
  console.log('...and then trigger a "lambda" here!');
}

const messageHandler = (message: any) => {
  console.log("In poller:");
  console.log(prettyPrint(mapMessageToSQSLambdaEvent(message)));
  triggerLambda(message);
};

const poller = (intervalMs: number = pollIntervalMs) => {
  console.log('Polling start...');
  let times = 0;
  setInterval(() => {
    console.log(`Polling attempt: ${times++} @ ${timestamp()}`);
    consume(messageHandler);
  }, intervalMs)
}

poller();
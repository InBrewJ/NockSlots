import { prettyPrint } from './utils';
import { consume } from "./consumer";
import fs from 'fs';
const { exec } = require('child_process');

const pollIntervalMs: number = 1000;

const timestamp = () => new Date();

const mapMessageToSQSLambdaEvent = (message: any) => {

  const { Body, Attributes: { SentTimestamp }, MessageId } = message;

  return {
    Records: [{
      messageId: MessageId,
      receiptHandle: 'blank',
      body: Body,
      attributes: {
        ApproximateReceiveCount: 'blank',
        SentTimestamp: SentTimestamp,
        SenderId: 'nockslots',
        ApproximateFirstReceiveTimestamp: 'blank',
      },
      messageAttributes: {},
      md5OfBody: 'blank',
      eventSource: "aws:sqs",
      eventSourceARN: "arn:aws:sqs:local:elasticmq",
      awsRegion: "eu-west-1",
    }]
  };
};

const triggerLambda = (message: Record<string, unknown>) => {
  console.log('...and then trigger a "lambda" here! -->', timestamp());

  // Horrible way to write the message to a file to
  // /Users/jason.brewer/workshop/__EXTRA_CURRICULAR/NockSlots/sqs-sam/lambda-ts-node-sqs/hello-sqs/fixtures/events

  let data = JSON.stringify(message);
  fs.writeFileSync('/Users/jason.brewer/workshop/__EXTRA_CURRICULAR/NockSlots/sqs-sam/lambda-ts-node-sqs/hello-sqs/fixtures/events/event.json', data);

  // Horrible way to locally invoke the lambda

  exec('cd /Users/jason.brewer/workshop/__EXTRA_CURRICULAR/NockSlots/sqs-sam/lambda-ts-node-sqs && . ./invoke.sh', (err: string, stdout: string, stderr: string) => {
    if (err) {
      //some err occurred
      console.error(err)
    } else {
     // the *entire* stdout and stderr (buffered)
     console.log(`stdout: ${stdout}`);
     console.log(`stderr: ${stderr}`);
    }
  });
}

const messageHandler = (message: any) => {
  console.log("In poller:");
  const toSQSEvent = mapMessageToSQSLambdaEvent(message)
  console.log(prettyPrint(toSQSEvent));
  triggerLambda(toSQSEvent);
};

const poller = (intervalMs: number = pollIntervalMs) => {
  console.log('Polling start...');
  let times = 0;
  setInterval(() => {
    // console.log(`Polling attempt: ${times++} @ ${timestamp()}`);
    consume(messageHandler);
  }, intervalMs)
}

poller();
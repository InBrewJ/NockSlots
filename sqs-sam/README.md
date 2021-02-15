# SQS-SAM

An exploration of the AWS provided tooling to create, test, build and run Lambdas locally + remotel

- https://aws.amazon.com/visualstudiocode/
- https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html

## Use of `sam local`

- `sam local` needs a `template.yaml` to work

## Contents

- /lambda-nodejs12.x
  - The sample application generated with the VSCode `AWS: Create new SAM application` command from the palette
  - `sam local invoke HelloWorldFunction --event events/event.json`

- /lambda-ts-node-sqs
  - A simple TypeScript lambda that takes an SQS event as its source
  - `sam local invoke MySQSQueueFunction --event hello-sqs/fixtures/events/event.json`

- /lambda-ts-node-cron
  - Another simple TypeScript lambda that runs on a schedule, it talks to a database and the Chuck Norris api
  - TBC
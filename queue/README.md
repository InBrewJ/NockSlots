# NockSlots Queue

- The simplest Queue you've ever seen
- Modelled on SQS
- How do to it?
  - Maybe with https://medium.com/swlh/testing-aws-sqs-locally-in-node-js-a79545cf4506


## starting without docker-compose

```
docker run -p 9324:9324 -p 9325:9325 -v `pwd`/custom.conf:/opt/elasticmq.conf softwaremill/elasticmq-native
```

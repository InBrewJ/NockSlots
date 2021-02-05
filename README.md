# NockSlots

- A simple app with many components
- These components must be integration tested
- That uses Nock against live services


## Steps to start

- ./run_boh.sh
- /api -> yarn start:dev
- /ui -> yarn start
- Load up `http://localhost:9325/` to inspect the queue status
- Add a message to the queue from the UI
- Consume it from the queue with `./serverless/src/consumer.ts`
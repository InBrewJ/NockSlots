// const url = 'http://checkip.amazonaws.com/';
let response;

exports.handler = async function(event, context) {
    records = [];
    event.Records.forEach(record => {
      const { body } = record;
      console.log(body);
      records.push(body);
    });
    return {'key': JSON.stringify(records)};
  }

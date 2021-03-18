var kafka = require('kafka-node'),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient(),
  consumer = new Consumer(
    client,
    [
      { topic: 'ui_inquiries_in', partition: 0 },
      { topic: 'ui_inquiries_out', partition: 1 }
    ],
    {
      autoCommit: false
    }
  );

consumer.on('message', function (message) {
  console.log(message);
});
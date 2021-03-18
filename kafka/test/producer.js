var kafka = require('kafka-node'),
  Producer = kafka.Producer,
  KeyedMessage = kafka.KeyedMessage,
  client = new kafka.KafkaClient(),
  producer = new Producer(client),
  km = new KeyedMessage('key', 'message'),
  payloads = [
    { topic: 'ui_inquiries_in', messages: 'hi', partition: 0 },
    { topic: 'ui_inquiries_out', messages: ['hello', 'world', km] }
  ];
producer.on('ready', function () {
  producer.send(payloads, function (err, data) {
    console.log(data);
  });
});

producer.on('error', function (err) { })
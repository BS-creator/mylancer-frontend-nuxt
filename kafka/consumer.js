// Application modules
const Kafka = require('./kafka');

// Topics subscribed
const topics = [{
  topic: 'ui_inquiries_in',
  partition: 0
}];


// Topics group
const options = {
  // groupId: 'inquiries'
};

// Consumer instance
const consumer = new Kafka.Consumer(Kafka.client, topics, options);

// Consumer error event
consumer.on('error', function (error) {
  console.log(error);
  console.log("Unable to start consumer");
});

// Process the messages
consumer.on('message', function (message) {
  console.log('OnMessage', message);
  // Controller.updateData(message);
});

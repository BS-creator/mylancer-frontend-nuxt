// Third party modules
const kafka = require('kafka-node');

const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
//const client = new kafka.KafkaClient({kafkaHost: 'ec2-35-153-76-62.compute-1.amazonaws.com:28092'});
const Consumer = kafka.Consumer;
const Producer = kafka.Producer;
const Client = kafka.Client;

module.exports = {
    Consumer,
    client,
    Producer,
    Client,
}

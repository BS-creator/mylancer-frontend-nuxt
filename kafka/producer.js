// Third party modules
const kafka = require('kafka-node');
const kafkURL = 'localhost:9092';
/**
 * KakfaProducer Instance
 */
function KafkaProducer() { }

/**
 * Publish to kafka
 * @param {Object} payload
 * @param {Object} String
 */
KafkaProducer.publishToKafka = function (payload, topicName) {
    const client = new kafka.KafkaClient({ kafkaHost: kafkURL });
    const producer = new kafka.Producer(client, { requireAcks: 1 });
    const KeyedMessage = kafka.KeyedMessage;
    return new Promise((resolve, reject) => {
        // On producer ready
        var km = new KeyedMessage(payload.inquiryId, JSON.stringify(payload));
        producer.on('ready', function () {
            let kafkaPayload = [{
                topic: topicName,
                messages: km,
                attributes: 1,
                timestamp: Date.now(),
                partition: 0
            }]
            producer.send(kafkaPayload, function (error, success) {
                if (success) {
                    resolve({
                        'status': 'success',
                        'data': success
                    });
                }
                if (error) {
                    reject({
                        'status': 'error',
                        'message': error
                    });
                }
            })
        })

        // Error event
        producer.on('error', function (error) {
            reject({
                'status': 'error',
                'message': error
            });
        })
    })
}

KafkaProducer.publishToKafka({}, 'ui_inquiries_in');
module.exports = KafkaProducer
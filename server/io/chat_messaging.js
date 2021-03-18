export default function Svc(socket, io) {
  return Object.freeze({
    newContract(data) {
      return new Promise((resolve, reject) => {
        // socket.emit('newContract', data)
        io.emit('newContract', data)

        resolve('success')
      })
    },
    newMessage(data) {
      return new Promise((resolve, reject) => {
        socket.emit('newMessage', data)

        resolve('success')
      })
    },
  })
}

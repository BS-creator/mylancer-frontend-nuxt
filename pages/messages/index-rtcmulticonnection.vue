<template>
  <div id="messages-page">
    <div>
      <h1>Initial Implememt</h1>
      <el-input v-model="msg"></el-input>
      <button class="button" @click="sendMessage">Send a message</button>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'main',
  data() {
    return {
      myConnection: null,
      connectedPeers: {},
      msg: '',
    }
  },
  mounted() {
    var connection = new RTCMultiConnection()
    console.log('connection: ', connection)
    // this line is VERY_important
    connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/'

    // if you want text chat
    connection.session = {
      data: true,
    }
    connection.onopen = function (event) {
      console.log('data connection opened with ' + event.userid)
    }
    connection.onleave = function (event) {
      console.log(event.userid + ' left you.')
    }
    connection.onclose = function (event) {
      console.log('data connection closed between you and ' + event.userid)
    }

    connection.onmessage = this.receivedMessage

    connection.openOrJoin('234567812345')

    this.myConnection = connection
  },
  methods: {
    receivedMessage(message) {
      alert(message.userid + ' said: ' + message.data)
    },
    sendMessage() {
      this.myConnection.send(this.msg)
    },
  },
}
</script>

<style lang="scss" scoped>
#messages-page {
  min-height: 900px;
}
</style>

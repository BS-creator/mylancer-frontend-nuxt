<template>
  <div id="messages-page">
    <div>
      <h1>Initial Implememt</h1>
      <div id="actions">
        Your PeerJS ID is <span>{{ myPeerId }}</span
        ><br />
        Connect to a peer:
        <input
          type="text"
          id="rid"
          v-model="requestedPeer"
          placeholder="Someone else's id"
        />
        <button @click="connectPeer" class="button">Connect</button>
        <br /><br />

        <form @submit.prevent="sendMessage">
          <input
            type="text"
            id="text"
            v-model="msg"
            placeholder="Enter message"
          />
          <input class="button" type="submit" value="Send to selected peers" />
        </form>
        <button id="close">Close selected connections</button>
      </div>

      <div id="wrap">
        <div id="connections">
          <span class="filler">You have not yet made any connections.</span>
        </div>
        <div class="clear"></div>
      </div>

      <div
        class="log"
        style="
          color: #ff7500;
          text-shadow: none;
          padding: 15px;
          background: #eee;
        "
      >
        <strong>Connection status</strong>:<br />
      </div>
    </div>

    <!-- <div>
      <chat-box />
    </div> -->
  </div>
</template>

<script>
export default {
  layout: 'main',
  data() {
    return {
      requestedPeer: null,
      myPeer: null,
      myPeerId: 'null',
      connectedPeers: {},
      msg: '',
    }
  },
  mounted() {
    const that = this
    let peer = new Peer(this.$auth.user.username, {
      debug: 3,
      // Set a logging function:
      logFunction: function () {
        let copy = Array.prototype.slice.call(arguments).join(' ')
        $('.log').append(copy + '<br>')
      },
    })
    // Show your peer's ID.
    peer.on('open', function (id) {
      that.myPeerId = id
      console.log('my pid: ', that.myPeerId)
    })
    // Await connections from others
    peer.on('connection', this.handleConnection)
    peer.on('error', function (err) {
      console.log(err)
    })
    that.myPeer = peer
    // Make sure things clean up properly.
    window.onunload = window.onbeforeunload = function (e) {
      if (!!peer && !peer.destroyed) {
        peer.destroy()
      }
    }
  },
  methods: {
    handleConnection(c) {
      const that = this
      // Handle a chat connection.
      if (c.label === 'chat') {
        c.on('data', function (data) {
          console.log('message peer', c.peer, data)
        })
        c.on('close', function () {
          console.log(c.peer + ' has left the chat.')
          delete that.connectedPeers[c.peer]
        })
      } else if (c.label === 'file') {
        c.on('data', function (data) {
          // If we're getting a file, create a URL for it.
          if (data.constructor === ArrayBuffer) {
            var dataView = new Uint8Array(data)
            var dataBlob = new Blob([dataView])
            var url = window.URL.createObjectURL(dataBlob)
            console.log('file received: ', c.peer, url)
          }
        })
      }
      console.log('handleConnection', c)
      this.connectedPeers[c.peer] = 1
    },
    connectPeer() {
      const that = this
      console.log('requestedPeer: ', this.requestedPeer)
      if (!this.connectedPeers[this.requestedPeer]) {
        // Create 2 connections, one labelled chat and another labelled file.
        let c = this.myPeer.connect(this.requestedPeer, {
          label: 'chat',
          serialization: 'none',
          metadata: { message: 'hi i want to chat with you!' },
        })
        c.on('open', function () {
          that.handleConnection(c)
        })
        c.on('error', function (err) {
          alert(err)
        })
        let f = this.myPeer.connect(this.requestedPeer, {
          label: 'file',
          reliable: true,
        })
        f.on('open', function () {
          that.handleConnection(f)
        })
        f.on('error', function (err) {
          alert(err)
        })
      }
      this.connectedPeers[this.requestedPeer] = 1
    },
    sendMessage() {
      // For each active connection, send the message.
      let msg = this.msg
      this.eachActiveConnection(function (c) {
        if (c.label === 'chat') {
          c.send(msg)
          console.log('you sent message:', msg)
        }
      })
      this.msg = ''
      $('#text').focus()
    },
    eachActiveConnection(fn) {
      var actives = $('.active')
      var checkedIds = {}
      for (let pid in this.connectedPeers) {
        var peerId = pid
        if (!checkedIds[peerId]) {
          var conns = this.myPeer.connections[peerId]
          for (var i = 0, ii = conns.length; i < ii; i += 1) {
            var conn = conns[i]
            console.log(conns[i])
            fn(conn)
          }
        }
        checkedIds[peerId] = 1
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#messages-page {
  min-height: 900px;
}
</style>

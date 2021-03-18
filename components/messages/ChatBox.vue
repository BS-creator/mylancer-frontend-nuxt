<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :title="title"
      :titleAgo="titleAgo"
      :titleImageUrl="titleImageUrl"
      :projectDetail="projectDetail"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="false"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
      class="chat-box"
      v-bind:class="{
        active: chatboxId === activeBoxId,
        fullopacity: !isChatOpen,
      }"
      @onType="handleOnType"
      @click.native="makeActive"
      @headerClick="headerClick()"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    chatboxId: {
      type: String,
      required: true,
    },
    room_name: {
      type: String,
      default: () => 'none_room',
    },
    participants: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleImageUrl: {
      type: String,
      required: true,
    },
    titleAgo: {
      type: String,
      default: () => '2 hours ago',
    },
    showTypingIndicator: {
      type: String,
      default: () => '',
    },
    projectDetail: {
      type: Object,
      required: true,
    },
    socket: {
      type: Object,
      required: true,
    },
    newMessagesCount: {
      type: Number,
      default: () => 0,
    },
    messageList: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      colors: {
        header: {
          bg: 'rgb(174 9 87 / 0.6)',
          text: '#ffffff',
        },
        launcher: {
          bg: 'var(--color-primary)',
        },
        messageList: {
          bg: '#ffffff',
        },
        sentMessage: {
          bg: 'var(--color-primary)',
          text: '#ffffff',
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222',
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867',
        },
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
      isChatOpen: false,
      roomName: 'none_room',
      myConnection: null,
    }
  },
  computed: {
    ...mapState({
      contacts: (state) => {
        return state.messaging.contacts.list
      },
      activeBoxId: (state) => {
        return state.messaging.chatboxes.activeBoxId
      },
    }),
  },
  async mounted() {
    this.roomName = this.room_name
    await this.$store.dispatch('messaging/chatboxes/getMessageList', {
      room_name: this.roomName,
      chatboxId: this.chatboxId,
    })
    this.isChatOpen = true

    // RTCMultiConnection Part
    var connection = new RTCMultiConnection()
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
    connection.onUserStatusChanged = function (event) {
      var isOnline = event.status === 'online'
      var isOffline = event.status === 'offline'
      var targetUserId = event.userid
      var targetUserExtraInfo = event.extra // extra.fullName/etc
      console.log(
        'onUserStatusChanged',
        targetUserId,
        event.status,
        event.extra
      )
    }

    connection.onmessage = this.receivedMessage

    if (this.roomName !== 'none_room') {
      connection.openOrJoin(this.roomName)
    }

    connection.extra = {
      type: 'text',
      author: this.$auth.user.id,
      username: this.$auth.user.username,
    }

    this.myConnection = connection
  },
  methods: {
    async onMessageWasSent(message) {
      // called when the user sends a message
      console.log('onMessageWasSent', message)
      let destUser = this.participants.find((p) => p.id !== this.$auth.user.id)

      if (this.roomName === 'none_room') {
        this.roomName = await this.createContact(destUser)
        this.myConnection.openOrJoin(this.roomName)
      }
      console.log('room_name', this.roomName)
      this.$store
        .dispatch('messaging/chatboxes/createMessage', {
          from_id: this.$auth.user.id,
          to_id: destUser.id,
          message: message.data.text,
          room_name: this.roomName,
        })
        .then((res) => {
          console.log(res.data)
          this.$store.dispatch('messaging/chatboxes/addMessage', {
            chatboxId: this.chatboxId,
            newMsg: message,
          })
          this.$store.commit('messaging/contacts/setLatestMsg', {
            roomName: this.roomName,
            message: message.data.text,
          })

          let allUsersInRoom = this.myConnection.getAllParticipants()
          console.log(allUsersInRoom)
          if (allUsersInRoom.length === 0) {
            this.socket.emit(
              'newMessage',
              {
                roomName: this.roomName,
                message: message.data.text,
              },
              (resp) => {
                console.log('newMessage', resp)
              }
            )
          } else {
            this.myConnection.send(message.data.text)
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    createContact(destUser) {
      let contact = {
        user: {
          id: destUser.id,
          username: destUser.username,
          fullname: destUser.name,
          avatar_base64: destUser.imageUrl,
        },
        project: {
          id: this.projectDetail.id,
          name: this.projectDetail.name,
          slug: this.projectDetail.slug,
        },
        message: {
          latest: '',
          unread: 0,
        },
      }
      return this.$store
        .dispatch('messaging/contacts/create', {
          creator_id: this.$auth.user.id,
          participant_id: destUser.id,
          project_id: this.projectDetail.id,
        })
        .then((res) => {
          console.log(res.data)
          this.$store.dispatch('messaging/contacts/add', res.data.contact)
          return res.data.contact.room_name
        })
        .catch((err) => {
          console.log(err)
        })
    },
    receivedMessage(message) {
      console.log('receivedMessage: ', message)
      let newMsg = {
        author: message.extra.author,
        type: message.extra.type,
        data: { text: message.data },
      }
      if (message.extra.author === this.$auth.user.id) {
        newMsg.author = 'me'
      }
      this.$store.dispatch('messaging/chatboxes/addMessage', {
        chatboxId: this.chatboxId,
        newMsg,
      })
      this.$store.commit('messaging/contacts/setLatestMsg', {
        roomName: this.roomName,
        message: message.data,
      })
    },
    makeActive(event) {
      console.log('makeActive', this.chatboxId)
      this.$store.commit('messaging/chatboxes/setActive', this.chatboxId)
    },
    openChat() {
      this.$store.dispatch('messaging/chatboxes/open', this.chatboxId)
    },
    closeChat() {
      this.$store.dispatch('messaging/chatboxes/close', this.chatboxId)
    },
    handleScrollToTop() {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
      console.log('Emit typing event')
    },
    headerClick() {
      console.log('headerClick', event.target)
      $(event.target).parents('.sc-chat-window').children().toggle()
      $(event.target).show()
      $(event.target).parents('.sc-header').show()
      $(event.target).parents('.sc-chat-window').toggleClass('height-auto')
    },
  },
}
</script>

<style lang="scss">
.fullopacity {
  opacity: 0;
}
.chat-box {
  &.active {
    .sc-header {
      background: var(--color-primary) !important;
    }
  }
}
.sc-chat-window {
  position: relative !important;
  margin-right: 8px !important;
  width: 285px !important;
  // height: 400px !important;
  animation-duration: 0.1s !important;
}
.sc-message {
  padding-bottom: 4px !important;
}
.sc-message--avatar {
  margin-right: 5px !important;
}
.sc-message--content.sent .sc-message--text {
  max-width: 75% !important;
}
.sc-sub-header {
  padding: 4px 10px !important;
  border: 1px solid #9e9e9e63 !important;
  border-top: none !important;
}
.sc-header {
  min-height: auto !important;
  cursor: pointer;
}
.sc-header--img {
  padding: 10px !important;
  width: 45px !important;
  height: 45px !important;
}
.sc-header--title {
  line-height: 1;
  padding: 5px 10px 5px 0px !important;
  .sc-header--ago {
    line-height: 1;
  }
}
.sc-header--close-button {
  width: 14px !important;
  height: 14px !important;

  img {
    vertical-align: top;
  }
}
.sc-user-input {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  border: 1px solid #9e9e9e63;
}
.sc-user-input--button {
  &:last-child {
    display: none;
  }
  &:nth-child(3) svg {
    margin-top: 4px;
  }
}
.sc-typing-indicator span:last-child {
  margin-right: 0;
}
.ps {
  border: 1px solid #9e9e9e63;
  border-bottom: none;
  border-top: none;
}
</style>

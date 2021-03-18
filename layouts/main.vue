<template>
  <div id="wrapper">
    <page-header></page-header>
    <!-- <socket-example /> -->
    <Nuxt />
    <page-footer></page-footer>

    <div class="chatting-wrapper" v-if="this.$auth.loggedIn">
      <chat-contacts-box />

      <div class="chatbox-wrapper">
        <div v-for="chatbox in chatboxes" :key="chatbox.id">
          <chat-box
            :chatbox-id="chatbox.id"
            :room_name="chatbox.room_name"
            :connection="chatbox.connection"
            :message-list="chatbox.messageList"
            :participants="chatbox.participants"
            :title="chatbox.title"
            :title-ago="chatbox.titleAgo"
            :titleImageUrl="chatbox.titleImageUrl"
            :newMessagesCount="chatbox.newMessagesCount"
            :is-open="chatbox.isOpen"
            :showTypingIndicator="chatbox.showTypingIndicator"
            :projectDetail="chatbox.projectDetail"
            :socket="socket"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/layout/main/PageHeader'
import PageFooter from '@/components/layout/main/PageFooter'
import { mapState } from 'vuex'
import SocketExample from '~/components/SocketExample.vue'

export default {
  components: {
    PageHeader,
    PageFooter,
    SocketExample,
  },
  data: () => ({
    socket: null,
  }),
  computed: {
    ...mapState({
      chatboxes: (state) => {
        return state.messaging.chatboxes.list
      },
    }),
  },
  beforeMount() {
    console.log('beforeMount')
    // this.socket = this.$nuxtSocket({
    //   name: 'chat_messaging',
    //   channel: '/chat_messaging',
    // })
    // this.socket.on('newMessage', (res) => {
    //   console.log('newMessage', res)
    //   this.$store.commit('messaging/contacts/setLatestMsg', {
    //     roomName: res.roomName,
    //     message: res.message,
    //   })
    // })
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      await this.$store.dispatch('messaging/contacts/get')
    }
  },
  methods: {},
}
</script>

<style lang="scss">
.chatbox-wrapper {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 1000;
  margin-right: 235px;
  display: flex;
  align-items: flex-end;
}
.height-auto {
  height: auto !important;
}
</style>

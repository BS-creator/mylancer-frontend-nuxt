<template>
  <div class="contact" @click="openChatBox">
    <div class="user-avatar contact-avatar status-online">
      <img :src="getAvatarUrl(contact.user)" alt="avatar" />
    </div>
    <div class="content">
      <div class="project-title">{{ contact.user.fullname }}</div>
      <div class="message-content" v-if="contact.message">
        {{ contact.message.latest }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openChatBox() {
      let chatbox = {
        id: this.contact.user.username + '_' + this.contact.project.id,
        room_name: this.contact.room_name,
        title: this.contact.user.fullname,
        titleAgo: 'Just now',
        isOpen: true,
        projectDetail: this.contact.project,
        participants: [
          {
            id: this.contact.user.id,
            name: this.contact.user.fullname,
            username: this.contact.user.username,
            imageUrl: this.contact.user.avatar_base64,
          },
          {
            id: this.$auth.user.id,
            name: this.$auth.fullname,
            username: this.$auth.username,
            imageUrl: this.$auth.avatar_base64,
          },
        ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        titleImageUrl: this.contact.user.avatar_base64,
        messageList: [
          {
            type: 'text',
            author: `me`,
            data: { text: `I am ${this.contact.user.fullname}.Say yes!` },
          },
          { type: 'text', author: `user1`, data: { text: `No.` } },
        ], // the list of the messages to show, can be paginated and adjusted dynamically
      }

      this.$store.dispatch('messaging/chatboxes/add', chatbox)
    },
    getAvatarUrl(user) {
      let avatar = '/images/profile/no-avatar.png'
      if (user && user.avatar_base64) {
        avatar = user.avatar_base64
      }
      return avatar
    },
  },
}
</script>

<style>
</style>

<template>
  <div>
    <header id="header-container" class="fullwidth">
      <!-- Header -->
      <div id="header">
        <div class="container">
          <!-- Left Side Content -->
          <div class="left-side">
            <!-- Logo -->
            <logo></logo>
            <!-- Main Navigation -->
            <main-navigation></main-navigation>
            <div class="clearfix"></div>
            <!-- Main Navigation / End -->
          </div>
          <!-- Left Side Content / End -->

          <!-- Right Side Content / End -->
          <div class="right-side">
            <!--  User Notifications -->
            <!-- <user-notification v-if="$auth.loggedIn"></user-notification> -->
            <!-- User Menu -->
            <user-menu v-if="$auth.loggedIn"></user-menu>
            <!-- Login / Register -->
            <div class="header-widget" v-if="!$auth.loggedIn">
              <NuxtLink to="/auth/signin" class="log-in-button">
                <i class="icon-feather-log-in"></i>
                <span>Log In / Register</span>
              </NuxtLink>
            </div>
            <!-- Mobile Navigation Button -->
            <span class="mmenu-trigger">
              <button class="hamburger hamburger--collapse" type="button">
                <span class="hamburger-box">
                  <span class="hamburger-inner"></span>
                </span>
              </button>
            </span>
          </div>
          <!-- Right Side Content / End -->
        </div>
      </div>
      <!-- Header / End -->
    </header>
    <div class="clearfix"></div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
import MainNavigation from '@/components/layout/main/MainNavigation'
import UserNotification from '@/components/layout/main/UserNotification'
import UserMenu from '@/components/layout/main/UserMenu'

export default {
  components: {
    MainNavigation,
    UserNotification,
    UserMenu,
    Logo,
  },
  methods: {
    getuser() {
      this.$axios
        .get(`/api/auth/user`)
        .then((res) => {
          console.log('res')
        })
        .catch((err) => {
          console.log(err.response)
        })
    },
  },
}
</script>


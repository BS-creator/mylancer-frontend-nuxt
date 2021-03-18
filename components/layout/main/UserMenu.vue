<template>
  <div class="header-widget user-menu">
    <el-popover
      placement="bottom"
      popper-class="user-menu-popover"
      trigger="click"
    >
      <!-- Dropdown -->
      <div>
        <!-- User Status -->
        <div class="user-status">
          <!-- User Name / Avatar -->
          <div class="user-details">
            <div class="user-avatar status-online">
              <img :src="getAvatarUrl()" alt="avatar" />
            </div>
            <div class="user-name">
              <!-- <span v-if="$auth.user.username">
                {{ $auth.user.first_name }} {{ $auth.user.last_name }}
              </span>
              <span v-if="!$auth.user.last_name">
                {{ $auth.user.username }}
              </span> -->
              <span class="mb-1.5 text-black" style="font-size: 17px">
                @{{ $auth.user.username }}
              </span>
              <span>
                Balance:
                <b class="text-black text-lg font-sans">
                  ${{ $auth.user.wallet.balance }} USD
                </b>
              </span>
            </div>
          </div>

          <!-- User Status Switcher -->
          <!-- <div class="status-switch" id="snackbar-user-status">
            <label class="user-online current-status">Online</label>
            <label class="user-invisible">Invisible</label>
            <span class="status-indicator" aria-hidden="true"></span>
          </div> -->
        </div>

        <el-row>
          <el-col :md="12">
            <ul class="user-menu-small-nav">
              <li>
                <NuxtLink to="/payments/deposit">
                  <i class="icon-material-outline-account-balance-wallet"></i>
                  Deposit Funds
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/payments/withdraw">
                  <i class="icon-line-awesome-money"></i> Withdraw Funds
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/payments/transactions">
                  <i class="icon-line-awesome-industry"></i> Transaction History
                </NuxtLink>
              </li>
            </ul>
          </el-col>
          <el-col :md="12">
            <ul class="user-menu-small-nav">
              <li>
                <NuxtLink :to="'/u/' + $auth.user.username">
                  <i class="icon-feather-user"></i> View Profile
                </NuxtLink>
              </li>
              <li>
                <a href="dashboard-settings.html"
                  ><i class="icon-material-outline-settings"></i> User
                  Settings</a
                >
              </li>
              <li>
                <a href="#" @click="$auth.logout()">
                  <i class="icon-feather-log-out"></i>
                  Logout</a
                >
              </li>
            </ul>
          </el-col>
        </el-row>
      </div>
      <div slot="reference" class="header-notifications-trigger">
        <a href="javascript:void(0)"
          ><div class="user-avatar status-online">
            <img :src="getAvatarUrl()" alt="" /></div
        ></a>
      </div>
    </el-popover>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log('Auth:user', this.$auth.user)
  },
  methods: {
    getAvatarUrl() {
      let avatar = '/images/profile/no-avatar.png'
      if (this.$auth.user && this.$auth.user.avatar_base64) {
        avatar = this.$auth.user.avatar_base64
      }
      return avatar
    },
  },
}
</script>

<style lang="scss">
.header-widget.user-menu {
  padding: 0 15px;
  .header-notifications-trigger {
    left: 10px;
  }
}
.user-status {
  padding: 13px;
}

.user-menu-small-nav {
  padding: 10px 13px !important;
  li {
    padding: 6px 0 0 !important;
  }
}
.user-menu-popover {
  z-index: 10000011 !important;
  top: 75px !important;

  ul.user-menu-small-nav li a {
    min-width: 200px;
  }
}
</style>

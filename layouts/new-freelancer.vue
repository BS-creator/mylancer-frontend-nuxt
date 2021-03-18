<template>
  <div id="new-freelancer-wrapper">
    <header class="margin-bottom-20">
      <pure-logo></pure-logo>
    </header>
    <div class="container">
      <el-steps :space="200" :active="active" finish-status="success">
        <el-step title="Your Skills"></el-step>
        <el-step title="Your Profile"></el-step>
        <el-step title="Payment Method"></el-step>
        <el-step title="Membership"></el-step>
      </el-steps>
      <div class="margin-top-40"></div>
      <Nuxt />
    </div>
  </div>
</template>

<script>
import PureLogo from '@/components/PureLogo'
import { mapState } from 'vuex'

export default {
  components: {
    PureLogo,
  },
  computed: {
    ...mapState({
      active: (state) => {
        return state.profile.newStep
      },
    }),
  },
}
</script>

<style lang="scss">
body {
  background-color: #f7f7f7;
}
#new-freelancer-wrapper {
  header {
    padding: 20px 50px;
  }
  .step-btns {
    margin-top: 12px;

    & > button:last-child {
      float: right;
    }
  }
}

@media only screen and (max-width: 600px) {
  #new-freelancer-wrapper {
    .el-step__main {
      display: none;
    }
  }
}
</style>

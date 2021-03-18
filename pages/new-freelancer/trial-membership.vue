<template>
  <div class="trial-membership">
    <div>
      <h1 class="margin-bottom-20 margin-top-100">
        Freelancers with <b>Plus Membership</b> are 427% more likely to be
        awarded a project. 1
      </h1>
      <el-row :gutter="10" class="memberships">
        <el-col :sm="24">
          <div class="method">
            <h3>1 Month Free Trial</h3>
            <el-button type="primary" style="width: 100%"
              >Start Trial Now</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="step-btns">
      <el-button @click="prev">
        <i class="el-icon-back"></i> Prev Step
      </el-button>
      <el-button type="text" @click="next">
        Skip for now <i class="el-icon-right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'new-freelancer',
  async fetch({ store }) {
    await store.dispatch('profile/setNewStep', 3)
  },
  computed: {
    ...mapState({
      active: (state) => {
        return state.profile.newStep
      },
    }),
  },
  methods: {
    next() {
      console.log('next')
      this.$router.push('/browse/projects')
    },
    prev() {
      this.$store.dispatch('profile/setNewStep', this.active - 1)
      this.$router.push('/new-freelancer/verify-payment')
    },
  },
}
</script>

<style lang="scss">
.trial-membership {
  h1 {
    text-align: center;
    padding: 0 190px;
    line-height: 41px;
  }
  .memberships {
    max-width: 400px;
    position: relative;
    left: 50%;
    transform: translate(-50%);

    .method {
      background: #fff;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
      padding: 15px 20px;
      min-height: 200px;
      cursor: pointer;
      border: 5px solid white;
      transition: all 0.15s linear;

      h3 {
        text-align: center;
        margin-bottom: 20px;
        margin-top: 35px;
      }
      button {
        position: relative;
        left: 50%;
        transform: translate(-50%);
      }
    }
  }
}
</style>

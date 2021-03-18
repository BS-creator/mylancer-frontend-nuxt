<template>
  <div class="verify-payment">
    <div class="payment-methods">
      <h1 class="margin-bottom-20 margin-top-100">
        Select a Payment Method to verify:
      </h1>
      <el-row :gutter="10">
        <el-col :sm="12">
          <div class="method">
            <h3>Credit / Debit Card</h3>
            <el-button type="primary">Verify Payment</el-button>
          </div>
        </el-col>
        <el-col :sm="12">
          <div class="method">
            <h3>Paypal</h3>
            <el-button type="primary">Verify Payment</el-button>
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
    await store.dispatch('profile/setNewStep', 2)
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
      this.$store.dispatch('profile/setNewStep', this.active + 1)
      this.$router.push('/new-freelancer/trial-membership')
    },
    prev() {
      this.$store.dispatch('profile/setNewStep', this.active - 1)
      this.$router.push('/new-freelancer/your-profile')
    },
  },
}
</script>

<style lang="scss">
.payment-methods {
  max-width: 550px;
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
</style>

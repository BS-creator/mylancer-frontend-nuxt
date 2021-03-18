<template>
  <div id="deposit-page" class="container">
    <header class="pt-10 pb-10">
      <pure-logo></pure-logo>
    </header>
    <div class="content">
      <h2 class="font-bold mb-3">Select Payment Method</h2>
      <el-row :gutter="20">
        <el-col :md="12">
          <el-card>
            <el-collapse accordion>
              <el-collapse-item name="1">
                <template slot="title"> Credit or Debit Card </template>
                <div>
                  Consistent with real life: in line with the process and logic
                  of real life, and comply with languages and habits that the
                  users are used to;
                </div>
              </el-collapse-item>

              <el-collapse-item name="2">
                <template slot="title"> Paypal </template>
                <div>
                  Operation feedback: enable the users to clearly perceive their
                  operations by style updates and interactive effects;
                </div>
              </el-collapse-item>

              <el-collapse-item name="3">
                <template slot="title"> Skrill </template>
                <div>
                  Simplify the process: keep operating process simple and
                  intuitive;
                </div>
              </el-collapse-item>

              <el-collapse-item name="4">
                <template slot="title"> Bank Deposit </template>
                <div>
                  Decision making: giving advices about operations is
                  acceptable, but do not make decisions for the users;
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <el-col :md="12">
          <el-card>
            <el-form
              :model="payForm"
              :rules="payFormRules"
              ref="payForm"
              label-width="180px"
            >
              <el-form-item label="Deposit Amount" prop="amount">
                <el-input
                  :min="1"
                  :max="100000"
                  type="number"
                  v-model.number="payForm.amount"
                  @input="depositAmount"
                  class="no-right-padding"
                >
                  <template slot="prepend">$</template>
                  <template slot="append">USD</template>
                </el-input>
              </el-form-item>
              <el-form-item label="Processing Fee">
                <div class="float-right">${{ payForm.fee }} USD</div>
              </el-form-item>
              <el-form-item label="Total">
                <div class="float-right font-bold text-lg">
                  ${{ payForm.total }} USD
                </div>
              </el-form-item>
              <el-button
                class="full-width"
                type="primary"
                @click="submitPayForm"
                >Confirm and pay ${{ payForm.total }} USD</el-button
              >
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkDepositAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Please input deposit amount'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please input digits'))
        } else {
          if (value < 1) {
            callback(new Error('Minium deposit amount is $1'))
          } else if (value > 100000) {
            callback(new Error('Maximum deposit amount is $100000'))
          } else {
            callback()
          }
        }
      }, 500)
    }
    return {
      paymentMethod: 'card',
      payForm: {
        amount: 1,
        fee: 0,
        total: 1,
      },
      payFormRules: {
        amount: [{ validator: checkDepositAmount, trigger: 'blur' }],
      },
    }
  },
  mounted() {
    console.log('this.auth', this.$auth)
  },
  methods: {
    submitPayForm() {
      this.$refs['payForm'].validate((valid) => {
        if (valid) {
          this.$store
            .dispatch('payments/deposit', {
              user_id: this.$auth.user.id,
              amount: this.payForm.amount,
            })
            .then((res) => {
              console.log('res', res.data)
              this.$auth.setUser(res.data.user)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    depositAmount() {
      this.payForm.total = this.payForm.amount + this.payForm.fee
    },
  },
}
</script>

<style lang="scss">
#deposit-page {
  header {
  }
}
</style>

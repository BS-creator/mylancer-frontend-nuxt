<template>
  <div class="container">
    <!-- Spacer -->
    <div class="margin-top-20"></div>
    <!-- Spacer / End-->

    <el-row :gutter="40" class="margin-bottom-30">
      <el-col :md="6">
        <h3 class="page-title" style="margin-left: -20px">Filters</h3>
      </el-col>
      <el-col :md="18"><h3 class="page-title">Search Results</h3></el-col>
      <el-col :md="6" class="freelancer-filter-panel">
        <freelancer-filter-panel></freelancer-filter-panel>
        <!-- <FreelancerFilterPanel /> -->
      </el-col>
      <el-col :md="18">
        <div class="notify-box">
          <div class="switch-container">
            <el-input
              placeholder="Search for Freelancers"
              prefix-icon="el-icon-search"
              v-model="textSearch"
              size="small"
              @input="$store.dispatch('browse/freelancers/get')"
            >
            </el-input>
          </div>

          <!-- <div class="sort-by">
            <span>Sort by:</span>
            <el-select
              v-model="sortBy"
              class="filter-select"
              placeholder="Select Filter"
              @change="changeSortBy"
            >
              <el-option
                v-for="item in sortByOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div> -->
        </div>

        <!-- Freelancers Container -->
        <freelancers-container></freelancers-container>
        <!-- <FreelancersContainer /> -->
        <!-- Freelancers Container / End -->
      </el-col>
    </el-row>
  </div>
</template>

<script>
import FreelancerFilterPanel from '@/components/freelancers/FreelancerFilterPanel'
import FreelancersContainer from '@/components/freelancers/FreelancersContainer'
import { mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: `browse/freelancers/getField`,
  mutationType: `browse/freelancers/updateField`,
})

export default {
  layout: 'main',
  transition: 'fade',

  components: {
    FreelancerFilterPanel,
    FreelancersContainer,
  },
  data() {
    return {
      sortByOptions: [
        {
          value: 'latest',
          label: 'Latest',
        },
        {
          value: 'oldest',
          label: 'Oldest',
        },
        {
          value: 'lowest_price',
          label: 'Lowest Price',
        },
        {
          value: 'hightest_price',
          label: 'Hightest Price',
        },
      ],
    }
  },
  async fetch({ store }) {
    await store.dispatch('projectModules/categories/get')
    await store.dispatch('projectModules/skills/get')
    await store.dispatch('assets/getCountries')
    await store.dispatch('browse/freelancers/get', {})
    await store.dispatch('profile/getLanguages')
  },
  computed: {
    ...mapState({
      freelancers: (state) => {
        return state.browse.freelancers.list
      },
    }),
    ...mapFields(['filterOptions.sortBy', 'filterOptions.textSearch']),
  },
  async mounted() {},
  methods: {
    changeSortBy() {
      console.log('changeSortBy: ', this.sortBy)
      this.$store.dispatch('projectModules/freelancers/get')
    },
  },
}
</script>

<style lang="scss">
.switch-container {
  min-width: 300px;
}
.filter-select {
  position: relative;
  top: -5px;
  left: 20px;

  .el-input--suffix .el-input__inner {
    border: navajowhite;
    background: transparent;
    width: 128px;
    color: var(--color-primary);
    padding: 0;
    font-size: 16px;
    font-weight: bold;
  }
}
.margin-top-60 {
  margin-top: 60px !important;
}
.notify-box {
  background-color: white;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
}
</style>

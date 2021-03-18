<template>
  <div class="sidebar-container">
    <!-- Location -->
    <div class="sidebar-widget">
      <h3>Location</h3>
      <el-select
        v-model="locations"
        multiple
        filterable
        style="display: block"
        placeholder="Select Country"
      >
        <el-option
          v-for="item in countries"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <!-- Skill -->
    <div class="sidebar-widget">
      <h3>Skill</h3>
      <el-select
        v-model="skills"
        multiple
        filterable
        style="display: block"
        placeholder="Select Skill"
      >
        <el-option
          v-for="item in skillList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <!-- Language -->
    <div class="sidebar-widget">
      <h3>Language</h3>
      <el-select
        v-model="languages"
        multiple
        filterable
        style="display: block"
        placeholder="Select Language"
      >
        <el-option
          v-for="item in languageList"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <!-- Hourly Rate -->
    <div class="sidebar-widget">
      <h3 class="margin-bottom-10">Hourly Rate</h3>

      <el-radio-group v-model="hourlyRate">
        <el-radio label="0">Any hourly rate</el-radio><br />
        <el-radio label="-10">$10 and below</el-radio><br />
        <el-radio label="10-30">$10 - $30</el-radio><br />
        <el-radio label="30-60">$30 - $60</el-radio><br />
        <el-radio label="60+">$60 & above</el-radio><br />
      </el-radio-group>
    </div>

    <!-- Rating -->
    <div class="sidebar-widget">
      <h3>Rating</h3>
      <el-rate
        v-model="rate"
        text-color="#ff9900"
        score-template="{value}"
        class="el-rate-medium"
        style="display: inline-block"
      >
      </el-rate>
      <el-button
        type="text"
        icon="el-icon-close"
        v-if="rate != 0"
        @click="resetRate"
      ></el-button>
    </div>

    <div class="margin-top-40">
      <el-button type="text" class="float-left" @click="resetFilter"
        >Reset filters</el-button
      >
      <el-button plain class="float-right" size="small" @click="applyFilter"
        >Apply filters</el-button
      >
    </div>

    <div class="clearfix"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: `browse/freelancers/getField`,
  mutationType: `browse/freelancers/updateField`,
})

export default {
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.projectModules.categories.list
      },
      skillList: (state) => {
        return state.projectModules.skills.list
      },
      filterOptions: (state) => {
        return state.browse.freelancers.filterOptions
      },
      countries: (state) => {
        return state.assets.countries
      },
      languageList: (state) => {
        return state.profile.languages
      },
    }),
    ...mapFields([
      'filterOptions.locations',
      'filterOptions.categories',
      'filterOptions.skills',
      'filterOptions.hourlyRate',
      'filterOptions.languages',
      'filterOptions.rate',
    ]),
  },
  mounted: function () {},
  methods: {
    formatRateToolTip(value) {
      console.log(value)
      // return '$' + value
    },
    resetRate() {
      this.rate = 0
    },
    resetFilter() {
      this.locations = []
      this.categories = []
      this.languages = []
      this.skills = []
      this.hourlyRate = '0'
      this.rate = 0

      this.$store.dispatch('browse/freelancers/get')
    },
    applyFilter() {
      console.log('filterOptions', this.filterOptions)
      this.$store.dispatch('browse/freelancers/get')
    },
  },
}
</script>

<style lang="scss">
.freelancer-filter-panel {
  background-color: white;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  height: fit-content;

  .show-tooltip {
    display: block !important;
  }

  .price-range {
    text-align: center;
  }

  .sidebar-widget h3 {
    font-size: 16px;
    margin-bottom: 0px;
  }

  .sidebar-widget {
    margin: 0;
    padding: 20px 6px 30px 6px;
    display: block;
    border-bottom: 1px solid #d3d3d361;
  }
}
</style>

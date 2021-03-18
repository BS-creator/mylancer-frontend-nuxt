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

    <!-- Category -->
    <div class="sidebar-widget">
      <h3>Category</h3>
      <el-select
        v-model="categories"
        multiple
        filterable
        style="display: block"
        placeholder="Select Category"
      >
        <el-option
          v-for="item in categoryList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
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

    <!-- Budget -->
    <div class="sidebar-widget">
      <h3>Fixed Price</h3>
      <!-- Range Slider -->
      <el-slider
        v-model="fixedPrice"
        range
        :min="1"
        :max="10000"
        tooltip-class="show-tooltip"
        style="padding: 0 8px"
      >
      </el-slider>
      <div class="price-range">
        From ${{ fixedPrice[0] }} to ${{ fixedPrice[1] }}
      </div>
    </div>

    <!-- Hourly Rate -->
    <div class="sidebar-widget">
      <h3>Hourly Rate</h3>
      <!-- Range Slider -->
      <el-slider
        v-model="hourlyPrice"
        range
        :min="1"
        :max="300"
        tooltip-class="show-tooltip"
        style="padding: 0 8px"
      >
      </el-slider>
      <div class="price-range">
        From ${{ hourlyPrice[0] }} to ${{ hourlyPrice[1] }}
      </div>
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
  getterType: `projectModules/projects/getField`,
  mutationType: `projectModules/projects/updateField`,
})

export default {
  components: {},
  data() {
    return {
      filter: {
        categories: '',
        countries: '',
        skills: '',
        fixed: 0,
        hourly: 0,
      },
    }
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
        return state.projectModules.projects.filterOptions
      },
      countries: (state) => {
        return state.assets.countries
      },
    }),
    ...mapFields([
      'filterOptions.locations',
      'filterOptions.categories',
      'filterOptions.skills',
      'filterOptions.fixedPrice',
      'filterOptions.hourlyPrice',
    ]),
  },
  mounted: function () {},
  methods: {
    formatRateToolTip(value) {
      console.log(value)
      // return '$' + value
    },
    resetFilter() {
      localStorage.setItem('mylancer.project.filterOptions', null)
      this.locations = []
      this.categories = []
      this.skills = []
      this.fixedPrice = [1, 10000]
      this.hourlyPrice = [1, 300]

      this.$store.dispatch('projectModules/projects/get')
    },
    applyFilter() {
      console.log('filterOptions', this.filterOptions)
      this.$store.dispatch('projectModules/projects/get')
    },
  },
}
</script>

<style lang="scss">
.project-filter-panel {
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

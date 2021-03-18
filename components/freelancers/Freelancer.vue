<template>
  <div class="task-listing freelancers-container freelancers-list-layout">
    <!-- Job Listing Details -->
    <!--Freelancer -->
    <div class="freelancer">
      <!-- Overview -->
      <div class="freelancer-overview">
        <div class="freelancer-overview-inner">
          <!-- Bookmark Icon -->
          <span class="bookmark-icon"></span>

          <!-- Avatar -->
          <div class="freelancer-avatar">
            <!-- <div class="verified-badge"></div> -->
            <a target="_blank" :href="'/u/' + freelancer.username"
              ><img :src="getAvatarUrl(freelancer)" alt=""
            /></a>
          </div>

          <!-- Name -->
          <div class="freelancer-name">
            <h4>
              <a href="#"
                >{{ freelancer.fullname }}
                <img
                  class="flag"
                  :src="
                    '/images/flags/' + freelancer.location.countryCode + '.svg'
                  "
                  alt="avatar"
                  :title="freelancer.location.countryName"
                  data-tippy-placement="top"
              /></a>
            </h4>
            <span>{{
              freelancer.profile_detail
                ? freelancer.profile_detail.headline
                : ''
            }}</span>
            <!-- Rating -->
            <div class="freelancer-rating">
              <el-rate
                :value="
                  freelancer.total_average_rate
                    ? freelancer.total_average_rate
                    : 0.0
                "
                show-score
                disabled
                text-color="#ff9900"
                score-template="{value}"
                class="el-rate-medium"
              >
              </el-rate>
            </div>
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="freelancer-details">
        <div class="freelancer-details-list">
          <ul>
            <li>
              Location
              <strong
                ><i class="icon-material-outline-location-on"></i>
                {{ freelancer.location.cityName }}</strong
              >
            </li>
            <li v-if="freelancer.profile_detail">
              Rate
              <strong>${{ freelancer.profile_detail.hourly_rate }} / hr</strong>
            </li>
            <li v-else>Rate <strong>N/A</strong></li>
            <li>Job Success <strong>100%</strong></li>
          </ul>
        </div>
        <a
          :href="'/u/' + freelancer.username"
          target="_blank"
          class="button button-sliding-icon ripple-effect"
          >View Profile <i class="icon-material-outline-arrow-right-alt"></i
        ></a>
      </div>
    </div>
    <!-- Freelancer / End -->
  </div>
</template>

<script>
export default {
  props: {
    freelancer: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getAvatarUrl(freelancer) {
      let avatar = '/images/profile/no-avatar.png'
      if (freelancer && freelancer.avatar_base64) {
        avatar = freelancer.avatar_base64
      }
      return avatar
    },
  },
}
</script>

<style lang="scss">
.freelancer {
  margin: 0 !important;
  &:hover {
    box-shadow: none !important;
    transform: none !important;
  }
}
</style>

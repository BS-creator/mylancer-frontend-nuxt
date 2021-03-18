<template>
  <a
    :href="'/projects/' + project.slug + '/details'"
    target="_blank"
    class="task-listing"
  >
    <!-- Job Listing Details -->
    <div class="task-listing-details">
      <!-- Details -->
      <div class="task-listing-description">
        <h3 class="task-listing-title">
          {{ project.name }}
        </h3>
        <p class="task-listing-text">
          {{ project.description }}
        </p>
        <ul class="task-icons">
          <li>
            <i class="icon-material-outline-location-on"></i>
            {{ project.client.location.countryName }}
            <img
              class="flag"
              :src="
                '/images/flags/' + project.client.location.countryCode + '.svg'
              "
              alt="avatar"
              :title="project.client.location.countryName"
              data-tippy-placement="top"
            />
          </li>
          <li>
            <i class="icon-material-outline-access-time"></i>
            {{ $moment(new Date(project.created_at)).fromNow() }}
          </li>
        </ul>
        <div class="task-tags">
          <span v-for="skill in project.skills" :key="skill.id">{{
            skill.name
          }}</span>
        </div>
      </div>
    </div>

    <div class="task-listing-bid">
      <div class="task-listing-bid-inner">
        <div class="task-offers">
          <strong>${{ project.budget_min }} - ${{ project.budget_max }}</strong>
          <span v-if="project.pay_type == 'fixed'">Fixed</span>
          <span v-if="project.pay_type == 'hourly'">Hourly</span>
        </div>
        <span class="button button-sliding-icon ripple-effect"
          >Bid Now <i class="icon-material-outline-arrow-right-alt"></i
        ></span>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style lang="scss">
.task-icons .flag {
  display: inline-block;
  width: 20px;
  margin-top: -3px;
}
</style>

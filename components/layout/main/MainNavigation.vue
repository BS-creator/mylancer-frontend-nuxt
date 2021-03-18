<template>
  <nav id="navigation">
    <ul id="responsive">
      <li class="">
        <NuxtLink
          to="/browse/projects"
          v-bind:class="{ current: $nuxt.$route.path == '/browse/projects' }"
        >
          <i class="icon-feather-compass"></i> Projects
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/browse/freelancers"
          v-bind:class="{ current: $nuxt.$route.path == '/browse/freelancers' }"
        >
          <i class="icon-feather-users"></i> Freelancers
        </NuxtLink>
      </li>
      <!-- <li>
        <NuxtLink to="/browse/projects">Browse Freelancers</NuxtLink>
      </li> -->
      <li id="post-project-link">
        <NuxtLink to="/post-project">
          <button class="button ripple-effect">Post a Project</button>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  mounted() {
    console.log(
      '$nuxt.$route.name',
      this.$nuxt.$route.name,
      this.$nuxt.$route.path
    )
  },
}
</script>

<style lang="scss">
#navigation {
  #post-project-link {
    top: -6px;
  }
}
</style>

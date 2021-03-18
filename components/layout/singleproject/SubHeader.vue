<template>
  <div class="sub-header-container">
    <div class="container">
      <header class="project-detail-header">
        <h2 class="project-title">{{ project.name }}</h2>
        <div class="project-status">
          <span v-if="accepted.length > 0 && accepted[0].amount <= releasedSum">
            Completed
          </span>
          <span v-else-if="awarded.length === 0"> Open </span>
          <span v-else-if="awarded.length > 0 && accepted.length === 0">
            Awaiting Acceptance
          </span>
          <span v-else-if="accepted.length > 0"> Accepted </span>
        </div>
      </header>
      <el-menu
        :default-active="activePageTab"
        class="project-detail-tab-menu"
        mode="horizontal"
        background-color="#0e1724"
        text-color="white"
        active-text-color="white"
        @select="handleSelect"
      >
        <el-menu-item index="/details">
          <NuxtLink
            :to="{
              name: 'projects-slug-details',
              params: { slug: $route.params.slug },
            }"
          >
            Details
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="/proposals">
          <NuxtLink
            :to="{
              name: 'projects-slug-proposals',
              params: { slug: $route.params.slug },
            }"
          >
            Proposals
          </NuxtLink>
        </el-menu-item>
        <el-menu-item
          index="/payments"
          v-if="
            awarded.length &&
            (IamAwarded || project.client.id === $auth.user.id)
          "
        >
          <NuxtLink
            :to="{
              name: 'projects-slug-payments',
              params: { slug: $route.params.slug },
            }"
          >
            Payments
          </NuxtLink>
        </el-menu-item>
        <el-menu-item index="/tasks">
          <NuxtLink
            :to="{
              name: 'projects-slug-tasks',
              params: { slug: $route.params.slug },
            }"
          >
            Tasks
          </NuxtLink>
        </el-menu-item>
        <el-menu-item
          index="/reviews"
          v-if="
            accepted.length > 0 &&
            ($auth.user.id == accepted[0].freelancer.id ||
              $auth.user.id == project.client.id) &&
            accepted[0].amount <= releasedSum
          "
        >
          <NuxtLink
            :to="{
              name: 'projects-slug-reviews',
              params: { slug: $route.params.slug },
            }"
          >
            Reviews
          </NuxtLink>
        </el-menu-item>
        <!-- <el-submenu index="8">
          <template slot="title"><i class="el-icon-more"></i></template>
          <el-menu-item index="2-1"
            ><NuxtLink to="/post-project">Edit project</NuxtLink></el-menu-item
          >
          <el-menu-item index="2-2">Delete project</el-menu-item>
        </el-submenu> -->
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      IamAwarded: false,
    }
  },
  computed: {
    ...mapState({
      project: (state) => {
        return state.projectModules.projects.project
      },
      activePageTab: (state) => {
        return state.projectModules.projects.activePageTab
      },
      awarded: (state) => {
        return state.projectModules.proposals.awarded
      },
      accepted: (state) => {
        return state.projectModules.proposals.accepted
      },
      releasedSum: (state) => {
        return state.projectModules.milestones.releasedSum
      },
    }),
  },
  beforeMount() {
    this.awarded.forEach((proposal) => {
      if (proposal.freelancer.id === this.$auth.user.id) {
        this.IamAwarded = true
      }
    })
  },
  mounted() {
    console.log('awarded.length', this.awarded.length)
    console.log('accepted.length', this.accepted.length)
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      // this.$router.push(key)
    },
  },
}
</script>

<style lang="scss">
.sub-header-container {
  background-color: #0e1724;

  .project-detail-header {
    background-color: #0e1724;
    padding-top: 30px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;

    .project-title {
      display: inline-block;
      color: white;
      font-weight: bold;
    }
    .project-status {
      background-color: white;
      font-weight: 900;
      font-size: 13px;
      padding: 3px 30px;
      border-radius: 50px;
    }
  }

  .project-detail-tab-menu {
    background-color: #0e1724;
    border-bottom: none;

    .el-menu-item {
      color: white;
      padding: 0;

      a {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0 20px;
      }
      &.is-active {
        // border-bottom: 3px solid white;
        border-bottom-width: 5px;
        border-bottom-color: var(--color-primary) !important;
        font-weight: bold;
        color: white;
      }
      &:focus {
        background-color: #0e1724 !important;
        color: white !important;
      }
      &:hover {
        background-color: #0e1724 !important;
        color: white !important;
      }
      &:not(.is-active):hover {
        border-bottom: 5px solid white !important;
      }
    }
  }
}
</style>

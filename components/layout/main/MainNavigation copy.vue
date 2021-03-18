<template>
  <nav id="navigation">
    <ul id="responsive">
      <li>
        <!-- <a href="#">FIND WORK</a> -->
        <NuxtLink to="/browse/projects">FIND WORK</NuxtLink>
        <ul class="dropdown-nav">
          <!-- <li><a href="browse-companies.html">Find Work</a></li> -->
          <li><NuxtLink to="/browse/projects">Find Work</NuxtLink></li>
          <li><a href="single-job-page.html">Saved Jobs</a></li>
          <li><a href="single-task-page.html">Proposals</a></li>
          <li><a href="single-company-profile.html">My Stats</a></li>
        </ul>
      </li>
      <li>
        <a href="#">MY JOBS</a>
        <ul class="dropdown-nav">
          <li>
            <a href="single-freelancer-profile.html">Freelancer Profile</a>
          </li>
          <li><a href="dashboard-post-a-job.html">Post a Job</a></li>
          <li>
            <a href="dashboard-post-a-task.html">Post a Task</a>
          </li>
        </ul>
      </li>

      <li>
        <a href="#">REPORTS</a>
        <ul class="dropdown-nav">
          <li><a href="dashboard.html">Dashboard</a></li>
          <li><a href="dashboard-messages.html">Messages</a></li>
          <li><a href="dashboard-bookmarks.html">Bookmarks</a></li>
          <li><a href="dashboard-reviews.html">Reviews</a></li>
          <li><a href="dashboard-settings.html">Settings</a></li>
        </ul>
      </li>

      <li id="post-project-link">
        <NuxtLink to="/post-project"
          ><button class="button ripple-effect">
            Post a Project
          </button></NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
#navigation {
  #post-project-link {
    top: -6px;
  }
}
</style>

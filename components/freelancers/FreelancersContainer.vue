<template>
  <div
    class="tasks-list-container"
    id="freelancers-container"
    v-loading="freelancer_loading"
  >
    <!-- Freelancer -->
    <freelancer
      v-for="freelancer in freelancers.data"
      :key="freelancer.id"
      :freelancer="freelancer"
    ></freelancer>

    <!-- Pagination -->
    <div class="clearfix"></div>
    <div class="row">
      <div class="col-md-12">
        <!-- Pagination -->
        <div class="pagination-container margin-top-30 margin-bottom-60">
          <el-pagination
            style="text-align: center"
            background
            layout="prev, pager, next"
            :page-size="10"
            :current-page="freelancers.current_page"
            :total="freelancers.total"
            @current-change="pageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- Pagination / End -->
  </div>
</template>

<script>
import Freelancer from '@/components/freelancers/Freelancer'
import { mapState } from 'vuex'

export default {
  components: {
    Freelancer,
  },
  data() {
    return {
      freelancer_loading: true,
    }
  },
  computed: {
    ...mapState({
      freelancers: (state) => {
        return state.browse.freelancers.list
      },
    }),
  },
  mounted: function () {
    console.log(this.freelancers)
    this.freelancer_loading = false
  },
  methods: {
    async pageChange(current_page) {
      console.log('pageChange', current_page)
      await this.$store.commit('browse/freelancers/setCurPage', current_page)
      this.$store.dispatch('browse/freelancers/get')
    },
  },
}
</script>

<style lang="scss">
#freelancers-container {
  margin-top: 8px !important;

  .task-listing {
    margin-bottom: 5px;
    transition: 0.3s;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);

    &::after {
      transition: all 0.3s ease-out;
      background: var(--color-primary);
      bottom: -1px;
      content: '';
      display: block;
      left: 0;
      position: absolute;
      top: -1px;
    }
    &:hover {
      transform: none;
      border-top-left-radius: unset;
      border-bottom-left-radius: unset;

      &::after {
        width: 5px;
      }
    }
    .task-listing-details {
      // padding: 20px 30px;

      .task-listing-description {
        .task-listing-text {
          line-height: initial;
          font-size: 16px;
          max-height: 45px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 18px;
        }
        .task-icons {
          display: flex;
          flex-wrap: wrap;
          margin: 15px 0 0 -3px;
          align-items: center;

          li {
            margin-right: 20px;
          }
        }
      }
      .task-tags {
        margin: 5px 0 3px 0;
        span {
          margin: 2px 2px;
          padding: 3px 10px;
        }
      }
    }
    .task-listing-bid {
      .task-offers {
        strong {
          font-size: larger;
        }
      }
    }
  }
  .el-pagination.is-background .el-pager li,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .btn-next {
    min-width: 44px;
    min-height: 44px;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 1px 1px 3px #607d8b;
  }
}
</style>

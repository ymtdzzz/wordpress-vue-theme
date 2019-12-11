<template>
    <div class="pager">
        <ul class="pagination">
            <li class="pre">
                <span class="disabled-button" v-if="is_first"><span>«</span></span>
                <router-link v-else :to="{ name: current_path, params: { page: 1 } }"><span>«</span></router-link>
            </li>
            <li class="pre">
                <span class="disabled-button" v-if="is_first"><span><</span></span>
                <router-link v-else :to="{ name: current_path, params: { page: parseInt(currentPage) - 1 } }"><span><</span></router-link>
            </li>
            <li v-for="index in pager_nums" :key="index">
              <router-link v-if="(index + start_page - 1) === parseInt(currentPage)" :to="{ name: current_path, params: { page: (index + start_page - 1) } }" class="active"><span>{{ index + start_page - 1 }}</span></router-link>
              <router-link v-else :to="{ name: current_path, params: { page: (index + start_page - 1) } }"><span>{{ index + start_page - 1 }}</span></router-link>
            </li>
            <li class="page-no">{{ currentPage }}/{{ totalPages }}</li>
            <li class="next">
                <span class="disabled-button" v-if="is_last"><span>></span></span>
                <router-link v-else :to="{ name: current_path, params: { page: parseInt(currentPage) + 1 } }"><span>></span></router-link>
            </li>
            <li class="next">
                <span class="disabled-button" v-if="is_last"><span>»</span></span>
                <router-link v-else :to="{ name: current_path, params: { page: totalPages } }"><span>»</span></router-link>
            </li>
        </ul>
    </div>
</template>

<script>
  import Constants from "../../Constants"
  import router from "../../router"
  import { mapGetters } from 'vuex'

  export default {
      computed: {
          ...mapGetters({
              categoryId: 'categoryId',
              loadedPosts: 'loadedPosts',
              totalPages: 'totalPages',
              currentPage: 'currentPage'
          })
      },
      data: () => {
        return {
            start_page: 0,
            end_page: 0,
            pager_nums: 0,
            is_first: false,
            is_last: false,
            current_path: router.currentRoute.name
        }
      },
      methods: {
          initPager() {
              const current_page = parseInt(this.currentPage)
              const total_pages = parseInt(this.totalPages)
              const start_diff = current_page - 3
              const end_diff = current_page + 2
              if (start_diff <= 0 && end_diff > total_pages) {
                  this.start_page = 1
                  this.end_page = total_pages
              } else if (start_diff <= 0 && end_diff <= total_pages) {
                  this.start_page = 1
                  this.end_page = end_diff + Math.abs(start_diff)
                  if (this.end_page > total_pages) {
                      this.end_page = total_pages
                  }
              } else if (start_diff > 0 && end_diff > total_pages) {
                  this.start_page = start_diff - (end_diff - total_pages - 1)
                  this.end_page = total_pages
                  if (this.start_page <= 0) {
                      this.start_page = 1
                  }
              } else {
                  this.start_page = start_diff + 1
                  this.end_page = end_diff
              }
              this.pager_nums = this.end_page - this.start_page + 1
              if (current_page === 1) {
                  this.is_first = true
              } else {
                  this.is_first = false
              }
              if (current_page === total_pages) {
                  this.is_last = true
              } else {
                  this.is_last = false
              }
          }
      },
      mounted() {
        this.initPager()
      },
      watch: {
          'loadedPosts' (to, from) {
              this.initPager()
          }
      }
  }
</script>

<style lang="scss" scoped>
</style>

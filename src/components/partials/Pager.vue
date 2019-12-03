<template>
    <div class="pager">
        <ul class="pagination">
            <li class="pre"><a href="#"><span>«</span></a></li>
            <li v-for="index in pager_nums" :key="index">
              <router-link v-if="(index + start_page - 1) === parseInt(current_page)" :to="{ name: 'Home', params: { page: (index + start_page - 1) } }" class="active"><span>{{ index + start_page - 1 }}</span></router-link>
              <router-link v-else :to="{ name: 'Home', params: { page: (index + start_page - 1) } }"><span>{{ index + start_page - 1 }}</span></router-link>
            </li>
            <li class="next"><a href="#"><span>»</span></a></li>
        </ul>
    </div>
</template>

<script>
  export default {
      props: [
          'total_pages',
          'current_page'
      ],
      data: () => {
        return {
            start_page: 0,
            end_page: 0,
            pager_nums: 0,
        }
      },
      methods: {
          initPager() {
              const current_page = parseInt(this.current_page)
              const total_pages = parseInt(this.total_pages)
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
                  this.start_page = start_diff - (end_diff - total_pages)
                  this.end_page = total_pages
                  if (this.start_page <= 0) {
                      this.start_page = 1
                  }
              } else {
                  this.start_page = start_diff + 1
                  this.end_page = end_diff
              }
              this.pager_nums = this.end_page - this.start_page + 1
          }
      },
      mounted() {
        this.initPager()
      },
      watch: {
          '$route' (to, from) {
              this.initPager()
          }
      }
  }
</script>

<style lang="scss" scoped>
    .pager {
        display: flex;
        align-items: center;
        justify-content: center;

        .pagination {
            text-align: center;

            li {
                display: inline;
                margin: 0 2px;
                padding: 0;
                display: inline-block;
                width: 50px;
                height: 50px;
                text-align: center;
                position: relative;
                border-radius: 10px;

                a {
                    vertical-align: middle;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    display:table;
                    text-decoration: none;
                    -webkit-transition: all 0.3s ease;
                    -moz-transition: all 0.3s ease;
                    -o-transition: all 0.3s ease;
                    transition: all  0.3s ease;

                    &:hover,
                    &.active {
                        color: #fff;
                        background: black;
                    }

                    span {
                        display:table-cell;
                        vertical-align:middle;
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 767px){
        .pager {

            .pagination {

                li {
                    display: none;

                    &.pre,
                    &.next {
                        display: inline-block;
                        width: 40%;
                        height: 50px;
                        text-align: center;

                        a {
                            width: 100%;
                            text-align: center;
                        }

                        span::after {
                            content: "　前の10件へ";
                        }

                        span::before {
                            content: "次の10件へ　";
                        }
                    }
                }
            }
        }
    }
    </style>

<template>
  <div>
    <div class="site-footer">
      <div class="footer-widget">
        Footer Container 1
      </div>
      <div class="footer-widget">
        Footer Container 2
      </div>
      <div class="footer-widget">
        <profile />
      </div>
    </div>
    <footer class="copy-right">
      © 2019 yMATSUDA All rights reserved.
    </footer>
  </div>
</template>

<script>
  import Profile from '../widgets/Profile'

  export default {
    components: {
      Profile
    }
  }
</script>

<style lang="scss" scoped>
  .site-footer {
    min-height: 350px;
    background-color: black;
    color: white;
    display: flex;

    .footer-widget {
      flex: 1;
      border-right: 1px solid white;
      padding: 5px;
      margin: 10px;

      &:last-child {
        border: none;
      }
    }
  }
  .copy-right {
    padding: 5px 0;
    text-align: center;
  }
</style>
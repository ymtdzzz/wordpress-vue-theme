<template>
  <div>
    <div class="site-footer">
      <div class="footer-widget">
      </div>
      <div class="footer-widget">
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
    background-color: black;
    color: white;
    display: flex;
    padding: 0 5%;

    .footer-widget {
      flex: 1;
      /*border-right: 1px solid white;*/
      padding: 15px;
      margin: 10px;

      &:last-child {
        /*border: none;*/
      }
    }
  }
  .copy-right {
    padding: 10px 0;
    background-color: black;
    text-align: center;
    color: white;
  }
</style>
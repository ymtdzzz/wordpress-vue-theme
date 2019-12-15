<template>
  <div>
    <div class="site-footer">
      <div class="footer-widget">
        <footer-menu />
      </div>
      <div class="footer-widget">
      </div>
      <div class="footer-widget">
        <profile />
      </div>
    </div>
    <footer class="copy-right">
      © 2019 vivolog All rights reserved.
    </footer>
  </div>
</template>

<script>
  import Profile from '../widgets/Profile'
  import FooterMenu from '../widgets/FooterMenu'

  export default {
    components: {
      Profile,
      FooterMenu
    }
  }
</script>

<style lang="scss" scoped>
</style>
<template>
  <nav class="nav">
    <router-link class="nav-item" to="/">Home</router-link>
    <router-link class="nav-item" to="/color-changer">色彩裂变</router-link>
    <router-link class="nav-item" to="/font-auto-resize">文字换行</router-link>
  </nav>
  <router-view />
</template>

<style lang="stylus">
@import './styls/index.styl'
$navWidth = 200px
.nav
  padding 12px
  position fixed
  left 0
  top 0
  width $navWidth
  height 100%
  background-color #fff
  box-sizing border-box
  .nav-item
    display block
    width 100%
    margin-bottom 12px
    text-decoration none
    color #444
    padding 12px
    box-sizing border-box
    font-size 16px
    line-height 20px
    vertical-align middle
    border-radius 4px
    &.router-link-active
      background-color #f5f5f5
      color #108cee
    &:hover
      background-color #f5f5f5
html,body
  height 100%
body #app
  font-family Arial, sans-serif
  line-height 1.6
  color #333
  padding 40px 40px 40px 240px
  background-color #f4f4f4
  min-height 100%
.container
  max-width 1280px
  margin auto
  background-color white
  padding 40px
  border-radius 24px
  box-shadow 0 0 10px rgba(0, 0, 0, 0.1)
</style>

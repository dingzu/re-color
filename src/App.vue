<template>
  <nav class="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/color-changer">色彩切换</router-link>
    <router-link to="/font-auto-resize">文字尺寸切换</router-link>
  </nav>
  <router-view/>
</template>

<style lang="stylus">
@import './styls/index.styl'
.nav
  padding 12px
</style>
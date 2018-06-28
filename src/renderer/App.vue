<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import setStaticPath from '../util/setStaticPath';
  window.setStaticPath = setStaticPath;
  export default {
    name: 'mytoy'
  }
  document.addEventListener('dragover', event => event.preventDefault());
  document.addEventListener('drop', event => event.preventDefault());
</script>

<style>
  @import './assets/scss/reset.scss';
</style>
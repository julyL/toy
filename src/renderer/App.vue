<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'my-toy'
  }
  document.addEventListener('dragover', event => event.preventDefault());
  document.addEventListener('drop', event => event.preventDefault());
</script>

<style>
  @import './assets/scss/reset.scss';
  @import './assets/scss/common.scss';
</style>
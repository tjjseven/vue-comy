<template>
  <mt-header :title="headerC" fixed>

  </mt-header>
</template>
<script>
  export default{
    name: 'heads',
    data () {
      return {
        headerC: 'vue'
      }
    }
  }
</script>
<style lang="less">
  .mint-header{
    background: #41b883;
    height: 50px;
  }
</style>

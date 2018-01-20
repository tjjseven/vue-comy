<template>
  <mt-header :title="headerC" fixed></mt-header>
</template>
<script>
  export default{
    name: 'heads',
    data () {
      return {
        headerC: 'vue社区'
      }
    }
  }
</script>
<style lang="less">
  header.mint-header{
    background: #41b883;
    height: 50px;
  }
</style>

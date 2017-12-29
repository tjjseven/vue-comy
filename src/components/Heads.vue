/* eslint-disable */
<template>
  <div id="heads">{{headerC}}</div>
</template>
<script>
  export default{
    name : "heads",
    data(){
      return{
        headerC : 'vue'
      }
    }
  }
</script>
<style lang="less">
  #heads{
    line-height: 60px;
    color: #fff;
  }
</style>

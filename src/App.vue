/* eslint-disable */
<template>
  <el-container id="app">
    <el-header><Heads/></el-header>

    <el-main id="content"><router-view/></el-main>

    <el-footer><Foots/></el-footer>
  </el-container>
</template>

<script>
  import Heads from './components/Heads';
  import Foots from './components/Foots';
  export default {
    name: 'app',
    components: {
      Heads,
      Foots
    },
  }
</script>

<style lang="less">
  .height{
    height:100%
  }
  html,body{
    .height;
  }
  body,ul,ol,li,p,h1,h2,h3,h4{
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  h1, h2 {
    font-weight: normal;
  }
  img{
    width: 100%;
    display: block;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: .8rem;
    .height;
  }
  #content{
    .height;
    /*overflow-y: scroll;*/
    padding: 0;
  }
  .el-header{
    background: #41b883;
  }
  .el-footer{
    background:#1f2d3d;
  }
  .el-tabs__header{
    position: absolute;
    background: #fff;
  }
</style>

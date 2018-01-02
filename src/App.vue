<template>
  <el-container id="app">
    <el-header><Heads/></el-header>

    <el-main id="content">
      <transition name="trans-router" mode="out-in">
        <router-view/>
      </transition>
    </el-main>

    <el-footer><Foots/></el-footer>
  </el-container>
</template>

<script>
  import Heads from './components/Heads'
  import Foots from './components/Foots'
  export default {
    name: 'app',
    components: {
      Heads,
      Foots
    }
  }
</script>

<style lang="less">
  .height{
    height:100%
  }
  html,body{
    .height;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB",
    "Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  body,ul,ol,li,p,h1,h2,h3,h4,h5,h6{
    padding: 0;
    margin: 0;
    list-style-type: none;
    /*font-weight: normal;*/
  }
  img{
    width: 100%;
  }
  a{
    text-decoration: none;
    color: #fff;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: .8rem;
    line-height: 1rem;
    .height;
  }
  #content{
    .height;
    padding: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .el-header{
    background: #41b883;
  }
  .el-footer{
    background:#1f2d3d;
  }
  .trans-router-enter,.trans-router-leave-to{
    opacity: 0;
  }
  .trans-router-enter-active,.trans-router-leave-active{
    transition: all .2s ease;
  }
  .trans-router-enter-to,.trans-router-leave{
    /*transform: translateX(0);*/
  }
  .tab{
    background: #41b883;
    color: #fff;
    text-align: center;
    border-radius: .2rem;
    font-size: .6rem;
  }
</style>

<template>
  <div id="app">
    <Heads/>

    <div id="content">
      <transition name="trans-router" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"/>
        </keep-alive>
      </transition>

      <transition name="trans-router" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"/>
      </transition>
    </div>

    <Foots/>
  </div>
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
  @importColor:#41b883 !important;
  html,body{
    .height;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB",
    "Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,table,tr,td{
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  img{
    width: 100%;
    display: block;
  }
  a{
    text-decoration: none;
    color: #fff;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: .7rem;
    line-height: 1rem;
    .height;
  }
  #content{
    padding: 50px 0 ;
    height:calc(~"100% - 100px");
    overflow-x:hidden ;
    overflow-y: auto;
  }
  .trans-router-enter,.trans-router-leave-to{
    opacity: 0;
  }
  .trans-router-enter-active,.trans-router-leave-active{
    transition: all .2s linear;
  }
  .tab{
    background: #41b883;
    color: #fff;
    text-align: center;
    border-radius: .2rem;
    font-size: .6rem;
    padding: .1rem;
  }

  .table{
    display:table ;
  }
  .table_cell{
    display: table-cell;
    vertical-align: top;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .mint-popup{
    width: 100%;
    height: 100%;
    min-height: 100%;
    overflow:hidden;
    .my_topic{
      height: 100%;
      .back{
        font-size: .8rem;
        background: #41b883;
        color: #fff;
        height: 50px;
        line-height: 50px;
        padding:0 1rem;
        i{
          font-size: .8rem;
        }
      }
    }
  }
  .mint-toast{
    z-index: 9999 !important;
  }
  .mint-msgbox-confirm{
    color:@importColor;
  }
  .mint-navbar .mint-tab-item.is-selected{
    border-bottom: 3px solid #41b883 !important;
    color:@importColor;
  }
  .mint-spinner-snake{
    border-top-color: @importColor;
    border-left-color: @importColor;
    border-bottom-color:@importColor;
  }
  /*超过两行显示省略号*/
  .two_ell{
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
    word-break: break-all;
  }
</style>

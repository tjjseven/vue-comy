<template>
  <mt-tabbar id="foots" fixed>
    <mt-tab-item v-for="(foot, index) in footer" :key="index">
      <router-link :to='foot.path'>{{foot.name}}</router-link>
    </mt-tab-item>
  </mt-tabbar>
</template>
<script>
  export default{
    name: 'foots',
    data () {
      return {
        footer: [
          {path: '/', name: '首页'},
          {path: '/message', name: '消息'},
          {path: '/about', name: '我的'}
        ]
      }
    }
  }
</script>
<style lang="less">
  #foots{
    .mint-tab-item-label{
      font-size:14px;
    }
    .actClass{
      color: #41b883;
    }
    .mint-tab-item{
      background:#1f2d3d;
      padding: 0;
    }
    .mint-tab-item-label a{
      padding: 18px 0;
      display: block;
    }
  }

</style>

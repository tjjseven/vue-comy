<template>
  <div class="index">
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item :id="index" v-for="(item, index) in navMsg" :key="index">{{item.label}}</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" swipeable>
      <mt-tab-container-item :id="index" v-for="(item, index) in navMsg" :key="index">
        <Scroll :tab="navMsg[index].tab" :scroll="'scroll'+index"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import Scroll from './Scroll'
  export default {
    name: 'index',
    components: {
      Scroll
    },
    data () {
      return {
        selected: 0,
        swipeable: true,
        navMsg: [
          { label: '全部', tab: 'all' },
          { label: '精华', tab: 'good' },
          { label: '分享', tab: 'share' },
          { label: '问答', tab: 'ask' },
          { label: 'weex', tab: 'weex' },
          { label: '招聘', tab: 'job' }
        ],
        el: '',
        key: ''
      }
    },
    activated () {
      this.el = document.querySelector('.mescroll-bounce')
      this.key = history.state.key
      if (window.sessionStorage.getItem(this.key)) {
        var elPosition = JSON.parse(window.sessionStorage.getItem(this.key))
        document.querySelector('#scroll' + this.selected).scrollTop = -(elPosition.y - 110)
      }
    },
    beforeRouteLeave (to, from, next) {
      this.el = document.querySelector('#scroll' + this.selected + ' .mescroll-bounce')
      this.saveElPosition(this.key, this.el)
      next()
    }
  }
</script>

<style lang="less">
  .index{
    height:100%;
    .mint-navbar{
      /*border-bottom: 1px solid #e7e7e7;*/
      margin-top: 50px;
      box-shadow: 0 1px 2px rgba(150,150,150,.3);
    }
    .mint-tab-container{
      padding-top: 60px;
      height:calc(~"100% - 60px");
    }
    .mint-tab-container-item,.mint-tab-container-wrap{
      height: 100%;
    }
    a{
      color: #000;
    }
  }
  #dataList>li{
    font-size: .7rem;
    word-break: break-all;
    padding: .6rem 1rem;
    margin-bottom: .2rem;
    border-bottom: 2px solid #e4e7e1;
  }
</style>

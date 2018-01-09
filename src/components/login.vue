<template>
  <div class="login">
    <mt-field label="Access Token" placeholder="请输入token" v-model="username"></mt-field>
    <mt-button type="primary" size="large" @click="sub">登录</mt-button>
    <div class="mint-field-state is-warning tips">
      <i class="mintui mintui-field-warning"></i>
      <span @click="token=!token">如何获取Access Token</span>
    </div>
    <p v-show="token" style="margin: 0 .5rem;line-height: 1rem;font-size: 12px;word-break: break-all">
      登录<a style="color:#41b883;" href="https://www.vue-js.com">vue社区</a>，在设置页面就可以看到自己的Access Token
    </p>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'login',
    data () {
      return {
        username: 'a38f7992-0096-4c65-b3ff-b7db7d264d98',
        token: false
      }
    },
    mounted () {

    },
    methods: {
      sub () {
        if (this.username) {
          Toast({
            message: '登录成功',
            duration: 500
          })
        } else {
          Toast({
            message: '登录失败',
            duration: 500
          })
        }
      }
    }
  }
</script>
<style lang="less">
  .login{
    padding:7rem 2rem 0;
    button{
      margin-top: 1rem;
      background: #1bb973;
      box-shadow: rgba(0, 0, 0, 0.117647) 0px 2px 6px, rgba(0, 0, 0, 0.239216) 0px 1px 2px;
    }
    .tips{
      margin:5rem 0 1rem;
      text-align: center;
    }
    .mint-field-state{
      margin-left: 0;
    }
  }
</style>

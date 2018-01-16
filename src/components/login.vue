<template>
  <div class="login">
    <mt-field label="Access Token" placeholder="请输入token" v-model="user.token"></mt-field>
    <mt-button type="primary" size="large" @click="sub">登录</mt-button>
    <div class="mint-field-state is-warning tips">
      <i class="mintui mintui-field-warning"></i>
      <span @click="tokenFlag=!tokenFlag">如何获取Access Token</span>
    </div>
    <p v-show="tokenFlag" style="margin: 0 .5rem;line-height: 1rem;font-size: 12px;word-break: break-all">
      登录<a style="color:#41b883;" href="https://www.vue-js.com">vue社区</a>，在设置页面就可以看到自己的Access Token
    </p>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { mapActions, mapMutations } from 'vuex'
//  import { USER_LOGIN } from '../vuex/store'
  export default {
    name: 'login',
    data () {
      return {
        tokenFlag: false,
        user: {
          token: 'a38f7992-0096-4c65-b3ff-b7db7d264d98'
        }
      }
    },
    mounted () {

    },
    methods: {
      // 映射USER_LOGIN
      ...mapActions([
        'USER_LOGIN',
        'sendAjax'
      ]),
      ...mapMutations([
        'ABOUT_INFO'
      ]),
      sub () {
        if (this.user.token) {
          this.$ajax({
            method: 'post',
            url: '/api/v1/accesstoken',
            params: {
              accesstoken: this.user.token
            }
          }).then((res) => {
//            console.log(res)
            for (let item in res.data) {
              this.$set(this.user, item, res.data[item])
            }
            // 提交actions
            this.USER_LOGIN(this.user)
            // 获取用户信息
            this.$ajax({
              method: 'get',
              url: '/api/v1/user/' + this.user.loginname
            }).then((res) => {
              this.ABOUT_INFO(res.data.data)
            })
            /* 跳转到登录之前的页面 */
            if (this.$route.fullPath === '/login') {
              this.$router.replace({path: '/about'})
            }
            this.$router.replace({path: this.$route.query.redirect})
            Toast({
              message: '登录成功',
              duration: 500
            })
          })
            .catch((err) => {
              if (err) {
                console.log(err)
                Toast({
                  message: 'token错误，登录失败',
                  duration: 1000
                })
              }
            })
        } else {
          Toast({
            message: '不能为空',
            duration: 500
          })
        }
      }
    }
  }
</script>
<style lang="less">
  .login{
    padding:5rem 2rem 0;
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

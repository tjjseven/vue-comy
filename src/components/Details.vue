<template>
  <div class="details">
    <p v-if="!details">
      <mt-spinner type="snake"></mt-spinner>
    </p>
    <div v-else id="details">
      <h1 @click="sheetVisible=!sheetVisible">{{details.title}}</h1>
      <div class="table" :style="{marginTop:'1rem',width: '100%'}">
        <!--left-->
        <div class="table_cell" style="width: 12%">
          <img :src="details.author.avatar_url" alt="author">
        </div>
        <!--center-->
        <div class="table_cell" style="width: 63%;padding: 0 .5rem;">
          <p>{{details.author.loginname}}</p>
          <span>{{authorTime}}</span>
        </div>
        <!--right-->
        <div class="table_cell" style="width: 25%;font-size: .6rem;color: #5f5f5f;text-align: right;padding-right: .4rem">
          <p>来自:{{details.tab}}</p>
          <span>{{details.visit_count}}次访问</span>
        </div>
      </div>
      <div v-html="details.content" class="det_content"></div>
      <div class="follow">
        <span>{{followFlag ? '哈哈哈，您已关注！' : '喜欢这篇文章？那就点击关注吧'}}</span>
        <div v-show="!sessUser" class="mask" @click="toLogin"></div>
        <mt-switch v-model="followFlag" @change.native="change"></mt-switch>
      </div>
      <!--<div v-re></div>-->
      <!--<div ref="con" @click="as">1222222</div>-->
      <h2 v-if="!details.replies.length" style="margin-top: 2rem;text-align: center">没有人评论，快来抢沙发...</h2>
      <h2 v-else class="commit_count">{{details.replies.length}}人评论:</h2>
      <ul class="commit_list">
        <li v-for="(replies, index) in timeFormat(details.replies)" :key="index">
          <div class="table" :style="{marginTop:'1rem',width: '100%'}">
            <!--left-->
            <div class="table_cell" style="width: 12%">
              <img :src="replies.author.avatar_url" alt="">
            </div>
            <!--center-->
            <div class="table_cell" style="width: 66%;padding-left: .5rem">
              <p>{{replies.author.loginname}} <span style="color:#386ac0">#{{index+1}}楼
                <span v-show="details.author.loginname===replies.author.loginname">【楼主】</span></span>
              </p>
              <span>{{replies.timer}}</span>
            </div>
            <!--right-->
            <div class="table_cell" style="width: 22%;text-align: right">
              <span @click="toLove($event, replies.id, replies.ups.length, index)" :style="{color: isUp(replies.ups) ? 'red' : '#000'}">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zan"></use>
                </svg>
                <span>{{replies.ups.length}}&nbsp;&nbsp;</span>
              </span>
              <svg class="icon" aria-hidden="true" @click="toCommit(replies.id, replies.author.loginname, details.replies.length)">
                <use xlink:href="#icon-huifu"></use>
              </svg>
            </div>
          </div>
          <div class="commit_content" v-html="replies.content"></div>
        </li>
      </ul>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible"
        closeOnClickModal
        cancelText="">
      </mt-actionsheet>
    </div>
  </div>
</template>
<script>
  import timeFormat from '../assets/js/init_date'
  import { MessageBox, Toast } from 'mint-ui'
  import { mapState, mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'detail',
    data () {
      return {
        sessUser: '',
        details: '',
        authorTime: '',
        content: '',
        sheetVisible: true,
        followFlag: '',
        actions: [
          {name: '返回', method: this.toBack},
          {name: '评论', method: this.toCommit}
        ],
        idArr: []
      }
    },
    /*
     *  beforecreated：el 和 data 并未初始化
        created:完成了 data 数据的初始化，el没有
        beforeMount：完成了 el 和 data 初始化
        mounted ：完成挂载
     *
     * */
    mounted () {
      console.log(timeFormat(new Date()))
      /* 获取session user */
      this.sessUser = sessionStorage.getItem('user')
      /* 获取主题信息 */
      this.$ajax({
        method: 'get',
        url: '/topic/' + this.$route.query.id
      }).then((res) => {
        this.details = res.data.data
        console.log(this.details)
        this.DETAILS(res.data.data)
        this.authorTime = timeFormat(this.details.create_at)
        switch (this.details.tab) {
          case 'share':
            this.details.tab = '分享'
            break
          case 'ask':
            this.details.tab = '问答'
            break
          case 'job':
            this.details.tab = '招聘'
            break
        }
      }).catch((err) => {
        if (err) {
          console.log(err)
        }
      })
      /* 判断是否已关注 */
//      JSON.stringify(this.about.about) === '{}'
      this.$ajax({
        method: 'get',
        url: '/user/' + this.login.user.loginname
      }).then((res) => {
        this.ABOUT_INFO(res.data.data)
        this.about.about.collect_topics.map((item) => {
          if (this.idArr.indexOf(item.id) === -1) {
            this.idArr.unshift(item.id)
          }
        })
        if (this.idArr.indexOf(this.$route.query.id) !== -1) {
          this.followFlag = true
        } else {
          this.followFlag = false
        }
        console.log(this.followFlag + ':no')
      })
    },
    computed: {
      ...mapState([
        'login',
        'about',
        'detail'
      ]),
      ...mapGetters([
//        'isUp'
      ])
//      isFollow: {
//        get: function () {
//
//        },
//        set: function (newValue) {
//
//        }
//      }
    },
    watch: {
      details: function (newVal, oldVal) {
        this.details = newVal
        console.log(this.details)
      }
    },
    methods: {
      ...mapMutations([
        'DETAILS',
        'ABOUT_INFO'
      ]),
      /* 关注主题 */
      change () {
        console.log(this.followFlag)
        var url = ''
        if (this.followFlag) {
          url = 'collect'
        } else {
          url = 'de_collect'
        }
        this.$ajax({
          method: 'post',
          url: '/topic/' + url,
          data: {
            accesstoken: this.login.user.token,
            topic_id: this.$route.query.id
          }
        }).then((res) => {
//          console.log(res)
        }).catch((err) => {
          if (err) {
            console.log(err)
          }
        })
      },
      /* 点赞评论 */
      toLove (e, id, count, index) {
        if (!this.sessUser) {
          this.toLogin()
          return false
        }
        var el = e.currentTarget
        /* 点赞ajax */
        this.$ajax({
          method: 'post',
          url: '/reply/' + id + '/ups',
          params: {
            accesstoken: this.login.user.token
          }
        }).then((res) => {
          if (res.data.action === 'up') {
            el.style.color = 'red'
            /* 触发视图更新 */
            this.$set(this.details.replies[index].ups, count, this.login.user.id)
            Toast({
              message: '点赞成功',
              duration: 1000
            })
          } else {
            el.style.color = '#000'
            this.details.replies[index].ups.splice(count - 1, 1)
            Toast({
              message: '取消点赞',
              duration: 1000
            })
          }
        }).catch((err) => {
          if (err) {
            Toast({
              message: '网络故障',
              duration: 1000
            })
          }
        })
      },
      /* 返回 */
      toBack () {
        this.$router.go(-1)
      },
      /* 评论回复 */
      toCommit (id, name, count) {
        var arg = arguments
        if (!this.sessUser) {
          this.toLogin()
          return false
        }
        var config = {
          closeOnClickModal: false,
          confirmButtonText: '提交',
          showInput: false
        }
        console.log(this.$route.query.id)
        console.log(arguments)
        var textarea = '<textarea placeholder="说点什么"></textarea>'
        MessageBox.prompt(textarea, '请输入评论内容', config).then(({ value, action }) => {
          this.sheetVisible = true
          var comText = document.querySelector('textarea').value
          var data = null
          if (arg.length === 3) {
            data = {
              accesstoken: this.login.user.token,
              content: '@' + name + comText,
              reply_id: id
            }
          } else {
            data = {
              accesstoken: this.login.user.token,
              content: comText
            }
          }

          /* 评论ajax */
          this.$ajax({
            method: 'post',
            url: '/topic/' + this.$route.query.id + '/replies',
            data: data
          }).then((res) => {
            console.log(res)
            /* 触发视图更新 */
            this.detail.detail.replies.unshift({
              author: {
                avatar_url: this.login.user.avatar_url,
                loginname: this.login.user.loginname
              },
              content: data.content,
              create_at: new Date(),
              id: '',
              timer: new Date(),
              ups: []
            })
            Toast({
              message: '提交成功',
              duration: 1000
            })
          }).catch((err) => {
            if (err) {
              console.log(err)
            }
            Toast({
              message: '提交失败',
              duration: 1000
            })
          })
//          console.log(value)
        }, (err) => {
          this.sheetVisible = true
          console.log(err)
        })
      },
      /* 格式化时间 */
      timeFormat (list) {
        return list.map((item) => {
          item.timer = timeFormat(item.create_at)
//          this.$set(item, 'timer', timeFormat(item.create_at))
          return item
        })
      },
      /* 跳转login */
      toLogin () {
        this.$router.replace({path: '/login', query: {redirect: this.$route.fullPath}})
      },
      /* 判断是否已点赞 */
      isUp (id) {
        if (id.indexOf(this.login.user.id) !== -1) {
          return true
        } else {
          return false
        }
      }
//      as () {
//        console.log(this.$refs.con)
//      }
    }
//    directives: {
//      re: {
//        // 指令的定义
//        inserted: function (el) {
//          console.log(arguments)
//          el.innerHTML = arguments[2].context.details.content
//        }
//      }
//    }
  }
</script>
<style lang="less">
  #details>.v-modal{
    display: none;
  }
  #details>.mint-actionsheet{
    background: none;
  }
  .details>p{
    width: 36px;
    margin: 2rem auto 0;
  }
  .details{
    font-size: .7rem;
    padding: 1rem;
    .mint-actionsheet-listitem{
      width: 50%;
      display: inline-block;
      background: #f5f5f5;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
    }
    h1{
      font-size: .9rem;
      line-height: 1.5rem;
    }
    h2{
      font-size: .8rem;
    }
    a{
      color: #386ac0;
    }
    .det_content{
      margin-top: 1rem;
      padding-bottom: 1rem;
      line-height: 1.3rem;
      border-bottom:1px solid #e3e3e3;
      h1,h2{
        margin-top: .5rem;
      }
    }
    pre{
      background: #f5f5f5;
      overflow-x: auto;
    }
    .commit_count{
      margin-top:2rem
    }
    .commit_list>li{
      border-bottom: 1px solid #e3e3e3;
      padding:0 .5rem 1rem 0;
      i{
        padding-left: .5rem;
      }
    }
    .commit_content{
      margin-top: .5rem;
    }
  }
  .mint-msgbox-message textarea{
    width: 95%;
    height: 100px;
    outline: none;
    resize: none;
    border: 1px solid #ccc;
    font-size: 12px;
    border-radius: .1rem;
    margin-top: 10px;
    padding: .5rem;
    box-sizing: border-box;
  }
  .follow{
    position:relative;
    height: 32px;
    line-height: 32px;
    padding: 1rem;
    border-bottom: 1px solid #e3e3e3;
    label{
      float: right;
      .mint-switch-input:checked + .mint-switch-core{
        background: #41b883;
        border: 1px solid #41b883;
      }
    }
    .mask{
      position: absolute;
      top:1rem;
      right: 1rem;
      width: 52px;
      height: 32px;
      z-index: 9;
    }
  }
</style>

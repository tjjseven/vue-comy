<template>
  <div class="message">
    <mt-cell title="未读消息" @click.native="myMsg(unreadMsg)">
      <mt-badge :color="unreadMsg.length ? '#f44336' : '#5f5f5f'" size="large" style="font-size: 14px">{{unreadMsg.length}}</mt-badge>
    </mt-cell>
    <mt-cell title="已读消息" @click.native="myMsg(readMsg)">
      <mt-badge color="#5f5f5f" size="large" style="font-size: 14px">{{readMsg.length}}</mt-badge>
    </mt-cell>
    <mt-popup
      v-model="popupMsg"
      position="bottom"
      modal>
      <div class="my_topic">
        <p class="back" @click="popupMsg=!popupMsg">
          <i class="mintui mintui-back"></i>返回
        </p>
        <ul class="me_msg">
          <li v-for="(item,index) in readMsg" :key="index">
            <p class="time">{{format(item.reply.create_at)}}</p>
            <div class="msg_content">
              <p>{{item.author.loginname}}<span>他的主题</span></p>

              <p class="msg_topic">
                在<router-link :to="{path: '/details', query: {id: item.topic.id}}">【{{item.topic.title}}】</router-link>中回复你：
              </p>
              {{item.reply.content}}
            </div>

          </li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  import { mapState } from 'vuex'
  export default {
    name: 'message',
    data () {
      return {
        popupMsg: false,
        unreadCount: '',
        unreadMsg: '',
        readMsg: ''
      }
    },
    computed: {
      ...mapState([
        'login'
      ])
    },
    mounted () {
      var str = this.format('2017-12-27T07:38:45.647Z')
      console.log(str)
      /* 获取未读消息数 */
//      this.$ajax({
//        method: 'get',
//        url: '/message/count',
//        params: {
//          accesstoken: this.login.user.token
//        }
//      }).then((res) => {
//        this.unreadCount = res.data.data
//      }).catch((err) => {
//        if (err) {
//          console.log(err)
//        }
//      })
      /* 获取未读和已读消息 */
      this.$ajax({
        method: 'get',
        url: '/messages',
        params: {
          accesstoken: this.login.user.token
        }
      }).then((res) => {
        this.unreadMsg = res.data.data.hasnot_read_messages
        this.readMsg = res.data.data.has_read_messages
//        this.unreadMsg.unshift(7)
        console.log(res)
      }).catch((err) => {
        if (err) {
          console.log(err)
        }
      })
    },
    methods: {
      myMsg (msg) {
        if (!msg.length) {
          Toast({
            message: '暂无消息',
            duration: 500
          })
          return
        }
        this.popupMsg = !this.popupMsg
      }
    }
  }
</script>
<style lang="less">
  .message{
    padding: 1rem;
    .mint-cell-wrapper:active{
      background: #ececec;
    }
    .me_msg{
      padding:0 1rem;
      li{
        border-bottom: 1px solid #c7c7c7;
        padding:1rem 0 .5rem;
      }
      .time{
        margin-bottom: .5rem;
        border-left: 5px solid #41b883;
        padding: .5rem;
      }
      .msg_content{
        font-size: .7rem;
        padding:0 .5rem;
        span{
          margin-left: 5rem;
        }
      }
      .msg_topic{
        margin: .2rem 0 .5rem;
        line-height: 1.2rem;
      }
      a{
        color:#41b883;
      }
    }
  }
</style>

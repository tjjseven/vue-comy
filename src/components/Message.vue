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
      <div @click="popupMsg=!popupMsg" class="my_topic">
        <p class="back">
          <i class="mintui mintui-back"></i>返回
        </p>
        <ul>
          <li v-for="(item,index) in readMsg" :key="index">
            {{toLocaleString(item.reply.create_at)}}{{item.author.loginname}}在主题
            <router-link :to="{path: '/details', query: {id: item.topic.id}}">[{{item.topic.title}}]</router-link>
            中回复你：{{item.reply.content}}
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
      var d = new Date('2017-12-27T07:38:45.647Z')
      var str = d.Format('yyyy年MM月dd日 hh:mm:ss 星期w')
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
    a{
      color:#41b883;
    }
  }
</style>

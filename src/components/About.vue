<template>
  <div class="about">
    <div class="about_header">
      <div class="about_bg"></div>
      <img :src="login.user.avatar_url" alt="author" class="about_picture"/>
      <h2>{{login.user.loginname}}</h2>
      <div class="about_net">
        <p @click="myTopics('aboutSite')">关于</p>
        <p @click="myTopics('release')">发布</p>
      </div>
    </div>
    <div class="about_list">
      <div @click="myTopics(item.type)" class="table list_div" v-for="(item, index) in aboutList" :key="index">
        <!--left-->
        <div class="list_left table_cell">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
        </div>
        <!--center-->
        <div class="list_center table_cell">{{item.text}}
          <span>({{item.count}})</span>
        </div>
        <!--right-->
        <div class="list_right table_cell">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-you"></use>
          </svg>
        </div>
      </div>
      <p class="logout" @click="logout">退出</p>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="right"
      modal>
      <div class="my_topic">
        <p class="back" @click="popupVisible=!popupVisible">
          <i class="mintui mintui-back"></i>返回
        </p>
        <div v-if="typeTopics==='aboutSite'" class="about_site">
          <table border="0">
            <tr v-for="(data, index) in aboutSite" :key='index'>
              <td>{{data.name}}</td>
              <td v-html="data.text" style="word-break: break-all;"></td>
            </tr>
          </table>
        </div>
        <div v-else-if="typeTopics==='release'" class="release">
          <mt-field label="主题名称：" placeholder="请输入主题名称" v-model="topicName"></mt-field>
          <mt-radio
            title="主题分类："
            v-model="topicTab"
            :options="['分享', '问答', '招聘']">
          </mt-radio>
          <mt-field label="主题内容：" placeholder="请输入主题内容" type="textarea" rows="7" v-model="topicValue"></mt-field>
          <p class="releaseBtn" @click="release">发布</p>
        </div>
        <ul v-else class="topic_list">
          <p v-if="aboutMsg[typeTopics].length===0">暂无主题...</p>
          <router-link v-else :to="{path: '/details', query: {id: data.id}}" tag="li"
          v-for="(data, index) in timeFormat(aboutMsg[typeTopics])" :key='index'>
            <div class="two_ell">{{data.title}}</div>
            <div class="topic_author">
              <span>作者:{{data.author.loginname}}</span>
              <span style="float: right">最近回复:{{data.time}}</span>
            </div>
          </router-link>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import timeFormat from '../assets/js/init_date'
  import { MessageBox, Toast } from 'mint-ui'
  import { mapState, mapActions, mapMutations } from 'vuex'
//  import { USER_LOGOUT } from '../vuex/store'
  export default {
    name: 'about',
    data () {
      return {
        aboutMsg: '',
        typeTopics: 'aboutSite',
        popupVisible: false,
        aboutList: [
          {icon: '#icon-shoucang', text: '关注的主题', count: 0, type: 'collect_topics'},
          {icon: '#icon-canyu', text: '回复的主题', count: 0, type: 'recent_replies'},
          {icon: '#icon-fabu', text: '发布的主题', count: 0, type: 'recent_topics'}
        ],
        aboutSite: [
          {name: '技术栈：', text: 'vue2 + vue-router + vuex + axios + mint-ui + mescroll'},
          {name: '名称：', text: 'vue社区'},
          {name: '作者：', text: '<a href="">tjjseven</a>'},
          {name: 'GitHub：', text: '<a href="">https://github.com/tjjseven/vue-comy</a>'},
          {name: '版本：', text: 'v1.0.0'},
          {name: '参考：', text: '111'}
        ],
        topicName: '',
        topicTab: '问答',
        topicValue: ''
      }
    },
    computed: {
      ...mapState([
        'login',
        'about'
      ])
    },
    methods: {
      ...mapActions([
        'USER_LOGOUT',
        'sendAjax'
      ]),
      ...mapMutations([
        'ABOUT_INFO'
      ]),
      release () {
        switch (this.topicTab) {
          case '分享':
            this.topicTab = 'share'
            break
          case '问答':
            this.topicTab = 'ask'
            break
          case '招聘job':
            this.topicTab = 'job'
            break
        }
        if (!this.topicName) {
          Toast({
            message: '标题不能为空',
            duration: 1000
          })
          return
        }
        if (!this.topicValue) {
          Toast({
            message: '内容不能为空',
            duration: 1000
          })
          return
        }
        this.$ajax({
          method: 'post',
          url: '',
          params: {
            title: this.topicName,
            tab: this.topicTab,
            content: this.topicValue
          }
        }).then((res) => {
          console.log(res)
          Toast({
            message: '发布成功',
            duration: 1000
          })
        }).catch((err) => {
          if (err) {
            console.log(err)
          }
          Toast({
            message: '网络错误',
            duration: 1000
          })
        })
      },
      logout () {
        var self = this
        MessageBox.confirm('确定执行此操作?', {closeOnClickModal: false}).then(action => {
          this.USER_LOGOUT()
          self.$router.replace({path: '/login'})
        }, (err) => {
          console.log(err)
        })
      },
      myTopics (msg) {
        this.popupVisible = !this.popupVisible
        this.typeTopics = msg
      },
      /* 格式化时间 */
      timeFormat (list) {
        return list.map((item) => {
          item.time = timeFormat(item.last_reply_at)
          return item
        })
      }
    },
    mounted () {
      if (JSON.stringify(this.about.about) === '{}') {
        this.$ajax({
          method: 'get',
          url: '/api/v1/user/' + this.login.user.loginname
        }).then((res) => {
          this.aboutMsg = res.data.data
          this.aboutList[0].count = this.aboutMsg.collect_topics.length
          this.aboutList[1].count = this.aboutMsg.recent_replies.length
          this.aboutList[2].count = this.aboutMsg.recent_topics.length
        })
      } else {
        this.aboutMsg = this.about.about
        this.aboutList[0].count = this.about.about.collect_topics.length
        this.aboutList[1].count = this.about.about.recent_replies.length
        this.aboutList[2].count = this.about.about.recent_topics.length
      }
    }
  }
</script>
<style lang="less">
  .about{
    width: 100%;
    img{
      display: inline-block;
      width: 20%;
    }
    .about_header{
      margin-bottom:3rem;
      h2{
        text-align: center;
        margin-top: .6rem;
      }
    }
    .about_bg{
      background: #55585f;
      width: 100%;
      height: 7rem;
    }
    .about_picture{
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      margin: -2.5rem auto 0;
      display: block;
    }
    .about_list{
      .list_div{
        height:2.5rem;
        width:100%;
        border-bottom:1px solid #efefef;
        padding:0 .6rem;
        box-sizing:border-box;
      }
      .list_left{
        width: 12%;
        padding-left: .5rem;
        vertical-align: middle;
      }
      .list_center{
        width: 63%;
        vertical-align: middle;
      }
      .list_right{
        width: 25%;
        color: #5f5f5f;
        vertical-align: middle;
        text-align: right;
        padding-right: .4rem;
      }
    }
    .about_net{
      width:100%;
      margin-top:1.5rem;
      letter-spacing: -9999rem;
      p{
        display: inline-block;
        width: 25%;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        border: 1px solid #1aa84a;
        margin:0 12.5% ;
        box-sizing: border-box;
        letter-spacing: 0;
      }
      p:active{
        background: #1aa84a;
        color: #fff;
      }
    }
    .logout,.releaseBtn{
      color: #fff;
      width: 60%;
      text-align: center;
      height: 40px;
      line-height: 40px;
      margin: 3rem auto;
      background: #e40e0e;
      border-radius: .2rem;
      box-shadow: rgba(0, 0, 0, 0.117647) 0 2px 6px, rgba(0, 0, 0, 0.239216) 0 1px 2px;
    }
    .releaseBtn{
      background: #1aa84a;
    }
    .logout:active,.releaseBtn:active{
      opacity: .5;
    }
    .about_site,.release{
      padding: 1rem .5rem;
    }
    .about_site{
      font-size: .7rem;
      margin-top:1rem;
      td{
        vertical-align: top;
        line-height:1.2rem;
        padding-bottom: 1.5rem;
        a{
          color: #1aa84a;
        }
      }
    }
    .release{
      .mint-radiolist{
        padding: .8rem 0;
        border-top: 1px solid #e4e7e1;
        border-bottom: 1px solid #e4e7e1;
      }
      .mint-cell{
        display: inline-block;
        background: none;
      }
      .mint-cell-wrapper{
        background: none;
      }
      .mint-radio-input:checked + .mint-radio-core{
        background: #1aa84a;
      }
      .mint-field .mint-cell-title{
        width: 80px;
      }
      .mint-radiolist-title{
        color: #000;
        font-size: 16px;
      }
      .is-textarea{
        width: 100%;
        .mint-cell-wrapper{
          display: block;
          margin-top:.5rem;
          textarea{
            font-size: 14px;
            text-indent: 28px;
          }
          ::-webkit-input-placeholder {
            color: #7d7d7d;
            font-weight: 600;
          }
        }
      }
    }
    .topic_list{
      margin-top: 1rem;
      font-size:.7rem;
      p{
        text-align: center;
        margin-top: 2rem;
      }
      li{
        border-bottom:2px solid #e4e7e1;
        padding:.5rem;
        margin-bottom: .2rem;
        line-height: 1.1rem
      }
      .topic_author{
        padding: .3rem 0 0;
        font-size:.6rem;
        color: #515151;
        letter-spacing: 0.05rem
      }
    }
  }
</style>

<template>
  <div class="about">
    <div class="about_header">
      <div class="about_bg"></div>
      <img :src="login.user.avatar_url" alt="author" class="about_picture"/>
      <h2>{{login.user.loginname}}</h2>
      <div class="about_edit">
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
          v-for="(data, index) in aboutMsg[typeTopics]" :key='index'>
            <div class="two_ell">{{data.title}}</div>
            <div class="topic_author">
              <span>作者:{{data.author.loginname}}</span>
              <span style="float: right">最近回复:{{data.last_reply_at | timeFormat}}</span>
            </div>
          </router-link>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { MessageBox, Toast } from 'mint-ui'
  import { mapState, mapActions, mapMutations } from 'vuex'
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
          {name: '作者：', text: '<a href="https://github.com/tjjseven">tjjseven</a>'},
          {name: 'GitHub：', text: '<a href="tseven.top/vue-comy/dist">https://github.com/tjjseven/vue-comy</a>'},
          {name: '版本：', text: 'v1.0.0'}
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
      /* 发布主题 */
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
          url: '/topics ',
          data: {
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
      /* 登出 */
      logout () {
        var self = this
        MessageBox.confirm('确定执行此操作?', {closeOnClickModal: false}).then(action => {
          this.USER_LOGOUT()
          self.$router.replace({path: '/login'})
        }, (err) => {
          console.log(err)
        })
      },
      /* 获取主题数量 */
      getCount () {
        for (var i = 0; i < this.aboutList.length; i++) {
          this.aboutList[i].count = this.aboutMsg[this.aboutList[i].type].length
        }
      },
      /* 打开与我相关主题 */
      myTopics (msg) {
        this.popupVisible = !this.popupVisible
        this.typeTopics = msg
      }
    },
    mounted () {
      /* 获取个人主题信息 */
      this.$ajax({
        method: 'get',
        url: '/user/' + this.login.user.loginname
      }).then((res) => {
        this.aboutMsg = res.data.data
        this.ABOUT_INFO(res.data.data)
        this.getCount()
      })
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
      background: url("../assets/img/bg.jpg") no-repeat center;
      background-size: cover;
      width: 100%;
      height: 7rem;
      box-shadow: rgba(0, 0, 0, 0.117647) 0 2px 6px, rgba(0, 0, 0, 0.239216) 0 1px 2px;
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
    .about_edit{
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
      margin-top: 1rem;
      padding:0 1.5rem;
    }
    .about_site{
      margin-top:1rem;
      td{
        vertical-align: top;
        line-height:1.2rem;
        padding-bottom: 1.5rem;
        a{
          color: #41b883;
        }
      }
    }
    .release,.topic_list{
      height:calc(~"100% - 50px");
      overflow-x:hidden ;
      overflow-y: auto;
    }
    .release{
      .mint-radiolist{
        padding: .8rem 0;
        border-top: 1px solid #e4e7e1;
        border-bottom: 1px solid #e4e7e1;
      }
      .mint-cell-wrapper{
        font-size: .7rem !important;
      }
      .mint-cell{
        display: inline-block;
        background: none;
      }
      .mint-cell-wrapper{
        background: none;
      }
      .mint-radio-input:checked + .mint-radio-core{
        background: #41b883;
        border: 1px solid #41b883;
      }
      .mint-field .mint-cell-title{
        width: 80px;
      }
      .mint-radiolist-title{
        color: #000;
        font-size: 14px;
      }
      .is-textarea{
        width: 100%;
        .mint-cell-wrapper{
          display: block;
          margin-top:.5rem;
          textarea{
            font-size: 14px;
            text-indent: 14px;
          }
          ::-webkit-input-placeholder {
            color: #7d7d7d;
          }
        }
      }
    }
    .topic_list{
      padding: 0 1rem;
      margin-top: 1rem;
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

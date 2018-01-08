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
              <span>{{replies.time}}</span>
            </div>
            <!--right-->
            <div class="table_cell" style="width: 22%;text-align: right">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zan"></use>
              </svg>
              <span>{{replies.ups.length}}&nbsp;&nbsp;</span>
              <svg class="icon" aria-hidden="true">
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
  import { MessageBox } from 'mint-ui'
  export default {
    name: 'detail',
    data () {
      return {
        details: '',
        authorTime: '',
        content: '',
        sheetVisible: true,
        actions: [
          {name: '返回', method: this.toBack},
          {name: '评论', method: this.toCommit}
        ]
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
      this.$ajax({
        method: 'get',
        url: '/api/v1/topic/' + this.$route.query.id
      }).then((res) => {
        this.details = res.data.data
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
//        console.log(this.details)

        /* 将结果commit到mutations中 */
//        this.$store.commit('SAVE_LISTDATA', res.data.result);
      })
        .catch((err) => {
          if (err) {
            console.log(err)
          }
        })
    },
    methods: {
      toBack () {
        this.$router.go(-1)
      },
      toCommit () {
        var config = {
          closeOnClickModal: false,
          confirmButtonText: '提交',
          showInput: false
        }
        var textarea = '<textarea>11</textarea>'
        MessageBox.prompt(textarea, '请输入评论内容', config).then(({ value, action }) => {
          this.sheetVisible = true
          console.log(value)
        }, (err) => {
          this.sheetVisible = true
          console.log(err)
        })
      },
      /* 格式化时间 */
      timeFormat (list) {
        return list.map((item) => {
          item.time = timeFormat(item.create_at)
          return item
        })
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
    margin: 0 auto;
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
    .back_com_ul {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 50px;
      font-size: .8rem;
      color: #717171;
      line-height: 50px;
      z-index: 999;
      background: #f5f5f5;
      letter-spacing: -9999rem;
      li {
        display: inline-block;
        width: 50%;
        box-sizing: border-box;
        letter-spacing: 0;
        text-align: center;
      }
      li:nth-child(1){
        border-right: 1px solid #ececec;
      }
    }
  }
  textarea{
    width: 95%;
    height: 100px;
    outline: none;
    resize: none;
    border: 1px solid #ccc;
    font-size: 14px;
    border-radius: .1rem;
    margin-top: 10px;
  }
</style>

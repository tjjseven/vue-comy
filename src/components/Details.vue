<template>
  <div class="details">
    <p v-if="!details"><i class="el-icon-loading"></i></p>
    <div v-else>
      <h1>{{details.title}}</h1>
      <el-row :gutter="20" :style="{marginTop:'1rem'}">
        <!--left-->
        <el-col :span="4"><div class="grid-content bg-purple">
          <img :src="details.author.avatar_url" alt="">
        </div></el-col>
        <!--center-->
        <el-col :span="12" style="padding-left: 0"><div class="grid-content bg-purple data_title">
          <p>{{details.author.loginname}}</p>
          <span>{{authorTime}}</span>
        </div></el-col>
        <!--right-->
        <el-col :span="8"><div class="grid-content bg-purple" style="text-align:right;margin-right: .6rem;font-size: .6rem;color: #5f5f5f">
          <p>来自:{{details.tab}}</p>
          <span>{{details.visit_count}}次访问</span>
        </div></el-col>
      </el-row>
      <div v-html="details.content" class="det_content"></div>
      <!--<div v-re></div>-->
      <!--<div ref="con" @click="as">1222222</div>-->
      <h2 v-if="!details.replies.length" style="margin-top: 2rem;text-align: center">没有人评论，快来抢沙发...</h2>
      <h2 v-else class="commit_count">{{details.replies.length}}人评论:</h2>
      <ul class="commit_list">
        <li v-for="(replies, index) in timeFormat(details.replies)" :key="index">
        <el-row :gutter="20" :style="{marginTop:'1rem'}">
          <!--left-->
          <el-col :span="4"><div class="grid-content bg-purple">
            <img :src="replies.author.avatar_url" alt="">
          </div></el-col>
          <!--center-->
          <el-col :span="13" style="padding-left: 0"><div class="grid-content bg-purple data_title">
            <p>{{replies.author.loginname}} <span style="color:#386ac0">#{{index+1}}楼
              <span v-show="details.author.loginname===replies.author.loginname">【题主】</span></span>
            </p>
            <span>{{replies.time}}</span>
          </div></el-col>
          <!--right-->
          <el-col :span="7" style="text-align: right"><div class="grid-content bg-purple">
            <i class="el-icon-star-on"></i>
            {{replies.ups.length}}&nbsp;
            <i class="el-icon-edit"></i>
          </div></el-col>
        </el-row>
        <div class="commit_content" v-html="replies.content">}</div>
      </li>
    </ul>
      <transition name="trans-com">
        <ul v-if="backComFlag" class="back_com_ul">
          <li @click="$router.go(-1)"><i class="el-icon-arrow-left"></i>&nbsp;&nbsp;返回</li>
          <li>评论&nbsp;&nbsp;<i class="el-icon-edit-outline"></i></li>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
  import timeFormat from '../assets/js/init_date'
  export default {
    name: 'detail',
    data () {
      return {
        details: '',
        authorTime: '',
        content: '',
        backComFlag: false
      }
    },
    /*
     *  beforecreated：el 和 data 并未初始化
        created:完成了 data 数据的初始化，el没有
        beforeMount：完成了 el 和 data 初始化
        mounted ：完成挂载
     *
     * */
    beforecreated () {
      console.log('beforecreated')
    },
    created () {
      console.log(this.backComFlag)
    },
    mounted () {
      this.backComFlag = true
      console.log(this.backComFlag)

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
      showBackCom () {
        this.backComFlag = false
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
  .details>p{
    font-size: 2rem;
    text-align: center;
    color: #b3b3b3;
  }
  .details{
    font-size: .7rem;
    padding: 1rem;
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
      height: 61px;
      font-size: .8rem;
      color: #717171;
      line-height: 61px;
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
  .trans-com-enter,.trans-com-leave-to{
    transform: translateY(110%);
  }
  .trans-com-enter-active,.trans-com-leave-active{
    transition: all 1s linear;
  }
</style>

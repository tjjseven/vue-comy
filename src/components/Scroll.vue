<template>
  <!--滑动区域-->
  <div :id="scroll" class="mescroll">
    <!--您的项目如果是在微信,QQ,Safari等等iOS浏览器访问的,则需再嵌套<div class="mescroll-bounce"><div>,可解决列表顶部下拉和底部上拉露出浏览器灰色背景和卡顿2秒的问题,可避免数据不满屏下拉刷新dom元素可能不渲染的问题-->
    <div class="mescroll-bounce">
      <!--展示上拉加载的数据列表-->
      <ul id="dataList" class="data-list">
        <li v-for="(data, index) in timeFormat(pdlist)" :key='index'>
          <router-link :to="{path: '/details', query: {id: data.id}}" tag="div">
            <!--top-->
            <el-row :gutter="20" :style="{marginBottom:'.6rem'}">
              <!--left-->
              <el-col :span="4"><div class="grid-content bg-purple">
                <img :src="data.author.avatar_url" alt="" @error="errImg">
              </div></el-col>
              <!--center-->
              <el-col :span="16" style="padding-left: 0"><div class="grid-content bg-purple data_title">
                {{data.title}}
              </div></el-col>
              <!--right-->
              <el-col v-if='data.top' :span="4"><div class="grid-content bg-purple tab" style="background: #e40e0e">
                置顶
              </div></el-col>
              <el-col v-else-if='data.good' :span="4"><div class="grid-content bg-purple tab">
                精华
              </div></el-col>
              <el-col v-else :span="4"><div class="grid-content bg-purple tab">
                {{data.tab}}
              </div></el-col>
            </el-row>
            <!--bottom-->
            <el-row :gutter="20" style="color: #515151">
              <!--left-->
              <el-col :span="7"><div class="grid-content bg-purple">
                {{data.author.loginname}}
              </div></el-col>
              <!--center-->
              <el-col :span="8" style="padding-left:0"><div class="grid-content bg-purple" style="text-align:left;font-size: .6rem">
                发布于{{data.time}}
              </div></el-col>
              <!--right-->
              <el-col :span="9"><div class="grid-content bg-purple" style="text-align:right">
                <i class="el-icon-edit-outline"></i>
                {{data.reply_count}}
                <i class="el-icon-view"></i>
                {{data.visit_count}}
              </div></el-col>
            </el-row>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import 'mescroll/src/mescroll.min.css'
  import MeScroll from 'mescroll'
  import timeFormat from '../assets/js/init_date'
  export default {
    name: 'scroll',
    data () {
      return {
        mescroll: null,
        pdlist: []
      }
    },
    props: ['tab', 'scroll'],
    mounted () {
      // 创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
      // 解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
      var self = this
      self.mescroll = new MeScroll(this.scroll, {
        up: {
          callback: self.upCallback, // 上拉回调,设置mescroll父元素高度，不然上拉不正常
          // 以下参数可删除,不配置
          // page:{size:8}, //可配置每页8条数据,默认10
          toTop: { // 配置回到顶部按钮
//            src: 'dist/static/img/totop.jpg', // 默认滚动到1000px显示,可配置offset修改
//            offset: 1000
          },
          empty: { // 配置列表无任何数据的提示
            warpId: 'dataList',
            icon: '../res/img/mescroll-empty.png',
            tip: '亲,暂无相关数据哦~',
            btntext: '去逛逛 >',
            btnClick: function () {
              alert('点击了去逛逛按钮')
            }
          }
        }
      })
      // 初始化vue后,显示vue模板布局
      document.getElementById('dataList').style.display = 'block'

      var img = document.querySelectorAll('img')
      this.imgLoad(img, function (img) {
//        console.log(img)
      })
    },
    methods: {
      imgLoad (img, callcack) {
        img.forEach((img) => {
          var timer = setInterval(function () {
            if (img.complete) { // 判断图片是否加载完成
              callcack(img)
              clearInterval(timer)
            } else {
              console.log('404')
            }
          }, 50)
          img.onerror = () => {
            console.log('404失败')
            this.onerror = null
          }
        })
      },
      errImg () {
        console.log('失败')
//        'this.src = "' + require('assets/images/load_logo01.png') + '"'
      },
      // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
      upCallback (page) {
        // 联网加载数据
        var self = this
        // 调用
        getListDataFromNet(page.num, page.size, function (curPageData) {
          // curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

          // 如果是第一页需手动制空列表
          if (page.num === 1) self.pdlist = []

          // 更新列表数据
          self.pdlist = self.pdlist.concat(curPageData)
//          console.log(self.pdlist)
          // 联网成功的回调,隐藏下拉刷新和上拉加载的状态;
          // mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
//          console.log('page.num=' + page.num + ', page.size=' + page.size + ', curPageData.length=' + curPageData.length + ', self.pdlist.length=' + self.pdlist.length)

          // 方法一(推荐): 后台接口有返回列表的总页数 totalPage
          // self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

          // 方法二(推荐): 后台接口有返回列表的总数据量 totalSize
          // self.mescroll.endBySize(curPageData.length, 20); //必传参数(当前页的数据个数, 总数据量)

          // 方法三(推荐): 您有其他方式知道是否有下一页 hasNext
          self.mescroll.endSuccess(curPageData.length, true) // 必传参数(当前页的数据个数, 是否有下一页true/false)
        }, function () {
           // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          self.mescroll.endErr()
        })
        // 定义ajax function
        function getListDataFromNet (pageNum, pageSize, successCallback, errorCallback) {
          self.$ajax.get('/api/v1/topics', {
            params: {
              tab: self.tab,
              page: pageNum, // 页码
              limit: pageSize // 每页长度
            }
          }).then((response) => {
            var data = response.data.data
//            console.log(response)
            successCallback && successCallback(data)// 成功回调
          }).catch((error) => {
            if (error) {
              console.log(error)
            }
            errorCallback && errorCallback()// 失败回调
          })
        }
      },
      /* 格式化时间 */
      timeFormat (list) {
        return list.map((item) => {
          item.time = timeFormat(item.create_at)
          switch (item.tab) {
            case 'share':
              item.tab = '分享'
              break
            case 'ask':
              item.tab = '问答'
              break
            case 'job':
              item.tab = '招聘'
              break
          }
          return item
        })
      }
    },
    computed: {

    }
  }
</script>

<style lang="less">



</style>

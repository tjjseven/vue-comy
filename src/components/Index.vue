<template>
  <div class="index">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="labelName[0]" name="first">

        <!--滑动区域-->
        <div id="mescroll" class="mescroll">
          <!--您的项目如果是在微信,QQ,Safari等等iOS浏览器访问的,则需再嵌套<div class="mescroll-bounce"><div>,可解决列表顶部下拉和底部上拉露出浏览器灰色背景和卡顿2秒的问题,可避免数据不满屏下拉刷新dom元素可能不渲染的问题-->
          <div class="mescroll-bounce">
            <!--展示上拉加载的数据列表-->
            <ul>
            <li id="dataList" class="data-list" v-for="(data, index) in pdlist" :key='index'>
              <el-row :gutter="20" :style="{marginBottom:'.3rem'}">
                <el-col :span="4"><div class="grid-content bg-purple">
                  <img :src="data.author.avatar_url" alt="">
                </div></el-col>

                <el-col :span="16"><div class="grid-content bg-purple">
                  {{data.title}}
                </div></el-col>

                <el-col :span="4"><div class="grid-content bg-purple">3</div></el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="10"><div class="grid-content bg-purple">
                  {{data.author.loginname}}
                </div></el-col>
                <el-col :span="7"><div class="grid-content bg-purple">5</div></el-col>
                <el-col :span="7"><div class="grid-content bg-purple">6</div></el-col>
              </el-row>
            </li>
            </ul>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane :label="labelName[1]" name="second">配置管理</el-tab-pane>
      <el-tab-pane :label="labelName[2]" name="third">角色管理</el-tab-pane>
      <el-tab-pane :label="labelName[3]" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane :label="labelName[4]" name="five">定时任务补偿</el-tab-pane>
      <el-tab-pane :label="labelName[5]" name="sex">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import 'mescroll/src/mescroll.min.css'
  import MeScroll from 'mescroll'
  export default {
  name: 'Index',
  data () {
    return {
      labelName : ['全部','精华','分享','问答','weex','招聘'],
      activeName: 'first',
      mescroll: null,
      pdlist: []
    }
  },
//  methods: {
//
//  },
//  mounted(){
//      this.$ajax({
//        method: 'get',
//        url: '/api/v1/topics?tab=all',
//      }).then(function(res){
//        console.log(res)
//        /*将结果commit到mutations中*/
////        this.$store.commit('SAVE_LISTDATA', res.data.result);
//      }.bind(this))
//        .catch(function(err){
//          console.log(err)
//        });
//  },
  mounted() {
    //创建MeScroll对象,down可以不用配置,因为内部已默认开启下拉刷新,重置列表数据为第一页
    //解析: 下拉回调默认调用mescroll.resetUpScroll(); 而resetUpScroll会将page.num=1,再执行up.callback,从而实现刷新列表数据为第一页;
    var self = this;
    self.mescroll = new MeScroll("mescroll", {
      up: {
        callback: self.upCallback, //上拉回调,设置mescroll父元素高度，不然上拉不正常
        //以下参数可删除,不配置
        //page:{size:8}, //可配置每页8条数据,默认10
        toTop:{ //配置回到顶部按钮
          src : "dist/static/img/totop.jpg", //默认滚动到1000px显示,可配置offset修改
          //offset : 1000
        },
        empty:{ //配置列表无任何数据的提示
          warpId:"dataList",
          icon : "../res/img/mescroll-empty.png" ,
//						  	tip : "亲,暂无相关数据哦~" ,
//						  	btntext : "去逛逛 >" ,
//						  	btnClick : function() {
//						  		alert("点击了去逛逛按钮");
//						  	}
        }
      }
    });

    //初始化vue后,显示vue模板布局
    document.getElementById("dataList").style.display="block";
  },
  methods: {
    //上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page) {
      //联网加载数据
      var self = this;
      console.log(self)
      getListDataFromNet(page.num, page.size, function(curPageData) {
//        curPageData=[]; //打开本行注释,可演示列表无任何数据empty的配置

        //如果是第一页需手动制空列表
        if(page.num == 1) self.pdlist = [];

        //更新列表数据
        self.pdlist = self.pdlist.concat(curPageData);
        console.log(self.pdlist)
        //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
        //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;
        console.log("page.num="+page.num+", page.size="+page.size+", curPageData.length="+curPageData.length+", self.pdlist.length==" + self.pdlist.length);

        //方法一(推荐): 后台接口有返回列表的总页数 totalPage
        //self.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

        //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
//        self.mescroll.endBySize(curPageData.length, 20); //必传参数(当前页的数据个数, 总数据量)

        //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
        self.mescroll.endSuccess(curPageData.length, true); //必传参数(当前页的数据个数, 是否有下一页true/false)

      }, function() {
        //联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        self.mescroll.endErr();
      });
      function getListDataFromNet(pageNum,pageSize,successCallback,errorCallback) {
        self.$ajax.get("/api/v1/topics", {
          params: {
            tab : 'all',
            page : pageNum, //页码
            limit : pageSize //每页长度
          }
        })
          .then(function(response) {
            var data=response.data.data;
            console.log(response)
            successCallback&&successCallback(data);//成功回调
          })
          .catch(function(error) {
            errorCallback&&errorCallback();//失败回调
          });
//    },500)
      }

    },
    handleClick(tab, event) {
//      console.log(tab, event);
    }

  }
}
</script>

<style lang="less">
  .index{
    height:100%;
    margin-top: .6rem;

    #dataList{
      font-size: .7rem;
      text-align: left;
      padding: .6rem;
      margin-bottom: .2rem;
      border-bottom: 2px solid #e4e7e1;
    }
    .el-tabs,.el-tabs__content,.el-tab-pane{
      height:100%
    }
    .el-tabs__content{
      padding-top: 45px;
    }
  }
</style>

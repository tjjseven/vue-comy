<template>
  <div class="about">
    <div class="about_header">
      <div class="about_bg"></div>
      <img src="" alt="author" class="about_picture"/>
      <h2>author</h2>
      <div class="about_net">
        <p @click="popupVisible=!popupVisible">关于</p>
        <p @click="popupVisible=!popupVisible">发布</p>
      </div>
    </div>
    <div class="about_list">
      <div @click="popupVisible=!popupVisible" class="table list_div" v-for="(item, index) in aboutList" :key="index">
        <!--left-->
        <div class="list_left table_cell">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="item.icon"></use>
          </svg>
        </div>
        <!--center-->
        <div class="list_center table_cell">{{item.text}}</div>
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
      <div @click="popupVisible=!popupVisible" class="my-theme">
        <p class="back">
          <i class="mintui mintui-back"></i>返回
        </p>

      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui'
  import { mapActions } from 'vuex'
  import { USER_LOGOUT } from '../vuex/store'
  export default {
    name: 'about',
    data () {
      return {
        popupVisible: false,
        aboutList: [
          {icon: '#icon-shoucang', text: '关注的主题'},
          {icon: '#icon-canyu', text: '回复的主题'},
          {icon: '#icon-fabu', text: '发布的主题'}
        ]
      }
    },
    methods: {
      ...mapActions([USER_LOGOUT]),
      logout () {
        var self = this
        MessageBox.confirm('确定执行此操作?', {closeOnClickModal: false}).then(action => {
          this.USER_LOGOUT(this.user)
          self.$router.replace({path: '/login'})
        }, (err) => {
          console.log(err)
        })
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
      background: #1a242f;
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
    .logout{
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
  }
</style>

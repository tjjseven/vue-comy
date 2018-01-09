<template>
  <div class="message">
    <mt-cell title="未读消息" @click.native="myMsg">
      <mt-badge color="#f44336" size="large" style="font-size: 14px">10</mt-badge>
    </mt-cell>
    <mt-cell title="已读消息" @click.native="popupMsg=!popupMsg">
      <mt-badge color="#5f5f5f" size="large" style="font-size: 14px">0</mt-badge>
    </mt-cell>
    <mt-popup
      v-model="popupMsg"
      position="bottom"
      modal>
      <div @click="popupMsg=!popupMsg" class="my-theme">
        <p class="back">
          <i class="mintui mintui-back"></i>返回
        </p>

      </div>
    </mt-popup>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui'
  export default {
    name: 'message',
    data () {
      return {
        popupMsg: false
      }
    },
    methods: {
      myMsg () {
        if (true) {
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
  }
</style>

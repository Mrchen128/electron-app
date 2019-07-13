<template>
  <div class="about">
    <h1 @click="alertNotify">This is an about page</h1>
    <Button @click="success">测试</Button>
  </div>
</template>
<script>
import { Button,message } from 'ant-design-vue'
export default {
  methods:{
    alertNotify(){
        let myNotification = new Notification('标题', {
        body: '通知正文内容'
      })

      myNotification.onclick = () => {
        console.log('通知被点击')
      }
    },
    success () {
      message.success("this is a success message")
      },
  },
  components:{
    Button
  }
}
</script>

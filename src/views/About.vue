<template>
  <div class="about">
    <h1 @click="alertNotify">This is an about page</h1>
    <Button @click="success">测试</Button>
  </div>
</template>
<script>
import { Button,message } from 'ant-design-vue';
import ws from "@/webSocket"
import {remote} from "electron";

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
  created(){
    
  },
  mounted(){
    const {Menu}=remote;//渲染线程的用法
    const menu = Menu.buildFromTemplate([
    {
        label: '个人信息',
    },
    {
        type: 'separator'
    },
    {
        label: '开机启动',
        type: 'checkbox',
        checked: true,
        click(menuItem){
          console.log(menuItem)
        }
    },
    {
        type: 'separator'
    },
    {
        label: '性别',
        submenu: [
            {
                label: '男',
                type: 'radio',
                click(){
                  console.log('男')
                }

            },
            {
                label: '女',
                type: 'radio',
                click(){
                  console.log('女')
                }
            },
        ]
    }
]);
  window.addEventListener('contextmenu', function(e){
    e.preventDefault();
        menu.popup({
            window: remote.getCurrentWindow()
        });
    }, false);
  },
  components:{
    Button
  }
}
</script>

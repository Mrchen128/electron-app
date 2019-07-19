<template>
  <div id="app" >
    <div class="chat-room">
        <ul>
          <li v-for="(item,index) in mineChatList" :key='index' :class="name==item.nickname?'mine':''" >
              <div>
                <img src="./assets/logo.png" alt=""  class="head-portrait">
                <span>{{item.nickname}}</span>
              </div>
              
              <div>
                <div>{{item.date}}</div>
                <div>{{item.msg}}</div>
              </div>
          </li>
        </ul>
    </div>
    <textarea name="" id="" v-model="value" class="chat-input" @keyup.enter="sendMessage"></textarea>
     <Modal
      title="昵称"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
     <Input placeholder="请输入昵称" v-model="name"/>
    </Modal>
  </div>
</template>
<script>
import {ipcRenderer,remote} from 'electron';
import {ws,heartCheck} from "./webSocket";
import {Modal,Input} from "ant-design-vue";
export default {
  data(){
    return {
      value:'',
      otherChatList:[],
      mineChatList:[],
      visible:false,
      name:""
    }
  },
  created(){
    this.visible=true;
    ws.onopen=()=>{
      console.log('打开了')
      heartCheck.reset().start()
    }
     ws.onmessage =(evt)=>{
      var received_msg = evt.data;
      // ipcRenderer.send('getmessage')
      heartCheck.reset().start();
      let obj = JSON.parse(received_msg);
      if(obj.type==2){
        console.log(obj)

            this.mineChatList.push(obj)
            ipcRenderer.send("getmessage")
        

      }
      
      this.value="";
    }
    ws.onclose=()=>{
      this.isClose=true;
      console.log('已关闭')
    }
  },
  mounted(){
    //  document.getElementById('drag').ondragstart = (event) => {
    //   event.preventDefault()
    //   ipcRenderer.send('ondragstart', '/path/to/item')
    // };
    // window.oncontextmenu=function(e){
    //   e.preventDefault();
    //   console.log(111)
    //   ipcRenderer.send("signShowRightClickMenu","test")
    // }
  },
  methods:{
    sendMessage(){
        ws.send(JSON.stringify({
          type: 2,
          date: Date.now(),
          msg: this.value,
          nickname:this.name
      }));
      
    },
    handleOk(){
      console.log(this.name)
        this.visible=false;
    },
    handleCancel(){
      remote.app.quit()
    }
  },
  components:{
    Modal,Input
  }
}
</script>
<style lang="scss" scoped>

#app {
  color: #2c3e50;
  #nav{
    text-align: center;
  }
}
a{
  text-decoration: none;
}
.chat-room{
  width: 100%;
  height: 70vh;
  // border: 1px solid red;
  box-sizing: border-box;

  ul{
    padding:20px;
    box-sizing: border-box;
    width: 100%;
    li{
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    li.mine{
      // justify-content: flex-end;
      flex-direction: row-reverse;
    }
  }
}
.chat-input{
  position: fixed;
  width: 100%;
  left: 0;
  height: 30vh;
  bottom: 0;
  border: 1px solid greenyellow;
  box-sizing: border-box;
  padding: 30px;
}
.head-portrait{
  width: 20px;
  height: 20px;
}
</style>

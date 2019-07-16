<template>
  <div id="app" >
    <div class="chat-room">
        <ul class="other">
          <li v-for="(item,index) in otherChatList" :key='index'>{{item}}</li>
        </ul>
        <ul class="mine">
          <li v-for="(item,index) in mineChatList" :key='index'>{{item}}</li>
        </ul>
    </div>
    <textarea name="" id="" v-model="value" class="chat-input" @keyup.enter="sendMessage"></textarea>
  </div>
</template>
<script>
import {ipcRenderer} from 'electron';
import ws from "./webSocket"
export default {
  data(){
    return {
      value:'',
      otherChatList:[],
      mineChatList:[],
    }
  },
  created(){
    ws.onopen=()=>{
      console.log('打开了')
    }
     ws.onmessage =(evt)=>{
      var received_msg = evt.data;
      // ipcRenderer.send('getmessage')
    this.otherChatList.push(received_msg)
    }
    ws.onclose=()=>{
      this.isClose=true;
      console.log('已关闭')
    }
  },
  mounted(){
     document.getElementById('drag').ondragstart = (event) => {
      event.preventDefault()
      ipcRenderer.send('ondragstart', '/path/to/item')
    };
    // window.oncontextmenu=function(e){
    //   e.preventDefault();
    //   console.log(111)
    //   ipcRenderer.send("signShowRightClickMenu","test")
    // }
  },
  methods:{
    sendMessage(){
      ws.send(this.value);
      this.value='';
    }
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
  border: 1px solid red;
  box-sizing: border-box;
  display: flex;
  .other{
    flex: 1;
  }
   .mine{
    flex: 1;
    text-align: right;
  }
  li{
    margin:20px;
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
</style>

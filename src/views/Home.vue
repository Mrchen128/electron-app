<template>
  <div class="home">
    <div>
      <textarea name="" id="" cols="30" rows="10" v-model="value" @keyup.enter="send"></textarea>
    </div>
      <ul>
        <li v-for="(item,index) in valueList" :key="index" v-html="item"></li>
      </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import ws from "@/webSocket"
import {ipcRenderer} from 'electron';

export default {
  name: 'home',
  data(){
      return {
        value:"",
        valueList:[],
        isClose:false
      }
  },
  mounted(){
    window.addEventListener('contextmenu', function(e){
      e.preventDefault();
    })
  },
  created(){
    ws.onopen = function()
      {
      // Web Socket 已连接上，使用 send() 方法发送数据
      // ws.send("测试")
  };
    ws.onmessage =(evt)=>{
      var received_msg = evt.data;
      this.valueList.push(received_msg)
      ipcRenderer.send('getmessage')
    
    }
    ws.onclose=()=>{
      this.isClose=true;
      console.log('已关闭')
    }
  },
  methods:{
    send(){
      if(this.isClose){
        console.log("已经关闭")
      }else{
         ws.send(this.value);
         this.value="";
      }
       
    }
  },
  components: {
    
  }
}
</script>

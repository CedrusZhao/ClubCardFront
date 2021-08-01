<template>
  
  
  <div id="content" style="width:80%;margin: 20px auto">
    <a-row :gutter=10 >
      <a-col :span="8"> <a-input v-model="input" placeholder="请输入内容"></a-input> </a-col>
      <a-col :span="4"> <a-button>搜索</a-button> </a-col>
    </a-row>

    <a-row style="margin-top:10px">
      <a-table :columns="columns" :data-source="data">
      </a-table>
    </a-row>

    <a-row type="flex"  justify="end" style="margin-top:10px">
      <a-col span="3"><h2>共计2件</h2></a-col>
      <a-col span="3"><h2>总价60元</h2></a-col>
      <a-col span="3"><a-button>现金支付</a-button></a-col>
       <a-col span="3"><a-button v-on:click="pay">刷卡支付</a-button></a-col>
    </a-row>
    <a-modal v-model="visible" title="支付结果" @ok="handleOk">
      <p>{{this.payResult}}</p>
    </a-modal>
  </div>
</template>

<script>
  
const columns = [
  {
    title: '产品名称',
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
   
  },
  {
    title: '单价',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '数量',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: '总价',
    key: 'sum',
    dataIndex: 'sum',
    
  }
];

const data = [
  {
    key: '1',
    name: 'bag',
    price: 3,
    num: 10,
    sum: 30,
  },
  {
    key: '2',
    name: 'wash',
    price: 3,
    num: 10,
    sum: 30,
  },

];
  export default {
    name: 'landing-page',
    
	  data(){
	    return{
		  data,
      visible:false,
      payResult:"付款成功",
      columns,
      input : ""
		}
	},
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      pay(){
        
         this.COMMON.Pay(60,[{Name:"wash",Num:10,Price:3},{Name:"tag",Num:10,Price:3}]).then(res=>{
           console.log(res)
           if (!res.data.ok){
             this.payResult=res.data.err
             this.visible=true
           }
         })
          
      },
      handleOk(){
          this.visible=false
      }
      
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>

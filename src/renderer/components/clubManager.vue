<template>
    <div>
        <a-layout>
             <a-layout-header style="text-align:center" ><h1 style="color:white">会员管理</h1></a-layout-header>
        
            <div style="width:80%;margin: 20px auto">
                 <a-row :gutter=10 style="margin-top:10px">
                <a-col :span="8"><a-input v-model="input" placeholder="请输入内容"></a-input></a-col>
                <a-col :span="4"><a-button>搜索</a-button></a-col>
                <a-col :span="8"></a-col>
                <a-col :span="4"><a-button v-on:click="visible = true ">注册会员</a-button></a-col>
            </a-row>
          <a-row style="margin-top:10px">
               <a-table :columns="columns" :data-source="data">
                 </a-table>
          </a-row>
          <a-row>
            <a-modal v-model="visible" title="注册会员" @ok="handleOk">
            <a-row>
                <a-col :span="3">手机号</a-col>
                <a-col :span="8"> <a-input v-model="tel" placeholder="请输入内容"></a-input></a-col>
            </a-row>
            <a-row style="margin-top:10px">
                <a-col :span="3">性名</a-col>
                <a-col :span="8"> <a-input v-model="Cname" placeholder="请输入内容"></a-input></a-col>
            </a-row>
               <a-row style="margin-top:10px">
                <a-col :span="3">充值金额</a-col>
                <a-col :span="8"> <a-input v-model="account" type="number" placeholder="请输入内容"></a-input></a-col>
            </a-row>
            </a-modal>
          </a-row>
            </div>
           
       
        </a-layout>
      
    </div>
</template>
<script>
const columns = [
  {
    title: '性名',
    dataIndex: 'Name',
    key: 'Name',
   
   
  },
  {
    title: '手机号',
    dataIndex: 'Tel',
    key: 'Tel',
  },
  {
    title: '余额',
    dataIndex: 'Account',
    key: 'Account',
  },
  {
    title: '操作',
    key: 'sum',
    dataIndex: 'sum',
    
  }
];

const data = [
];

export default {
    name:"clubManager",
    mounted(){
       let ah  = this.$http.create({ baseURL: "http://localhost"})
       console.log("mounted exec")
         ah.post("/GetAllCard").then(rs=>{
              console.log(rs.data)
              this.data = rs.data.data
            })
    },
     methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      handleOk(){
        let ah  = this.$http.create({ baseURL: "http://localhost"})
        
        ah.post("/AddCard",{ "Tel":this.tel,"Name":this.Cname,"Account":Number(this.account)}).then(rs=>{
          this.visible = false
          if (rs.data.ok==true){
            ah.post("/GetAllCard").then(rs=>{
              console.log(rs.data)
              this.data = rs.data.data
            })
            this.$message.info('add card successfully');
          }else{
             this.$message.info('add card faild');
          }
         
        })
        
      }
    },
    data(){
        return{
            input:"",
            data,
            columns,
            visible:false,
            tel :"",
            Cname:"",
            account:1
        }
    }
}
</script>

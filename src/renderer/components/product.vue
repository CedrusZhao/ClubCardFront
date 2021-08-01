<template>
    <div>
        <a-layout>
             <a-layout-header style="text-align:center" ><h1 style="color:white">商品管理</h1></a-layout-header>
        
            <div style="width:80%;margin: 20px auto">
                 <a-row :gutter=10 style="margin-top:10px">
                <a-col :span="8"><a-input v-model="input" placeholder="请输入内容"></a-input></a-col>
                <a-col :span="4"><a-button>搜索</a-button></a-col>
                <a-col :span="8"></a-col>
                <a-col :span="4"><a-button  v-on:click="visible = true ">新增商品</a-button></a-col>
            </a-row>
          <a-row style="margin-top:10px">
               <a-table :columns="columns" :data-source="data">
                 </a-table>
          </a-row>
           <a-modal v-model="visible" title="新增商品" @ok="handleOk">
            <a-row>
                <a-col :span="3">商品名称</a-col>
                <a-col :span="8"> <a-input v-model="productName" placeholder="请输入内容"></a-input></a-col>
            </a-row>
            <a-row style="margin-top:10px">
                <a-col :span="3">价格</a-col>
                <a-col :span="8"> <a-input-number v-model="price" placeholder="请输入内容"></a-input-number></a-col>
            </a-row>
               <a-row style="margin-top:10px">
                <a-col :span="3">库存</a-col>
                <a-col :span="8"> <a-input-number v-model="account" placeholder="请输入内容"></a-input-number></a-col>
            </a-row>
                
            
            </a-modal>
            </div>
           
       
        </a-layout>
      
    </div>
</template>
<script>
const columns = [
  {
    title: '商品名称',
    dataIndex: 'Name',
    key: 'Name',
   
   
  },
  {
    title: '价格',
    dataIndex: 'Price',
    key: 'Price',
  },
  {
    title: '剩余',
    dataIndex: 'Num',
    key: 'Num',
  },
  {
    title: '操作',
    key: 'sum',
    dataIndex: 'sum',
    
  }
];

const data = [
  {
    key: '1',
    Name: '洗衣粉',
    Price: 10,
    Num: 100,
    
  },
  {
    key: '2',
    Name: '购物袋',
    Price: 20,
   Num: 100,
  },

];

export default {
    name:"produce",
        data(){
  return{
      input:"",
        data,
      columns,
      visible:false,
      productName:"",
      price:0,
      account:0
       }
    }, 
    mounted(){
         this.getAll()
         
       },
     methods: {
      
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      handleOk(){
        console.log("ok")
       
       
        this.COMMON.ProductAdd(this.productName,this.price,this.account).then(res =>{
          this.visible = false
            if (res.data.ok){
              this.$message.info('add product successlly');
              this.getAll()
            }else{
              this.$message.error(res.data.err);
              
            }
        })
      },
      getAll(){
           
         this.COMMON.ProductGetAll().then(res=>{
           this.data = res.data.data
         })
      }
    },

}
</script>

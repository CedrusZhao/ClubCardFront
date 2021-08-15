<template>
    <div style="height:100%">
        <a-layout style="height:100%">
             <a-layout-header style="text-align:center" ><h1 style="color:white">商品管理</h1></a-layout-header>
            
                 <div style="margin-top:20px">
                <a-row :gutter=10 >
                    <a-col :span="8"><a-input v-model="input" placeholder="请输入内容"></a-input></a-col>
                    <a-col :span="4"><a-button @click="searchProduct">搜索</a-button></a-col>
                    <a-col :span="8"></a-col>
                    <a-col :span="4"><a-button  v-on:click="visible = true ">新增商品</a-button></a-col>
                </a-row>
                 </div>
                 <div style="margin-top:20px">
                <a-row >
                    <a-col :span="24">
                        <a-table :columns="columns" :data-source="data">
                            <a slot="action" @click="updateProduct(record)" slot-scope="text,record">update</a>
                        </a-table>
                    </a-col>
                </a-row>
                 </div>
        </a-layout>
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
           <a-modal v-model="updateVisible" title="修改商品" @ok="handleUpdateOk">
                    <a-row>
                        <a-col :span="3">商品名称</a-col>
                        <a-col :span="8"> <a-input v-model="updateProductName" placeholder="请输入内容"></a-input></a-col>
                    </a-row>
                    <a-row style="margin-top:10px">
                        <a-col :span="3">价格</a-col>
                        <a-col :span="8"> <a-input-number v-model="updatePrice" placeholder="请输入内容"></a-input-number></a-col>
                    </a-row>
                    <a-row style="margin-top:10px">
                        <a-col :span="3">库存</a-col>
                        <a-col :span="8"> <a-input-number v-model="updateAccount" placeholder="请输入内容"></a-input-number></a-col>
                    </a-row>
                             
        </a-modal>
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
      title:'ID',
      dataIndex:'ID',
      key:"ID",
      className:"notshow",

  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  
    
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
      account:0,
      updateProductName:"",
      updateID:0,
      updatePrice:0,
      updateAccount:0,
      updateVisible:false

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
      },
      updateProduct(record){
          this.updateProductName = record.Name
          this.updatePrice = record.Price
          this.updateAccount = record.Num
          this.updateID=record.ID
          this.updateVisible =true


      },
      handleUpdateOk(){
          this.COMMON.ProductUpdate(this.updateID,this.updateProductName,this.updatePrice,this.updateAccount).then(res=>{
              if (res.data.ok){
                  this.$message.info("update succefully")
                  this.getAll()
              }else{
                  this.$message.error(res.data.err)
              }
          })
          this.updateVisible =false
      },
      searchProduct(){
            this.COMMON.GetProductByName(this.input).then(res=>{
            if (res.data.ok){
                 this.data = res.data.data

            }else{
                this.$message.error(res.data.data.err)
            }
        })

      }
    },

}
</script>
<style >
.notshow {
    display: none;
}
</style>

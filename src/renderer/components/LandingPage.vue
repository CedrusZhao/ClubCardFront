<template>
  
  <div id="content" style="padding-left:5px;padding-right:5px;height:98%;padding-top:5px">
   
    <a-row style="height:100%" :gutter="16" type="flex"  justify="center">
        <a-col span="15"  class="gutter-row" style="height:100%">
            <div style="background-color:#FFFFFF;height:100%">
                <div style="padding-top:10px">
                    <h2>已选商品</h2>
                </div>
                <a-table :columns="columns" :data-source="selectedProductList" :pagination="false">
                    <span slot="action" slot-scope="text, record">
                        <a @click="deleteRecord(record)">Delete</a>
                    </span>
                    <template slot="Num" slot-scope="text, record">
                    
                       <a-icon @click="plus(record)" type="plus" />
                           {{text}}
                       <a-icon @click="minus(record)" type="minus" />
                    </template>
                    <span slot="sum" slot-scope="text,record">
                        {{record.Num * record.Price}}
                    </span>   
                </a-table>
                <a-row type="flex" justify="end">
                    <a-col span="5">
                       <h2> {{productSum()}}元</h2>
                    </a-col>
                    
                </a-row>

                <a-row type="flex"  justify="end" style="margin-top:10px">
                    <a-col span="5"><a-button @click="cashPay">现金支付</a-button></a-col>
                    <a-col span="5"><a-button v-on:click="pay">刷卡支付</a-button></a-col>
                </a-row>
            </div>
       </a-col>
     
        <a-col span="9"  style="height:100%" >
            <div style="background-color:#FFFFFF;height:100%">
                <div style="padding-top:10px">
                    <h2>商品列表</h2>
                </div>
                <a-row :gutter=10 >
                    <a-col :span="9"> <a-input v-model="input" placeholder="请输入内容"></a-input> </a-col>
                    <a-col :span="4"> <a-button @click="search">搜索</a-button> </a-col>
                </a-row>
                <a-table :columns="ProductColumns" :data-source="data" :customRow="customRow">
                </a-table>
            </div>
        </a-col>
     
    </a-row>

   
   
  </div>
</template>

<script>
  
const columns = [
  {
    title: '产品名称',
    dataIndex: 'Name',
    key: 'Name',
  },
  {
    title: '单价',
    dataIndex: 'Price',
    key: 'Price',
  },
  {
    title: '数量',
    dataIndex: 'Num',
    key: 'Num',
    scopedSlots: { customRender: 'Num' },
  },
  {
    title: '合计',
    key: 'sum',
    dataIndex: 'sum',
     scopedSlots: { customRender: 'sum' },
  },
  {
    title: '操作',
    key: 'action',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  }
];
const ProductColumns =[
     {
    title: '产品名称',
    dataIndex: 'Name',
    key: 'Name',
   
   
  },
  {
    title: '单价',
    dataIndex: 'Price',
    key: 'Price',
  },
]

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
         
           
            columns,
            input : "",
            selectedProductList:[],
            ProductColumns
		}
	},
    mounted(){
        this.COMMON.ProductGetAll().then(res=>{
            if (res.data.ok){
                this.data = res.data.data
                this.data = this.data.map(x=>{
                     x.Num=1
                     return x})
            }else{
                 this.$message.error(res.data.err)
            }
        })
    },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      pay(){
        this.COMMON.Pay(this.productSum(),this.selectedProductList).then(res=>{
      
        if (!res.data.ok){
           
              this.$message.error(res.data.err)
        }else{
            this.selectedProductList=[]
            this.$message.info("pay success")
        }
        })
      },
      cashPay(){
          this.COMMON.CashPay(this.productSum(),this.selectedProductList).then(res=>{
            if (!res.data.ok){
            
             this.$message.error(res.data.err)
            }else{
            this.selectedProductList=[]
            this.$message.info("pay success")
            }
      
          })
      },
      customRow(record, index){
          return {
              on:{
                  click:event=>{
                      this.selectedProductList.push(record)
                  }
              }
          }
      },
    deleteRecord(record){
    
        var index =0
        for (var i=0;i<this.selectedProductList.length;i++){
            if (record.name==this.selectedProductList[i].name){
                index = i
                break
            }
        }
        this.selectedProductList.splice(index,1)

    },
    plus(record){
        console.log("pluus")
        var index = this.selectedProductList.indexOf(record)
        console.log(index)
        this.selectedProductList[index].Num +=1
       
    },
    minus(record){
         var index = this.selectedProductList.indexOf(record)
        this.selectedProductList[index].Num -=1
    },
    productSum(){
        let sum =0
        this.selectedProductList.forEach(item=>{
            sum += item.Num * item.Price
        })
        return sum
    },
    search(){
        this.COMMON.GetProductByName(this.input).then(res=>{
            if (res.data.ok){
                 this.data = res.data.data
                this.data = this.data.map(x=>{
                     x.Num=1
                     return x})

            }else{
                this.$message.error(res.data.data.err)
            }
        })
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

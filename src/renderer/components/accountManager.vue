<template>
  <div >
    <a-layout>
      <a-layout-header style="text-align:center" ><h1 style="color:white">账号管理</h1></a-layout-header>
        <div style="width:80%;margin: 20px auto">
          <a-row style="margin-top:10px">
            <a-table :columns="columns" :data-source="data">
                <span slot="operate" slot-scope="text, record">
                  
                  <a v-on:click="updatePassworld">update passworld</a>
                </span>
            </a-table>
          </a-row>
        </div>
    </a-layout>
  </div>
</template>
<script>
const columns = [
  {
    title: '账号',
    dataIndex: 'account',
    key: 'account',
   
   
  },
  {
    title: '密码修改时间',
    dataIndex: 'updatetime',
    key: 'updatetime',
   
   
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    scopedSlots: { customRender: 'operate' },
  },
];

const data = [
  {
    key: '1',
    account: '123',
    updatetime:'2021年9月10号'
   
    
  },
  {
    key: '2',
     account: '456',
     updatetime:'2021年9月11号'
  },

];
export default {
    data(){
        return {
               data,
            columns,
        }
    },
    methods:{
      // 主要是打开弹窗
      updatePassworld(e){
          console.log(e)
      }
    }
    
}
</script>
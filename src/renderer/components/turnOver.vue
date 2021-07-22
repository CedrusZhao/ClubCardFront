<template>
    <div >
        <a-layout>
  <a-layout-header style="text-align:center" ><h1 style="color:white">统计营业额</h1></a-layout-header>
  <div style="width:80%;margin: 20px auto">
        <a-row>
            <a-col :span="18"></a-col>
            <a-col :span="6">
                <a-radio-group v-model="value" @change="onChange">
      <a-radio :value="1">
        按月
      </a-radio>
      <a-radio :value="2">
        按天
      </a-radio>
     
    </a-radio-group>
            </a-col>
        </a-row>
        <a-row style="margin-top:10px">
               <a-table :columns="columns" :data-source="data">
               </a-table>
          </a-row>
  </div>
          </a-layout>
    </div>
</template>
<script>
const columns = [
  {
    title: '时间段',
    dataIndex: 'duration',
    key: 'duration',
   
   
  },
  {
    title: '销售金额',
    dataIndex: 'salesum',
    key: 'salesum',
  },
];

const data = [
  {
    key: '1',
    duration: '2019年10月25号',
    
    salesum: 100,
    
  },
  {
    key: '2',
     duration: '2019年10月26号',
   
   salesum: 100,
  },

];

export default {
    data(){
        return{
             data,
            columns,
            value:1,
        }
    },
    methods:{
        onChange(e){
            console.log(e)
        }
    }
    
}
</script>
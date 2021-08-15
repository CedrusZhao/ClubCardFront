<template>
    <div >
        <a-layout>
          <a-layout-header style="text-align:center" ><h1 style="color:white">统计营业额</h1></a-layout-header>
          <div style="width:80%;margin: 20px auto">
            <a-row>
              <a-col :span="18"></a-col>
              <a-col :span="6">
                <a-radio-group v-model="value" @change="onChange">
              
                <a-radio :value="1" >
                  按天
                </a-radio>
                <a-radio :value="2" >
                  按月
                </a-radio>
      
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row style="margin-top:10px">
               <a-table :columns="columns" @change="pageChange" :data-source="data" :pagination="pagination">
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
    dataIndex: 'Data',
    key: 'Data',
   
   
  },
  {
    title: '销售金额',
    dataIndex: 'Sum',
    key: 'Sum',
  },
];

const data = [

];

export default {
    data(){
        return{
             data,
            columns,
            value:1,
            targetPage:0,
            currtenPage:0,
            pagination: {
            pageSize: 2, // 默认每页显示数量
            showSizeChanger: false, // 显示可改变每页数量
            total:0,
				
				showTotal: total => `Total ${total} items`, // 显示总数
				
			}

        }
    },
    mounted(){
    this.ByDay()

    },
    methods:{
        onChange(e){
            console.log(e)
            if (this.value==2){
              this.ByMonth()
            }
            if (this.value==1){
              this.ByDay()
            }
        },
        pageChange(page,pagesize){
          
          this.targetPage = page.current
          if (this.targetPage>this.currtenPage){
            if (this.value==1){
                this.downDayPage()
            }else if(this.value==2){
              this.downMonthPage()
            }
           
          }
          if (this.targetPage<this.currtenPage){
            if (this.value == 1){
              this.upDayPage()
            }else if(this.Value ==2){
              this.upMonthPage()
            }
            
          }
        },
        downDayPage(){ //向下翻一页

            this.COMMON.GetDayTurnOverByPage(this.data[this.data.length-1].Data,"down").then(res=>{
              if (res.data.ok){
                this.data = res.data.data
                this.currtenPage = this.currtenPage +1
                if (this.targetPage > this.currtenPage){
                  this.downPage()
                }
              }else {
                this.$message.error(res.data.err)
              }
            })

        },
        downMonthPage(){
            this.COMMON.GetMonthTurnOverByPage(this.data[this.data.length-1].Data,"down").then(res=>{
              if (res.data.ok){
                this.data = res.data.data
                this.currtenPage = this.currtenPage +1
                if (this.targetPage > this.currtenPage){
                  this.downPage()
                }
              }else {
                this.$message.error(tes.data.err)
              }
            })

        },
        upDayPage(){ //向上翻页
          
             this.COMMON.GetDayTurnOverByPage(this.data[0].Data,"up").then(res=>{
               if (res.data.ok){
                   this.data = res.data.data
                    this.currtenPage = this.currtenPage -1
                    if (this.targetPage<this.currtenPage){
                      this.upPage()
                    }

               }else{
                 this.$message.error(tes.data.err)
               }
             })
          
        },
        upMonthPage(){
           this.COMMON.GetMonthTurnOverByPage(this.data[0].Data,"up").then(res=>{
               if (res.data.ok){
                   this.data = res.data.data
                    this.currtenPage = this.currtenPage -1
                    if (this.targetPage<this.currtenPage){
                      this.upPage()
                    }

               }else{
                 this.$message.error(tes.data.err)
               }
             })

        },
        ByMonth(){
           this.COMMON.GetTurnOverMonths().then(x=>{
         if (x.data.ok){
           this.pagination.total = x.data.data.num
          
           if (this.pagination.total >0){
             this.COMMON.GetMonthTurnOverByPage("","down").then(res=>{
               if (res.data.ok){
                 this.data = res.data.data
                 this.currtenPage =1
               }
               else {
                 this.this.$message.error(res.data.err);
               }
             })
           }
           
         }else{
           this.this.$message.error(x.data.err);
         }
       })

        },
        ByDay(){

           this.COMMON.GetTurnOverDays().then(x=>{
         if (x.data.ok){
           this.pagination.total = x.data.data.num
          // this.pagination = x.data.data.num
           if (this.pagination.total >0){
             this.COMMON.GetDayTurnOverByPage("","down").then(res=>{
               if (res.data.ok){
                 this.data = res.data.data
                 this.currtenPage =1
               }
               else {
                 this.this.$message.error(res.data.err);
               }
             })
           }
           
         }else{
           this.this.$message.error(x.data.err);
         }
       })

        }

    }
    
}
</script>
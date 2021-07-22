<template>
<div>
     <a-modal v-model="visible" title="会员信息" @ok="handleOk">
          <a-row style="margin-top:10px">
                <a-col :span="3">性名</a-col>
                <a-col :span="3">{{name}} </a-col>
            </a-row>
            <a-row>
                <a-col :span="3">手机号</a-col>
                <a-col :span="3"> tel</a-col>
            </a-row>
           
               <a-row style="margin-top:10px">
                <a-col :span="3">余额</a-col>
                <a-col :span="3"> {{account}}</a-col>
            </a-row>
            <a-row>
                <a-col :span="12"><a-button>充值</a-button></a-col>
                <a-col :span="12"><a-button>补办新卡</a-button></a-col>

            </a-row>
            </a-modal>
</div>
    
</template>
<script>


export default {
    props:["visible","name","tel","account"]
    
}
</script>

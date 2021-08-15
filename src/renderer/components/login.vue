<template>
    <div style="height:100%">
           <a-row>
               <a-col :span="8"></a-col>
               <a-col :span="8">
                   <div>
                       <a-input v-model="username" placeholder="Useername" />
                       <a-input v-model="password" placeholder="Password" />
                        <a-button type="primary"> 登录</a-button>
                   </div>
               </a-col>
               <a-col :span="8"></a-col>
           </a-row>
    </div>
</template>
<script>
export default {
    name:"Login",
    data(){
        return{
            username:"",
            password:"",
        }
    }
}
</script>
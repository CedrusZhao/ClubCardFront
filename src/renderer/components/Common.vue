<script type="text/javascript">
import axios from 'axios'
    // 定义一些公共的属性和方法
    const localHttp = axios.create({ baseURL: "http://localhost"})
    function GetTurnOverDays(){
       return  localHttp.get("/Order/GetTurnOverDays")

    }
    function GetTurnOverMonths(){
        return localHttp.get("/Order/GetTurnOverMonths")
    }
    function GetDayTurnOverByPage(pageIndex,pageType){
        return localHttp.post("/Order/GetDayTurnOverByPage",{"pageIndex":pageIndex,"pageType":pageType})
    }
    function ProductGetAll(){
        return localHttp.post("/Product/GetAll")
    }
    function ProductAdd(name,price,num){
        return localHttp.post("Product/Add",{name:name,price:price,num:num})
    }
    function Pay(sum,items){
        return localHttp.post("Card/Pay",{Sum:sum,Items:items})
    }
    function GetAllCard(){
        return localHttp.post("/Card/GetAllCard")
    }
    function AddCard(tel,name,account){
        return localHttp.post("/Card/AddCard",{ "Tel":tel,"Name":name,"Account":account})
    }
    // 暴露出这些属性和方法
    export default {
        GetTurnOverDays,
        GetTurnOverMonths,
        GetDayTurnOverByPage,
        ProductGetAll,
        ProductAdd,
        Pay,
        GetAllCard,
        AddCard

    }
</script>
<template>
<div>
    <el-card class="box-card">
    <el-table :data="customerList" stripe>
        <el-table-column label="客户id" prop="customerId"></el-table-column>
        <el-table-column label="客户姓名" prop='customerName'>
        </el-table-column>
        <el-table-column label="服务项目编号" prop='serviceId'></el-table-column>
        <el-table-column label="服务项目" prop='nursingName'></el-table-column>
        <el-table-column label="购买数量" prop='amount'></el-table-column>
        <el-table-column label="购买时间" prop='buyTime'></el-table-column>
    </el-table>
    </el-card>
</div>
</template>

<script>
    export default {
        name: "ServiceConcern",
        data(){
            return{
                customerList:[],
                array:{
                    customerId:''
                }
            }
        },
        created(){
            this.searchCustomerService()
        },
        methods:{
            searchCustomerService(){
                this.array.customerId = this.$route.params.id
                let path = `http://localhost:8081/userManage/searchCustomerService`
                this.$ajax.post(path,this.array).then(res=>{
                    this.customerList = res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>

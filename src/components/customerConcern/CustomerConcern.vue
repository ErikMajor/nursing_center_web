<template>
    <div>
        <el-card class="box-card">
            <el-input style="margin-left: 10px;float: left;width: 150px" v-model="customerName" placeholder="请输入客户姓名"></el-input>

            <el-button type="primary" style="margin-left: 10px;" @click="queryUser">查询</el-button>
            <el-button type="primary" style="margin-left: 10px;" @click="getAllCustomer">所有客户</el-button>

            <el-table :data="customerList" stripe>
                <el-table-column label="客户id" prop="id"></el-table-column>
                <el-table-column label="客户姓名" prop='customerName'>
                </el-table-column>
                <el-table-column label="性别" prop='customerSex'></el-table-column>
                <el-table-column label="年龄" prop='customerAge'></el-table-column>
                <el-table-column label="健康状况" prop='psychosomaticState'></el-table-column>
                <el-table-column label="房间号" prop='roomId'></el-table-column>
                <el-table-column label="操作">

                    <template slot-scope="scope">

                        <el-button round icon="el-icon-edit" type="success" @click = "searchBuyService(scope.row)">查看购买服务</el-button>

                    </template>

                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: '男',
                    label: '男'
                }, {
                    value: '女',
                    label: '女'
                }],
                options1:[
                    {
                        value: '健康',
                        label: '健康'
                    }, {
                        value: '生病',
                        label: '生病'
                    }
                ],
                options2:[
                    {
                        value: '入住',
                        label: '入住'
                    }, {
                        value: '外出',
                        label: '外出'
                    },{
                        value: '退住',
                        label: '退住'
                    }
                ],
                array:{
                    customerName:'',
                    customerSex:'',
                    psychosomaticState:'',
                    accommodationStatus:''
                },
                value1: [],
                value2: [],
                value3: [],
                customerList:[],
                tableData:{},
                customerName:''
            }
        },
        created(){
            this.getAllCustomer()
        },
        methods:{
            getAllCustomer(){
                let path = `http://localhost:8081/customerManage/selectAllCustomer`
                this.$ajax.post(path,this.form).then(res=>{
                    this.customerList = res.data
                })
            },
            searchBuyService(val){
                this.$router.push(`/main/serviceConcern/${val.id}`)
            },
            queryUser(){
                this.array.customerName = this.customerName
                let path = `http://localhost:8081/customerManage/queryUser`
                this.$ajax.post(path,this.array).then(res=>{
                    this.customerList = res.data
                })
            }
        }
    }
</script>

<style scoped>

</style>

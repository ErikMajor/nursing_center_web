<template>
    <div>
        <el-card class="box-card">
        <el-input style="margin-left: 10px;float: left;width: 150px" v-model="customerName" placeholder="请输入客户姓名"></el-input>
        <el-select v-model="value1" clearable style="margin-left: 20px;" placeholder="客户性别">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-select
                v-model="value2"
                clearable
                style="margin-left: 20px;"
                placeholder="健康状况">
            <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-select
                v-model="value3"
                clearable
                style="margin-left: 20px;"
                placeholder="住宿状态">
            <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 10px;" @click="queryUser">查询</el-button>
            <el-button type="primary" style="margin-left: 10px;" @click="getAllCustomer">所有客户</el-button>

            <el-table :data="customerList" stripe>
                <el-table-column label="客户id" prop="id"></el-table-column>
                <el-table-column label="客户姓名" prop='customerName'>
                </el-table-column>
                <el-table-column label="性别" prop='customerSex'></el-table-column>
                <el-table-column label="年龄" prop='customerAge'></el-table-column>
                <el-table-column label="入住日期" prop='checkinDate'></el-table-column>
                <el-table-column label="住宿状态" prop='accommodationStatus'></el-table-column>
                <el-table-column label="健康状况" prop='psychosomaticState'></el-table-column>
                <el-table-column label="房间号" prop='roomId'></el-table-column>
                <el-table-column label="操作">

                    <template slot-scope="scope">

                        <el-button round icon="el-icon-edit" type="warning" @click = "getMeal(scope.row)">分配膳食日历</el-button>

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
            getMeal(val){
                const customerId = val.id
                this.$router.push(`/main/mealList/${customerId}`)
            },
            queryUser(){
                this.array.customerName = this.customerName
                this.array.customerSex = this.value1
                this.array.psychosomaticState = this.value2
                this.array.accommodationStatus = this.value3
                let path = `http://localhost:8081/customerManage/queryUser`
                this.$ajax.post(path,this.array).then(res=>{
                    this.customerList = res.data
                })
            }
        }
    }
</script>

<style scoped>

    /*.box-card{*/
    /*    margin-top: 10px;*/
    /*}*/
</style>

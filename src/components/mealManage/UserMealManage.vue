<template>
    <div>
        <el-card class="box-card">
        <el-input style="margin-left: 10px;float: left;width: 150px" v-model="foodName" placeholder="请输入客户姓名"></el-input>
        <el-select v-model="value1" multiple style="margin-left: 20px;" placeholder="客户性别">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-select
                v-model="value2"
                multiple
                collapse-tags
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
                multiple
                collapse-tags
                style="margin-left: 20px;"
                placeholder="住宿状态">
            <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 10px;" @click="search">查询</el-button>

<!--    </div>-->
<!--    <div>-->

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
                <!--        <el-table-column label="职位" prop='opos'></el-table-column>-->
                <!--        <el-table-column label="电话" prop='otep'></el-table-column>-->
                <el-table-column label="操作">

                    <template slot-scope="scope">

                        <el-button type="success" slot="reference" icon="el-icon-edit" @click = "getMeal(scope.row)">分配膳食日历</el-button>

                    </template>

                </el-table-column>
            </el-table>
<!--            <el-pagination background layout="prev, pager, next" :total="AllCount"-->
<!--                           @current-change="handleCurrentChange" :current-page="page">-->
<!--            </el-pagination>-->
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                options1:[],
                options2:[],
                value1: [],
                value2: [],
                value3: [],
                customerList:[],
                tableData:{},
                // array:{
                //     checkDate:''
                // }



            }
        },
        created(){
            this.getAllCustomer()
        },
        methods:{
            getAllCustomer(){
                let path = `http://localhost:8082/customerManage/selectAll`
                this.$ajax.post(path,this.form).then(res=>{
                    this.customerList = res.data
                })
                // this.array.checkDate = this.customerList.checkinDate.year()+"-"+this.customerList.checkinDate.month()+"-"+this.customerList.checkinDate.date()
            },
            getMeal(val){
                this.$router.push(`/main/mealList/${val.id}`)
            }
        }
    }
</script>

<style scoped>

    /*.box-card{*/
    /*    margin-top: 10px;*/
    /*}*/
</style>

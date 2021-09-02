<template>
<div>
    <div>
    <el-input style="margin-left: 40px;float: left;width: 150px" v-model="foodName" placeholder="请输入膳食名称"></el-input>
    <el-select v-model="value" style="margin-left: 10px;width: 150px" clearable placeholder="食品类别">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>

    <el-select
            v-model="value1"
            style="margin-left: 10px;width: 150px"
            clearable
            placeholder="食品标签">
        <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>

    <el-select
            v-model="value2"
            style="margin-left: 10px;width: 150px"
            clearable
            placeholder="供应星期">
        <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>

    <el-select
            v-model="value3"
            style="margin-left: 10px;width: 150px"
            clearable
            placeholder="供应类别">
        <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
    <el-button type="primary" style="margin-left: 10px;" @click="search">查询膳食</el-button>
        <el-button type="primary" style="margin-left: 10px;" @click="getFoodList">所有膳食</el-button>
    <el-button type="primary" style="margin-left: 10px;" @click="addFood">添加膳食</el-button>
        <el-button type="primary" style="margin-left: 10px;" @click="returnBack">返回日历</el-button>
    </div>

<div class="h1">
    <el-row class="h2" v-for="(m, index1) in foodRow" :key="index1" style="margin-top: 100px;margin-left: 40px">
        <el-col class="h3" :span="4" v-for="(o, index2) in 4" :key="index2" :offset="index2 > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '10px' }" v-if="number > (index1*4+index2)" style="width: 200px;height: 260px">
                <div v-if="tableData[index1*4+index2].foodPicture">
                    <img :src="`http://localhost:8081/${tableData[index1*4+index2].foodPicture}`" class="image"/>
                </div>
                <div style="padding: 14px;">
                    <div>名称：{{tableData[index1*4+index2].foodName}}</div>
                    <div>价格：{{tableData[index1*4+index2].foodPrice}}</div>
                    <div>供应星期：{{tableData[index1*4+index2].supplyDate}}</div>
                    <div>供应时间段：{{tableData[index1*4+index2].supplyType}}</div>
                    <div class="bottom clearfix">
                        <el-button type="text" class="button" @click="add((tableData[index1*4+index2].id),(tableData[index1*4+index2].supplyDate),(tableData[index1*4+index2].supplyType))">添加</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</div>
</div>
</template>

<script>
    export default {
        name: "MealCanlender",
        mounted(){
            this.getParams()
            this.getFoodList()
        },
        methods:{
            getSearchNum(){
                let path = `http://localhost:8081/mealManage/getSearchNum`
                this.$ajax.post(path,this.array1).then(res=>{
                    this.number = res.data
                    if(this.number < 4)
                        this.foodRow = 1;
                    else if(this.number % 4 === 0){
                        this.foodRow = this.number/4;
                    }
                    else{
                        this.foodRow = parseInt((this.number/4).toString()) + 1;
                    }
                })
            },
            search(){
                this.array1.foodName = this.foodName
                this.array1.foodType = this.value
                this.array1.foodTag = this.value1
                this.array1.supplyDate = this.value2
                this.array1.supplyType = this.value3
                this.getSearchNum()
                let path = `http://localhost:8081/mealManage/search`
                this.$ajax.post(path,this.array1).then(res=>{
                    this.tableData = res.data
                })
            },
            addFood(){
                this.$router.push(`/main/mealRecords`)
            },
            getFoodList(){
                this.getFoodNum()
                let path = `http://localhost:8081/mealManage/selectAll`
                this.$ajax.post(path).then(res=>{
                    this.tableData = res.data
                })
            },
            getFoodNum(){
                let path = `http://localhost:8081/mealManage/getFoodNum`
                this.$ajax.post(path).then(res=>{
                    this.number = res.data
                    if(this.number < 4)
                        this.foodRow = 1;
                    else if(this.number % 4 === 0){
                        this.foodRow = this.number/4;
                    }
                    else{
                        this.foodRow = parseInt((this.number/4).toString()) + 1;
                    }
                })
            },
            returnBack(){
                const customerId = this.$route.query.customerId
                this.$router.push(`/main/MealList/${customerId}`)
                    // query:{
                    //     customerId: this.$route.query.customerId
                    // }
            },
            getParams(){
                const row = this.$route.query.row
                const col = this.$route.query.col
                this.array.foodDate = row
                this.array.foodWeek = col
            },
            add(foodId,supplyDate,supplyType){
                this.judge = this.$route.query.customerId
                this.array.customerId = this.$route.query.customerId
                this.array.foodWeek = this.$route.query.row
                this.array.foodDate = this.$route.query.col
                this.array.foodId = foodId
                if(this.judge !== undefined && this.array.foodWeek !== undefined && this.array.foodDate !== undefined) {
                    if(this.array.foodWeek === supplyDate && this.array.foodDate === supplyType) {
                        let path = `http://localhost:8081/mealManage/insertMealSetting`
                        this.$ajax.post(path, this.array).then(res => {
                            this.tableData = res.data
                            if (res.data.state === "success") {
                                this.$message({
                                    message: "恭喜你添加成功",
                                    type: "success",

                                })
                            }
                        })
                    }
                    else{
                        this.$message({
                            message: "要添加的食物周期或者时间段不同，请添加周期和时间段都相同的食物",
                            type: "failed",

                        })
                    }
                }
                else{
                    this.$message({
                        message: "要先指定添加客户",
                        type: "failed",

                    })
                }
            }


        },
        data() {
            return {
                options: [{
                    value: '大荤',
                    label: '大荤'
                }, {
                    value: '小荤',
                    label: '小荤'
                }, {
                    value: '素菜',
                    label: '素菜'
                }, {
                    value: '甜点',
                    label: '甜点'
                }, {
                    value: '水果',
                    label: '水果'
                },{
                    value: '套餐',
                    label: '套餐'
                }],
                options1: [{
                    value: '多糖',
                    label: '多糖'
                }, {
                    value: '少糖',
                    label: '少糖'
                }, {
                    value: '多脂肪',
                    label: '多脂肪'
                }, {
                    value: '少脂肪',
                    label: '少脂肪'
                }, {
                    value: '多盐',
                    label: '多盐'
                },{
                    value: '少盐',
                    label: '少盐'
                }],
                options2: [{
                    value: '周一',
                    label: '周一'
                }, {
                    value: '周二',
                    label: '周二'
                }, {
                    value: '周三',
                    label: '周三'
                }, {
                    value: '周四',
                    label: '周四'
                }, {
                    value: '周五',
                    label: '周五'
                }, {
                    value: '周六',
                    label: '周六'
                },{
                    value: '周日',
                    label: '周日'
                }],
                options3: [{
                    value: '早餐',
                    label: '早餐'
                }, {
                    value: '午餐',
                    label: '午餐'
                }, {
                    value: '晚餐',
                    label: '晚餐'
                }],
                judge:0,
                array1:{
                    foodName:'',
                    foodType: '',
                    foodTag: '',
                    supplyDate: '',
                    supplyType: '',
                },
                array:{
                    customerId:'',
                    foodId:'',
                    foodDate:'',
                    foodWeek:''
                },
                value: [],
                value1: [],
                value2: [],
                value3: [],
                foodName: '',
                tableData:{},
                number:0,
                foodRow:0,
                row:'',
                col:'',
            }
        }
    }
</script>

<style scoped>
    .h1{
        margin-left: 50px;
        margin-top: 30px;
    }
    .h2{
        margin-top: 10px;
    }
    .h3{
        width:200px;
        height: 200px;

    }
    .image {
        width: 180px;
        height: 100px ;
        display: block;
    }
</style>

<template>
<div>
    <div>
    <el-input style="margin-left: 10px;float: left;width: 150px" v-model="foodName" placeholder="请输入膳食名称"></el-input>
    <el-select v-model="value1" multiple style="margin-left: 20px;" placeholder="食品类别">
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
            placeholder="食品标签">
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
            placeholder="供应星期">
        <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>

    <el-select
            v-model="value4"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="供应类别">
        <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
    <el-button type="primary" style="margin-left: 10px;" @click="search">查询膳食</el-button>
    <el-button type="primary" style="margin-left: 20px;" @click="addFood">添加膳食</el-button>
    </div>

<div class="h1">
    <el-row class="h2" v-for="(m, index1) in foodRow" :key="index1" style="margin-top: 50px">
<!--        mealRow表示数据库中膳食每四个一行，一共有多少行数据-->
        <el-col class="h3" :span="4" v-for="(o, index2) in 4" :key="index2" :offset="index2 > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '10px' }" v-if="number > (index1*4+index2)">
<!--                number表示一共有多少个膳食-->
                <div v-if="tableData[index1*4+index2].foodPicture">
                    <img :src="`http://localhost:8082/${tableData[index1*4+index2].foodPicture}`" class="image"/>
                </div>
                <div style="padding: 14px;">
                    <div>名称：{{tableData[index1*4+index2].foodName}}</div>
                    <div>价格：{{tableData[index1*4+index2].foodPrice}}</div>
                    <div class="bottom clearfix">
                        <el-button type="text" class="button">操作按钮</el-button>
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
        created(){
             // this.getFoodList()
        },
        mounted(){
            this.getFoodNum()
        },
        methods:{
            getFoodList(){
                let path = `http://localhost:8082/mealManage/selectAll`
                this.$ajax.post(path).then(res=>{
                    this.tableData = res.data
                })
            },
            getFoodNum(){
                let path = `http://localhost:8082/mealManage/getFoodNum`
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
                this.getFoodList()
            }

        },
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
                options3:[],
                value1: [],
                value2: [],
                value3: [],
                value4: [],
                foodName: [],
                tableData:{},
                number:0,
                foodRow:0

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
        width: 100%;
        height: 100%;
        display: block;
    }
</style>

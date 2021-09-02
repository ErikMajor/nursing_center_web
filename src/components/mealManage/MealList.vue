<template>
    <div class="class-table">
        <div class="table-wrapper">
            <div class="tabel-container">
                <el-select v-model="value" clearable placeholder="请选择周期" style="margin-left: 27%;margin-top: 10px">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="value1" clearable placeholder="请选择时间段" style="margin-left: 20px">
                    <el-option
                            v-for="item in options1"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button @click="gain(value,value1)" icon="el-icon-search" circle style="margin-left: 20px"></el-button>
                <el-button @click="detail(value,value1)" icon="el-icon-circle-plus" type="primary" circle style="margin-left: 20px"></el-button>
                <table style="margin-top: 20px">
                    <thead>
                    <tr>
                        <th style="width:50px;">时间</th>
                        <th v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">{{lesson}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(weekNum, weekIndex) in classTableData.weeks" :key="weekIndex">
                        <td>
                            <p>{{weekNum}}</p>
                        </td>
                        <td class="courses" v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">

                            <div v-if="weekNum===row&&lesson===col">
                                <el-row class="h2" v-for="(m, index1) in foodRow" :key="index1" style="margin-top: 50px">
                                    <el-col class="h3" :span="8" v-for="(o, index2) in 2" :key="index2" :offset="index2 > 0 ? 2 : 0">
                                        <el-card :body-style="{padding: '0px'}"  v-if="number > (index1*4+index2)">
                                            <div v-if="tableData[index1*4+index2].foodPicture">
                                                <img :src="`http://localhost:8081/${tableData[index1*4+index2].foodPicture}`" class="image"/>
                                            </div>
                                            <div>名称：{{tableData[index1*4+index2].foodName}}</div>
                                            <div>价格：{{tableData[index1*4+index2].foodPrice}}</div>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </div>

                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                options: [{
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
                options1: [{
                    value: '早餐',
                    label: '早餐'
                }, {
                    value: '午餐',
                    label: '午餐'
                }, {
                    value: '晚餐',
                    label: '晚餐'
                },],
                value:'',
                value1:'',
                customerId:'',
                row:'',
                col:'',
                tableData:{},
                number:0,
                foodRow:0,
                array:{
                    customerId:'',
                    foodWeek:'',
                    foodDate:''
                },
                classTableData: {
                    lessons: [
                        '早餐',
                        '午餐',
                        '晚餐'
                    ],
                    weeks: [
                        '周一',
                        '周二',
                        '周三',
                        '周四',
                        '周五',
                        '周六',
                        '周日',
                    ],

                }

            };
        },
            mounted(){
                this.customerId = this.$route.params.id
            },
            methods: {
                gain(r, c) {
                    let path = 'http://localhost:8081/mealManage/getMealNum'
                    this.row = r
                    this.col = c
                    this.array.foodWeek = r
                    this.array.foodDate = c
                    this.array.customerId = this.$route.params.id
                    this.getPicture()
                    console.log(this.array)
                    this.$ajax.post(path, this.array).then(res => {
                        this.number = res.data
                        if (this.number < 4)
                            this.foodRow = 1;
                        else if (this.number % 4 === 0) {
                            this.foodRow = this.number / 4;
                        } else {
                            this.foodRow = parseInt((this.number / 4).toString()) + 1;
                        }


                    })


                },
                detail(row,col){
                    this.$router.push({
                        path:`/main/mealCanlender`,
                        query:{
                            row: row,
                            col: col,
                            customerId: this.customerId
                        }
                })

                },
                getPicture() {
                    let path = `http://localhost:8081/mealManage/selectMealMessage`
                    this.$ajax.post(path, this.array).then(res => {
                        this.tableData = res.data
                        console.log(this.tableData)
                    })

                }
            }


    };
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .table-wrapper {
        width: 100%;
        overflow: auto;
        margin-bottom: 60px;
    }
    table {
        table-layout: fixed;
        width: 100%;
    }

    thead {
        background-color: #547c99;
    }
    th {
        color: #fff;
        line-height: 15px;
        font-weight: normal;
    }
    tbody {
        background-color: #f9f9f9;
    }
    td {
        color: #677998;
        line-height: 15px;
    }
    th, td {
        padding: 8px 2px;
        font-size: 15px;
        text-align: center;
    }
    tbody tr:nth-child(2n){
        background-color: #ecf4f4;
    }

    tr td:first-child {
        color: #333;
    }
    .course{
        background-color: #ebbbbb;
        color: #fff;
        display: inline-block;
        border-radius: 3px;
        width: 47%;
        margin: 1px 1%;
    }
    .bgColor{
        background-color: #89B2E5;
    }
    .image{
        width: 100%;
        height: 100%;
    }
</style>

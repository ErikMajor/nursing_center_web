<template>
    <div class="class-table">
        <div class="table-wrapper">
            <div class="tabel-container">
                <table>
                    <thead>
                    <tr>
                        <th style="width:50px;">时间</th>
                        <th v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">{{lesson}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <!--<tr v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">-->
                    <tr v-for="(weekNum, weekIndex) in classTableData.weeks" :key="weekIndex">
                        <td>
                            <p>{{'周' + weekNum}}</p>
                        </td>
                        <td class="courses" v-for="(lesson, lessonIndex) in classTableData.lessons" :key="lessonIndex">
                            <div  v-for="(course, courseIndex) in classTableData.courses[weekIndex][lessonIndex]" :class="{bgColor:courseIndex%2===1}" :key="courseIndex" class="course" @click="detail">
                                <p style="font-size: 11px;">{{course}}</p>
                                <p style="font-size: 8px;color: #eee">8:00-9:30</p>
                            </div>
                            <!--{{classTableData.courses[courseIndex][weekIndex] || '-'}}-->
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { Dialog } from 'vant';
    export default {
        data() {
            return {
                classTableData: {
                    lessons: [
                        '上午',
                        '下午',
                        '晚上'
                    ],
                    weeks: [
                        '六',
                        '日',
                        '一',
                        '二',
                        '三',
                        '四',
                        '五'
                    ],
                    courses: [
                        [[], [], []],
                        [['生物','地理','化学'], ['物理'],[]],
                        [[], [], []],
                        [['生物'], ['物理','生物'], ['化学']],
                        [[], [], []],
                        [['生物'], ['物理'], ['化学']],
                        [[], ['地理','化学'], []],
                    ]
                }

            };
        },
        methods: {
            detail(){
                Dialog.alert({
                    title: '硬笔书法',
                    message: '周日 上午 8:00-9:30<br/>主讲教师：张三'
                }).then(() => {
                    // on close
                });
            }
        }
    }
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
</style>

<template>
    <div>
        <!--<img :src="logo" width="800" height="200"/>-->
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <el-button type="primary" @click="handleExport">导出</el-button>
        <el-button type="primary" @click="handleImport">导入</el-button>
        <el-table
                v-loading="loading"
                :data="pageInfo.list"
                :stripe=stripe
                :border=border
                style="width: 100%"
                class="tab">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="招聘人数">
                            <span>{{ props.row.number }}</span>
                        </el-form-item>
                        <el-form-item label="工作地点">
                            <span>{{ props.row.workplace }}</span>
                        </el-form-item>
                        <el-form-item label="公司规模">
                            <span>{{ props.row.companyInfo.scale }}</span>
                        </el-form-item>
                        <el-form-item label="注册资金">
                            <span>{{ props.row.companyInfo.funds }}</span>
                        </el-form-item>
                        <el-form-item label="职位描述">
                            <span>{{ props.row.description }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="200">
                <template slot-scope="scope">
                    <div class="wrap">
                        <div>{{scope.row.name}}</div>
                        <div v-if="scope.row.photo">
                            <img :src="`http://localhost:8081/${scope.row.photo}`" class="image"/>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                    prop="companyInfo.name"
                    label="公司名称"
                    width="180">
            </el-table-column>
            <el-table-column label="性别" width="50">
                <template slot-scope="scope">
                    <!--{{scope.row.sex==='0'?'男':'女'}}-->
                    {{scope.row.sex|formatSex}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    width="50">
                <template slot-scope="scope">
                    <!--{{scope.row.sex==='0'?'男':'女'}}-->
                    {{scope.row.sex|formatSex}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="员工类别"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="salary"
                    label="薪水"
                    width="180">
            </el-table-column>
            <el-table-column label="是否热门">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.isHot"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="1"
                            inactive-value="0"
                            @change="handleChange(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="发布时间">
                <template slot-scope="scope">
                    {{scope.row.addDate|convertDate}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row.id)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="total,prev, pager, next"
                :total="pageInfo.total"
                :page-size="pageInfo.pageSize"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
    import {makeDate} from '../../common/js/dateformat'
    export default {
        name: "User",
        data(){
            return{
                // logo: require('../../assets/965_60.jpg'),
                stripe: true,
                border: true,
                loading: false,
                currPage: 1,
                formInline: {
                    name: '',
                    companyInfo: {
                        name: ''
                    }
                },
                pageInfo: {}
            }
        },
        created(){
            this.getData()
        },
        methods: {
            getData(){
                let path = `http://localhost:8081/post/query/${this.currPage}`
                this.$ajax.post(path,this.formInline).then(res=>{
                    this.pageInfo = res.data
                    console.log(this.pageInfo)
                })
            },
            handleAdd(){
                this.$router.push('/main/postAdd')
            },
            handleCurrentChange(val){
                this.currPage = val
                this.getData()
            },
            handleChange(row){
                console.log(row)
                let path = 'http://localhost:8081/post/update'
                this.$ajax.post(path,row).then(res=>{
                    console.log(res)
                })
            },
            handleExport(){
                let path = 'http://localhost:8081/post/exportExcel'
                window.open(path)
            },
            handleImport(){
                this.$router.push("/main/postImport")
            }
        },
        filters: { //过滤器
            //格式化性别
            formatSex(val){
                let sex=  ''
                switch(val){
                    case '0':
                        sex = '男'
                        break;
                    case '1':
                        sex = '女'
                        break;
                    case '2':
                        sex= '不限'
                        break;
                }
                return sex
            },
            //格式化日期
            convertDate(val){
                return makeDate(val)
            }
        }
    }
</script>

<style scoped>
    .header {
        margin-bottom: 10px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .image {
        width: 48px;
        height: 48px;
    }
</style>
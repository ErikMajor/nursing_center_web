<template>
    <div>
        <el-table
                v-loading="loading"
                :data="pageInfo.list"
                :stripe=stripe
                :border=border
                style="width: 100%"
                class="tab">
            <el-table-column
                    label="姓名"
                    width="200">
                <template slot-scope="scope">
                    <div class="wrap">
                        <div>{{scope.row.name}}</div>
                    </div>
                </template>
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
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="员工类别"
                    width="50">
            </el-table-column>
            <el-table-column label="入职时间">
                <template slot-scope="scope">
                    {{scope.row.create_date|convertDate}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="职务"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="职称"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="手机号码"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="简介"
                    width="50">
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
            //编辑
            handleEdit(row) {
                this.formTitle = "更新护理等级"
                this.dialogVisible = true
                this.ruleForm.id = row.id
                this.ruleForm.createBy = row.createBy
                this.ruleForm.createDate = row.createDate
                this.ruleForm.updateBy = row.updateBy
                this.ruleForm.updateDate = row.updateDate
                this.ruleForm.levelName = row.levelName
                this.ruleForm.levelStatus = row.levelStatus
            },
            //删除

            handleDelete(id){
                let path = `http://localhost:8081/nursingLevel/del/${id}`
                this.$ajax.get(path).then(res=>{
                    if(res.data.status === 200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    this.currPage = 1
                    this.getData()
                })
            },
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
                        sex= '未知'
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
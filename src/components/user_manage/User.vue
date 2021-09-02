<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="用户信息">
                <el-input v-model="formInline.staffName" placeholder="用户信息"></el-input>
            </el-form-item>
        </el-form>

        <el-table
                v-loading = "loading"
                :data="pageInfo.list"
                style="width: 100%">
            <el-table-column
                    type="index"
                    width="50">
            </el-table-column>
            <el-table-column
                    label="姓名"
                    width="100px"
                    prop="staffName">
            </el-table-column>
            <el-table-column label="是否启用">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.levelStatus"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="1"
                            inactive-value="2"
                            @change="handleChange(scope.row)">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                    label="创建者"
                    width="120px"
                    prop="createBy">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    width="200px">
                <template slot-scope="scope">
                    {{scope.row.createDate|convertDate}}
                </template>
            </el-table-column>
            <el-table-column
                    label="更新者"
                    width="120px"
                    prop="updateBy">
            </el-table-column>
            <el-table-column
                    label="更新时间"
                    width="200px">
                <template slot-scope="scope">
                    {{scope.row.updateDate|convertDate}}
                </template>
            </el-table-column>
            <el-table-column
                    label="性别"
                    width="120px"
                    prop="staffSex">
            </el-table-column>
            <el-table-column
                    label="年龄"
                    width="120px"
                    prop="staffAge">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>



        <el-pagination
                background
                layout="total, prev, pager, next"
                :total="pageInfo.total"
                :page-size="pageInfo.pageSize"
                @current-change="handleCurrentChange"
                class="page">
        </el-pagination>


        <el-dialog
                :title="formTitle"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="addHandleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="dialogVisible">
                <el-form-item label="护理级别" prop="levelName">
                    <el-input v-model="ruleForm.levelName"></el-input>
                </el-form-item>
                <el-form-item label="是否启用" prop="levelStatus">
                    <el-switch
                            v-model="ruleForm.levelStatus"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="1"
                            inactive-value="0">
                    </el-switch>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    //引入日期格式化包
    import {makeDate} from '../../common/js/dateformat'
    export default {
        data() {
            return {
                pageInfo:[],
                loading:false,
                dialogVisible:false,
                currPage:1,
                search: '',
                formInline:{
                    staffName:''
                },
                formTitle:'',
                ruleForm: {
                    id:'',
                    createBy:'',
                    createDate:'',
                    updateBy:'',
                    updateDate:'',
                    staffName:'',
                    staffSex:'',
                    staffAge:'',
                    levelStatus:false
                },
                rules: {
                    staffName: [
                        { required: true, message: '请输入护理级别名称', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData(){
                this.loading = true
                let path = `http://localhost:8081/userManage/selAll/${this.currPage}`
                this.$ajax.post(path,this.formInline).then(res=>{
                    this.pageInfo = res.data
                    this.loading = false
                    console.log(this.pageInfo)
                })
            },
            //编辑
            handleEdit(row) {
                this.formTitle = "更新用户信息"
                this.dialogVisible = true
                this.ruleForm.id = row.id
                this.ruleForm.createBy = row.createBy
                this.ruleForm.createDate = row.createDate
                this.ruleForm.updateBy = row.updateBy
                this.ruleForm.updateDate = row.updateDate
                this.ruleForm.staffName = row.staffName
                this.ruleForm.staffSex = row.staffSex
                this.ruleForm.staffAge = row.staffAge
            },
            //删除

            handleDelete(id){
                let path = `http://localhost:8081/userMange/del/${id}`
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
            //分页查询
            handleCurrentChange(val) {
                this.currPage = val
                console.log(val)
                this.getData()
            },
            //switch开关
            handleChange(row){
                console.log(row)
                let path = 'http://localhost:8081/userManage/update'
                this.$ajax.post(path,row).then(res=>{
                    console.log(res)
                })
            },
            //关闭新增护理等级弹窗
            addHandleClose(){
                this.dialogVisible = false
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid && this.formTitle === "更新用户信息") {
                        let path = 'http://localhost:8081/userManage/update'
                        this.$ajax.post(path,this.ruleForm).then(res=>{
                            if(res.data.status === 200){
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }
                            this.dialogVisible = false
                            this.getData()
                        })
                    } else {
                        this.$message.error('修改失败');
                        return false;
                    }
                });
            },

            resetForm(formName) {
                this.$nextTick(()=>{
                    this.$refs[formName].resetFields();
                })
            },
        },
        filters: { //过滤器
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
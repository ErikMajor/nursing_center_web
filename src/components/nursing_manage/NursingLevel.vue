<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="护理级别">
                <el-input v-model="formInline.levelName" placeholder="护理级别"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="primary" @click="handleAdd">新增护理等级</el-button>
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
                    label="护理级别"
                    width="100px"
                    prop="levelName">
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
                    levelName:''
                },
                formTitle:'',
                ruleForm: {
                    id:'',
                    createBy:'',
                    createDate:'',
                    updateBy:'',
                    updateDate:'',
                    levelName:'',
                    levelStatus:false
                },
                rules: {
                    levelName: [
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
                let path = `http://localhost:8081/nursingLevel/queryAll/${this.currPage}`
                this.$ajax.post(path,this.formInline).then(res=>{
                    this.pageInfo = res.data
                    this.loading = false
                    console.log(this.pageInfo)
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
            //增加
            handleAdd(){
                // this.$router.push('/main/nursingLevelAdd')
                this.ruleForm.id = '',
                this.ruleForm.createBy='',
                this.ruleForm.createDate='',
                this.ruleForm.updateBy='',
                this.ruleForm.updateDate='',
                this.ruleForm.levelName='',
                this.ruleForm.levelStatus=1,

                this.dialogVisible = true
                this.formTitle = '新增护理等级'
                this.resetForm('ruleForm')
            },
            //分页查询
            handleCurrentChange(val) {
                this.currPage = val
                console.log(val)
                this.getData()
            },
            //条件查询
            handleSearch(){
                this.currPage = 1
                this.getData()
            },
            //switch开关
            handleChange(row){
                console.log(row)
                let path = 'http://localhost:8081/nursingLevel/update'
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
                    if (valid && this.formTitle === "新增护理等级") {
                        let path = 'http://localhost:8081/nursingLevel/add'
                        this.$ajax.post(path,this.ruleForm).then(res=>{
                            if(res.data.status === 200){
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            }
                            this.dialogVisible = false
                            this.getData()
                        })
                    }else if (valid && this.formTitle === "更新护理等级") {
                        let path = 'http://localhost:8081/nursingLevel/update'
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

    .page{
        text-align: center;
    }
</style>
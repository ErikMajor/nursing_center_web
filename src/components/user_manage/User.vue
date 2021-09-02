<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="用户信息">
                    <el-input style="margin-left: 10px;float: left;width: 150px" v-model="staffName" placeholder="请输入用户姓名"></el-input>
                    <el-button type="primary" style="margin-left: 10px;" @click="queryUser">查询</el-button>
                    <el-button type="primary" style="margin-left: 10px;" @click="getAllCustomer">所有客户</el-button>
                </el-form-item>
            </el-form>

            <el-table
                    v-loading = "loading"
                    :data="pageInfo"
                    style="width: 100%">
    <!--            <el-table-column-->
    <!--                    type="index"-->
    <!--                    width="50">-->
    <!--            </el-table-column>-->
                <el-table-column
                        label="姓名"
                        width="100px"
                        prop="staffName">
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
                        label="操作"
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
        </el-card>


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
                <el-form-item label="用户姓名" prop="staffName">
                    <el-input v-model="ruleForm.staffName"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="staffSex">
                    <el-input v-model="ruleForm.staffSex"></el-input>
<!--                    <el-select v-model="value" clearable placeholder="请选择" style="width: 100%">-->
<!--                        <el-option-->
<!--                                v-for="item in options"-->
<!--                                :key="item.value"-->
<!--                                :label="item.label"-->
<!--                                :value="item.value">-->
<!--                        </el-option>-->
<!--                    </el-select>-->
                </el-form-item>
                <el-form-item label="年龄" prop="staffAge">
                    <el-input v-model="ruleForm.staffAge"></el-input>
                </el-form-item>
                <el-form-item >
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
                array:{
                    id:''
                },
                loading:false,
                dialogVisible:false,
                currPage:1,
                search: '',
                formInline:{
                    id:'',
                    createBy:'',
                    createDate:'',
                    updateBy:'',
                    updateDate:'',
                    staffName:'',
                    staffSex:'',
                    staffAge:'',
                    staffNumber:'',
                    staffType:'',
                    phoneNumber:''
                },
                formTitle:'',
                ruleForm: {
                    id:'',
                    createBy:'',
                    createDate:'',
                    updateBy:'',
                    staffName:'',
                    staffSex:'',
                    staffAge:'',
                    staffNumber:'',
                    staffType:'',
                    phoneNumber:''
                },
                options: [{
                    value: '男',
                    label: '男',

                }, {
                    value: '女',
                    label: '女',
                }],
                staffName:'',
                staffSex:''
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData(){
                this.loading = true
                let path = `http://localhost:8081/userManage/selectAll`
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
                this.ruleForm.staffNumber = row.staffName
                this.ruleForm.staffType = row.staffType
                this.ruleForm.phoneNumber = row.phoneNumber
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
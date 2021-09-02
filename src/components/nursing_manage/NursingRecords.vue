<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="客户姓名">
                <el-input v-model="formInline.checkin.customerName" placeholder="客户姓名"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名">
                <el-input v-model="formInline.userManage.staffName" placeholder="员工姓名"></el-input>
            </el-form-item>
            <el-form-item label="时间">
            <div class="block">
                <el-date-picker
                        v-model="formInline.nursingTime"
                        type="date"
                        format="yyyy-MM-dd"
                        placeholder="选择日期"
                        :value-format="formInline.nursingTime">
                </el-date-picker>
            </div>
            </el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="primary" @click="handleAdd">新增护理项目</el-button>
        </el-form>

        <el-table
                v-loading = "loading"
                :data="pageInfo.list"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="创建者">
                            <span>{{ props.row.createBy }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间">
                            <span>{{ props.row.createDate|convertDate}}</span>
                        </el-form-item>
                        <el-form-item label="更新者">
                            <span>{{ props.row.updateBy }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间">
                            <span>{{ props.row.updateDate|convertDate }}</span>
                        </el-form-item>
                        <el-form-item label="客户编号">
                            <span>{{ props.row.checkin.id}}</span>
                        </el-form-item>
                        <el-form-item label="客户年龄">
                            <span>{{ props.row.checkin.customerAge}}</span>
                        </el-form-item>
                        <el-form-item label="客户性别">
                            <span>{{ props.row.checkin.customerSex}}</span>
                        </el-form-item>
                        <el-form-item label="客户房间号">
                            <span>{{ props.row.checkin.roomId}}</span>
                        </el-form-item>
                        <el-form-item label="员工编号">
                            <span>{{ props.row.userManage.id}}</span>
                        </el-form-item>
                        <el-form-item label="员工类别">
                            <span>{{ props.row.userManage.staffType}}</span>
                        </el-form-item>
                        <el-form-item label="员工职务">
                            <span>{{ props.row.userManage.duty}}</span>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <span>{{ props.row.userManage.phoneNumber}}</span>
                        </el-form-item>
                        <el-form-item label="护理项目编号">
                            <span>{{ props.row.nursingContentItem.id}}</span>
                        </el-form-item>
                        <el-form-item label="护理项目名称">
                            <span>{{ props.row.nursingContentItem.nursingName}}</span>
                        </el-form-item>
                        <el-form-item label="价格">
                            <span>{{ props.row.nursingContentItem.servicePrice}}</span>
                        </el-form-item>
                        <el-form-item label="具体内容">
                            <span>{{ props.row.nursingContentItem.contentDescribe}}</span>
                        </el-form-item>
                        <el-form-item label="本次护理内容记录">
                            <span>{{ props.row.nursingContent}}</span>
                        </el-form-item>

                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="编号"
                    width="120px"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="客户姓名"
                    width="120px"
                    prop="checkin.customerName">
            </el-table-column>
            <el-table-column
                    label="员工姓名"
                    width="120px"
                    prop="userManage.staffName">
            </el-table-column>
            <el-table-column label="护理时间" width="200">
                <template slot-scope="scope">
                    <!--{{scope.row.sex==='0'?'男':'女'}}-->
                    {{scope.row.nursingTime|convertDate}}
                </template>
            </el-table-column>
            <el-table-column
                    label="梳理数量"
                    width="120px"
                    prop="nursingCount">
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
                width="40%"
                :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-if="dialogVisible">
                <el-form-item label="客户编号" prop="customerId">
                    <el-input v-model="ruleForm.customerId" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="员工编号" prop="staffnfoId">
                    <el-input  v-model="ruleForm.staffnfoId" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="护理项目" prop="contentId">
                    <el-select v-model="ruleForm.contentId" placeholder="请选择护理级别">
                        <el-option v-for="item in contentOpts" :key="item.id"
                                   :label="item.nursingName"
                                   :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="nursingTime">
                    <el-date-picker
                            v-model="ruleForm.nursingTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="护理数量" prop="nursingCount">
                    <el-input type="age" v-model.number="ruleForm.nursingCount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="本次护理内容" prop="nursingContent">
                    <el-input type="textarea" v-model="ruleForm.nursingContent"></el-input>
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
    import {makeDate} from "../../common/js/dateformat";

    export default {
        data() {
            return {
                pageInfo:[],
                currPage:1,
                loading:false,
                dialogVisible:false,
                dateTime:'',
                contentOpts:{},
                formTitle:'',
                formInline:{
                    checkin: {
                        customerName:'',
                    },
                    userManage:{
                        staffName:'',
                    },
                    nursingTime:'',
                },
                ruleForm:{
                    customerId:'',
                    contentId:'',
                    nursingTime:'',
                    nursingContent:'',
                    nursingCount:'',
                    staffnfoId:'',
                },
                rules: {
                    customerId: [
                        { required: true, message: '请输入客户编号', trigger: 'blur' },
                    ],
                    staffnfoId: [
                        { required: true, message: '请输入员工编号', trigger: 'blur' },
                    ],
                    contentId: [
                        { required: true, message: '请选择护理项目', trigger: 'change' }
                    ],
                    nursingCount:[
                        { required: true, message: '数量不能为空'},
                        { type: 'number', message: '数量必须为数字值'}
                    ],
                    nursingContent: [
                        { required: true, message: '请填写具体护理信息', trigger: 'blur' }
                    ]
                }

            }
        },
        created() {
            this.getData()
            this.getContentOpts()
        },
        methods: {
            getData(){
                this.loading = true
                let path = `http://localhost:8081/nursingRecords/queryAll/${this.currPage}`
                this.$ajax.post(path,this.formInline).then(res=>{
                    this.pageInfo = res.data
                    this.loading = false
                })
            },
            getContentOpts(){
                let path = `http://localhost:8081/nursingContent/selAll/`
                this.$ajax.get(path).then(res=>{
                    this.contentOpts = res.data
                    console.log(this.contentOpts)
                })
            },
            handleEdit(row) {
                this.formTitle = '护理记录编辑'
                this.dialogVisible = true
                this.ruleForm.id = row.id
                this.ruleForm.createBy = row.createBy
                this.ruleForm.createDate = row.createDate
                this.ruleForm.updateBy = row.updateBy
                this.ruleForm.updateDate = row.updateDate
                this.ruleForm.remarks = row.remarks
                this.ruleForm.delFlag = row.delFlag
                this.ruleForm.customerId = row.customerId,
                this.ruleForm.contentId = row.contentId,
                this.ruleForm.nursingTime= row.nursingTime
                this.ruleForm.nursingContent = row.nursingContent,
                this.ruleForm.nursingCount = row.nursingCount,
                this.ruleForm.staffnfoId = row.staffnfoId
            },
            handleDelete(id) {
                let path = `http://localhost:8081/nursingRecords/del/${id}`
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
            handleAdd(){
                this.ruleForm.id = '',
                this.ruleForm.customerId='',
                this.ruleForm.contentId='',
                this.ruleForm.nursingTime='',
                this.ruleForm.nursingContent='',
                this.ruleForm.nursingCount='',
                this.ruleForm.staffnfoId='',
                this.formTitle = '护理记录录入'
                this.dialogVisible = true
            },
            handleClose(){
                this.dialogVisible = false
            },
            //分页查询
            handleCurrentChange(val) {
                this.currPage = val
                this.getData()
            },
            //条件查询
            handleSearch(){
                this.currPage = 1
                this.getData()
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid&& this.formTitle === "护理记录录入") {
                        let path = 'http://localhost:8081/nursingRecords/add'
                        this.$ajax.post(path,this.ruleForm).then(res=>{
                            if(res.data.status === 200){
                                this.$message({
                                    message: '增加成功',
                                    type: 'success'
                                });
                            }
                            this.dialogVisible = false
                            this.getData()
                        })
                    } else if (valid && this.formTitle === "护理记录编辑"){
                            let path = 'http://localhost:8081/nursingRecords/update'
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
                    } else  {
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

</style>
<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="项目名称">
                <el-input v-model="formInline.nursingName" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="护理级别">
                <el-select v-model="formInline.levelId" placeholder="请选择护理级别">
                    <el-option v-for="item in levelOpts" :key="item.id"
                               :label="item.levelName"
                               :value="item.id"
                    />
                </el-select>
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
                        <el-form-item label="护理内容描述">
                            <span>{{ props.row.contentDescribe}}</span>
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
                    label="项目名称"
                    width="120px"
                    prop="nursingName">
            </el-table-column>
            <el-table-column
                    label="价格"
                    width="120px"
                    prop="servicePrice">
            </el-table-column>
            <el-table-column label="是否增值服务" width="200">
                <template slot-scope="scope">
                    <!--{{scope.row.sex==='0'?'男':'女'}}-->
                    {{scope.row.incrementFlag|formatIncrement}}
                </template>
            </el-table-column>
            <el-table-column
                    label="护理级别"
                    width="120px">
                <template slot-scope="scope">
                    <!--{{scope.row.sex==='0'?'男':'女'}}-->
                    {{scope.row.nursingLevel.levelName}}
                </template>
            </el-table-column>
            <el-table-column label="是否启用">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.contentStatus"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="1"
                            inactive-value="2"
                            @change="handleChange(scope.row)">
                    </el-switch>
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
                title="护理项目编辑"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="addHandleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-if="dialogVisible">
                <el-form-item label="护理名称" prop="nursingName">
                    <el-input v-model="ruleForm.nursingName"></el-input>
                </el-form-item>
                <el-form-item label="价格" prop="servicePrice">
                    <el-input v-model="ruleForm.servicePrice" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                </el-form-item>
                <el-form-item label="护理级别" prop="levelId">
                    <el-select v-model="ruleForm.levelId" placeholder="请选择护理级别">
                        <el-option v-for="item in levelOpts" :key="item.id"
                                   :label="item.levelName"
                                   :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="内容描述" prop="contentDescribe">
                    <el-input type="textarea" v-model="ruleForm.contentDescribe"></el-input>
                </el-form-item>
                <el-form-item label="增值服务" prop="incrementFlag">
                    <template>
                        <el-radio-group v-model="ruleForm.incrementFlag">
                        <el-radio  label="1">是</el-radio>
                        <el-radio  label="2">否</el-radio>
                        </el-radio-group>
                    </template>
                </el-form-item>
                <el-form-item label="是否启用" prop="contentStatus">
                    <el-switch
                            v-model="ruleForm.contentStatus"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            active-value="1"
                            inactive-value="2">
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
                //列表信息
                pageInfo:[],
                //级别信息
                levelOpts: [],
                loading:false,
                currPage:1,

                //条件查询表单
                formInline:{
                    levelName:'',
                    nursingLevel: {
                    }
                },
                //护理项目表单
                ruleForm:{
                    nursingName:'',
                    servicePrice:'',
                    contentDescribe:'',
                    incrementFlag:'',
                    contentStatus:'',
                    levelId:'',
                },

                dialogVisible:false,
                rules: {
                    nursingName: [
                        { required: true, message: '请输入项目名称', trigger: 'blur' },
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
                    ],
                    servicePrice: [
                        { required: true, message: '请输入价格', trigger: 'blur' },
                    ],
                    contentDescribe: [
                        { required: true, message: '请填写详细护理内容', trigger: 'blur' }
                    ],
                    incrementFlag:[
                        { required: true, message: '请选择是否为增值服务', trigger: 'change' }
                    ],
                    levelId:[
                        { required: true, message: '请选择护理级别', trigger: 'change' }
                    ],
                }
            }
        },
        created() {
            this.getData()
            this.getLevelOpts()
        },
        methods: {
            //获取护理内容
            getData(){
                this.loading = true
                let path = `http://localhost:8081/nursingContent/queryAll/${this.currPage}`
                this.$ajax.post(path,this.formInline).then(res=>{
                    this.pageInfo = res.data
                    this.loading = false
                })
            },
            //获取护理级别选项
            getLevelOpts(){
                let path = 'http://localhost:8081/nursingLevel/selAll'
                this.$ajax.get(path).then(res=>{
                    this.levelOpts = res.data
                })
            },
            //编辑
            handleEdit(row) {
                this.ruleForm.id = row.id
                this.ruleForm.createBy = row.createBy
                this.ruleForm.createDate = row.createDate
                this.ruleForm.updateBy = row.updateBy
                this.ruleForm.updateDate = row.updateDate
                this.ruleForm.nursingName = row.nursingName
                this.ruleForm.servicePrice = row.servicePrice
                this.ruleForm.contentDescribe = row.contentDescribe
                this.ruleForm.incrementFlag = row.incrementFlag
                this.ruleForm.contentStatus = row.contentStatus
                this.ruleForm.levelId = row.levelId
                this.dialogVisible = true
            },
            //删除

            handleDelete(id){
                let path = `http://localhost:8081/nursingContent/del/${id}`
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
                this.$router.push('/main/nursingContentAdd')
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
            //switch开关
            handleChange(row){
                let path = 'http://localhost:8081/nursingContent/update'
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
                    if (valid) {
                        let path = 'http://localhost:8081/nursingContent/update'
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
            //格式化是否为增值服务
            formatIncrement(val){
                let increment=  ''
                switch(val){
                    case '1':
                        increment = '是'
                        break;
                    case '2':
                        increment= '否'
                        break;
                }
                return increment
            },
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
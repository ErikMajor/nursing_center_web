<template>
    <div  class="post-add">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="header">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/nursingContent' }">护理内容管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增护理项目</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>新增护理项目</span>
            </div>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="项目名称" prop="nursingName">
                        <el-input v-model="ruleForm.nursingName"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="servicePrice">
                        <el-input v-model="ruleForm.servicePrice" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item label="内容描述" prop="contentDescribe">
                        <el-input type="textarea" v-model="ruleForm.contentDescribe"></el-input>
                    </el-form-item>
                    <el-form-item label="护理级别" prop="levelId">
                        <el-select v-model="ruleForm.levelId" placeholder="请选择护理级别">
                            <el-option v-for="item in levelOpts" :key="item.id"
                                       :label="item.levelName"
                                       :value="item.id"
                            />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="增值服务" prop="incrementFlag">
                        <template>
                            <el-radio-group v-model="ruleForm.incrementFlag">
                            <el-radio label="1">是</el-radio>
                            <el-radio label="2">否</el-radio>
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
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import ElOption from "element-ui/packages/select/src/option";

    export default {
        components: {ElOption},
        data(){
            return {
                ruleForm: {
                    nursingName:'',
                    servicePrice:'',
                    contentDescribe:'',
                    incrementFlag:'',
                    contentStatus:'',
                    levelId:''
                },
                levelOpts: [],
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
        created(){
            this.getLevelOpts()
        },
        methods: {
            //取所有的护理等级信息
            getLevelOpts(){
                let path = 'http://localhost:8081/nursingLevel/selAll'
                this.$ajax.get(path).then(res=>{
                    this.levelOpts = res.data
                })
            },

            submitForm(formName){

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let path = 'http://localhost:8081/nursingContent/add'
                        this.$ajax.post(path,this.ruleForm).then(res=>{
                            if(res.data.status === 200){
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                            }
                        })
                    } else {
                        this.$message.error('提交失败');
                        return false;
                    }
                });
            },
            //上传成功回调的方法
            handleAvatarSuccess(res) {
                console.log(res)
                this.ruleForm.photo = res
            },
            //图片上传之前触发的方法
            beforeAvatarUpload(file) {
                console.log(file.type)
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/webp' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG、WEBP、PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
    .post-add {
        padding: 10px;
    }
    .header {
        margin-bottom: 10px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 146px;
        height: 146px;
        line-height: 146px;
        text-align: center;
    }
    .avatar {
        width: 146px;
        height: 146px;
        display: block;
    }
    .el-breadcrumb {
        margin-bottom: 10px;
    }
</style>
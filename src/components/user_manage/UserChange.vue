<template>
    <div  class="post-add">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>修改用户信息</span>
            </div>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                            <el-option label="空" value="2"></el-option>
                        </el-select>
                    </el-form-item>
<!--                    <el-form-item label="学历要求" prop="funds">-->
<!--                        <el-select v-model="ruleForm.education" placeholder="请选择学历">-->
<!--                            <el-option label="专科" value="专科"></el-option>-->
<!--                            <el-option label="本科" value="本科"></el-option>-->
<!--                            <el-option label="研究生" value="研究生"></el-option>-->
<!--                            <el-option label="不限" value="不限"></el-option>-->
<!--                        </el-select>-->
<!--                    </el-form-item>-->
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="ruleForm.salary"></el-input>
                    </el-form-item>
                    <el-form-item label="员工类别" prop="type">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职务" prop="duty">
                        <el-input v-model="ruleForm.type"></el-input>
                    </el-form-item>
                    <el-form-item label="职称" prop="title">
                        <el-input v-model="ruleForm.type"></el-input>
                    </el-form-item>
                    <el-form-item label="员工类别" prop="type">
                        <el-input v-model="ruleForm.type"></el-input>
                    </el-form-item>
                    <el-form-item label="简介" prop=" brief">
                        <el-input type="textarea" rows="5" v-model="ruleForm.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    import ElOption from "element-ui/packages/select/src/option";

    export default {
        name: "UserAdd",
        components: {ElOption},
        data(){
            return {
                ruleForm: {
                    companyId: '',     //公司
                    name: '',          //职位名称
                    number: '',        //招聘人数
                    sex: '',           //性别
                    education: '',    //学历
                    salary: '',       //薪水
                    workplace: '',   //工作地点
                    photo: '',        //照片
                    description: '', //描述
                },
                companyOpts: []
            }
        },
        created(){
            this.getCompanyInfo()
        },
        methods: {
            //取所有的公司信息
            getCompanyInfo(){
                let path = 'http://localhost:8081/company/selAll'
                this.$ajax.get(path).then(res=>{
                    this.companyOpts = res.data
                })
            },
            submitForm(){
                let path = 'http://localhost:8081/post/add'
                this.$ajax.post(path,this.ruleForm).then(res=>{
                    if(res.data.status === 200){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }
                })
            },
            //上传成功回调的方法
            handleAvatarSuccess(res) {
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
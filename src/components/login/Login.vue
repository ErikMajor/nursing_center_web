<template>
    <div>
        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="staffNumber">
                    <el-input v-model="ruleForm.staffNumber"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="phoneNumber">
                    <el-input type="password" v-model="ruleForm.phoneNumber"></el-input>
                </el-form-item>
                <el-form-item label="员工类型" prop="staffType">
                    <el-select v-model="value" placeholder="请选择员工类别">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button type="primary" @click="registerForm()">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                ruleForm: {
                    staffNumber: '', //用户名
                    phoneNumber: '',  //密码
                    staffType:''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' },
                        { min: 3, max: 6, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                },
                options: [{
                    value: '护士',
                    label: '护士'
                }, {
                    value: '清洁工',
                    label: '清洁工'
                }],
                value: ''
                }
        },
        components: {
        },
        created(){

        },
        methods: {
            submitForm() {
                this.ruleForm.staffType = this.value
                let path = `http://localhost:8081/userManage/login`
                this.$ajax.post(path,this.ruleForm).then(res=>{
                    console.log(res.data)
                    if(res.data.state === 'success') {
                        this.$message({
                            message: "登陆成功",
                            type: "success",

                        })
                        this.$router.push("/main")
                    }
                    else{
                        this.$message({
                            message: "用户名，密码或员工类型错误",
                            type: "fail",

                        })
                    }
                })

            },
            registerForm(){
                this.$router.push("/register")
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 600px;
        margin: 50px auto;
        text-align: center;
    }
</style>

<template>
    <div>
        <el-card class="box-card">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="ruleForm.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
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
                    username: '', //用户名
                    password: ''  //密码
                },
                    rules: {
                        username: [
                            { required: true, message: '请输入用户名', trigger: 'blur' },
                        ],
                        password: [
                            { required: true, message: '请输入密码', trigger: 'change' },
                            { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                        ],
                    }
                }
        },
        components: {
        },
        created(){

        },
        methods: {
            submitForm(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         let path = 'http://localhost:8081/user/login'
                //         this.$ajax.post(path,this.ruleForm).then(res=>{
                //             console.log(res.data)
                //             switch (res.data.status){
                //                 case 0:
                //                     this.$message.error('用户名不存在!');
                //                     break;
                //                 case 1:
                //                     this.$message.error("密码错误")
                //                     break;
                //                 case 2:
                //                     //把user对象转成字符串存入sessionStorage
                //                     //sessionStorage.setItem("user",JSON.stringify(res.data.obj))
                //                     //调用action中setUser方法,保存用户对象到state中
                //                     //保存用户到vuex中
                //                     this.$store.dispatch('setUser',res.data.obj)
                //                     this.$router.push("/main")
                //                     break;
                //             }
                //         })
                //     }
                // });
                console.log(formName)
                this.$router.push("/main")
            },
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
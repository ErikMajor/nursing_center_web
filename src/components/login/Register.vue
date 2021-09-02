
<template>
    <div style="margin-top: 5%;text-align: center;width: 100%" >
        <el-form :model="ruleForm" status-icon ref="ruleForm" :rules="ruleFormRules" label-width="100px" class="demo-ruleForm" style="width: 100%">
            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%" >
                    <div class="grid-content">
                        <el-form-item label="员工号" prop="staffNumber" >
                            <el-input type="text" id="card_no" suffix-icon="el-icon-s-custom" v-model="ruleForm.staffNumber" autocomplete="off" onchange="checkCard"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col style="margin-left:5%;width: 45%">
                    <el-form-item label="密码" prop="phoneNumber">
                        <el-input type="password" suffix-icon="el-icon-s-custom" v-model="ruleForm.phoneNumber" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row  style="width: 100%">
                <el-col style="margin-left:1%;width: 45%">
                    <el-form-item label="姓名" prop="staffName">
                        <el-input type="text" suffix-icon="el-icon-s-custom" v-model="ruleForm.staffName" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col style="margin-left:5%;width: 45%">
                    <el-form-item label="性别" prop="staffSex" >
                        <el-select v-model="value" clearable placeholder="请选择" style="width: 100%">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row style="width: 100%">
                <el-col style="margin-left:1%;width: 45%">
                    <el-form-item label="员工类别" prop="staffType" >
                        <el-select v-model="value1" clearable placeholder="请选择" style="width: 100%">
                            <el-option
                                    v-for="item in options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col style="margin-left:5%;width: 45%">
                    <el-form-item label="年龄" prop="staffAge">
                        <el-input type="text" suffix-icon="el-icon-magic-stick" v-model="ruleForm.staffAge" autocomplete="off"></el-input>
                    </el-form-item>
                </el-col>
            </el-row >
            <el-button @click="register">注册</el-button>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {

            return {
                ruleFormRules: {
                    // userIdCard: [
                    //     { required: true, message: '身份证号不能为空', trigger: 'blur' },
                    //     { validator: this.checkCard, trigger: 'blur' }
                    // ],
                    // userPhone: [
                    //     {required: true, message: '手机号不能为空', trigger: 'blur'},
                    //     { validator: this.checkPhone, trigger: 'blur' }
                    // ]
                },
                ruleForm: {
                    staffNumber:'',
                    phoneNumber:'',
                    staffName:'',
                    staffSex:'',
                    staffType:'',
                    staffAge:''

                },
                options: [{
                    value: '男',
                    label: '男',

                }, {
                    value: '女',
                    label: '女',
                }],
                options1: [{
                    value: '护士',
                    label: '护士',

                }, {
                    value: '清洁工',
                    label: '清洁工',
                }],
                value: '',
                value1:'',
            };
        },
        methods: {
            register(){
                this.ruleForm.staffSex = this.value
                this.ruleForm.staffType = this.value1
                let path = `http://localhost:8081/userManage/register`
                this.$ajax.post(path,this.ruleForm).then(res=>{
                    if (res.data.state === "success") {
                        this.$message({
                            message: "恭喜你注册成功",
                            type: "success",

                        })
                    }
                })
            }
        }
    }
</script>
<style>
    .el-row{
        margin-bottom: 10px;
    }
    .el-col {
        border-radius: 2px;
    }
    .grid-content {
        border-radius: 10px;
        min-height: 30px;
    }
</style>

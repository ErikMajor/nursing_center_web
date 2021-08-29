<template>
    <el-form ref="form" :model="form" label-width="auto" >
        <el-form-item label="膳食名称">
            <el-row>
                <el-col :span="4">
                    <el-input v-model="form.foodName"></el-input>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="膳食类别" label-width="auto">
            <el-row style="mso-element-left: right">
                <el-col :span="4">
                    <el-select v-model="form.foodType" placeholder="请选择活动区域" style="float: left">
                        <el-option label="感冒" value="感冒"></el-option>
                        <el-option label="腹泻" value="腹泻"></el-option>
                        <el-option label="咳嗽" value="咳嗽"></el-option>
                        <el-option label="中暑" value="中暑"></el-option>
                        <el-option label="便秘" value="便秘"></el-option>
                        <el-option label="清热消炎" value="清热消炎"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="膳食标签">
            <el-row>
                <el-col :span="4">
                    <el-select v-model="form.foodTag" placeholder="请选择活动区域" style="float: left">
                        <el-option label="感冒" value="感冒"></el-option>
                        <el-option label="腹泻" value="腹泻"></el-option>
                        <el-option label="咳嗽" value="咳嗽"></el-option>
                        <el-option label="中暑" value="中暑"></el-option>
                        <el-option label="便秘" value="便秘"></el-option>
                        <el-option label="清热消炎" value="清热消炎"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="膳食价格">
            <el-row>
                <el-col :span="4">
                    <el-input v-model="form.foodPrice"></el-input>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="食品图片">
            <el-row>
                <el-col :span="4">
                    <div>
                        <el-upload
                                list-type="picture-card"
                                class="avatar-uploader"
                                action="http://localhost:8082/common/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.foodPicture" :src="`http://localhost:8082/${form.foodPicture}`" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="是否清真">
            <el-row>
                <el-col :span="4">
                    <el-switch
                            v-model="form.momalFlag"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="供应星期">
            <el-row>
                <el-col :span="4">
                    <el-select v-model="form.supplyDate" placeholder="请选择活动区域" style="float: left">
                        <el-option label="感冒" value="感冒"></el-option>
                        <el-option label="腹泻" value="腹泻"></el-option>
                        <el-option label="咳嗽" value="咳嗽"></el-option>
                        <el-option label="中暑" value="中暑"></el-option>
                        <el-option label="便秘" value="便秘"></el-option>
                        <el-option label="清热消炎" value="清热消炎"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="供应类型">
            <el-row>
                <el-col :span="4">
                    <el-select v-model="form.supplyType" placeholder="请选择活动区域" style="float: left">
                        <el-option label="感冒" value="感冒"></el-option>
                        <el-option label="腹泻" value="腹泻"></el-option>
                        <el-option label="咳嗽" value="咳嗽"></el-option>
                        <el-option label="中暑" value="中暑"></el-option>
                        <el-option label="便秘" value="便秘"></el-option>
                        <el-option label="清热消炎" value="清热消炎"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-row>
                <el-col :span="5">
                    <el-button icon="el-icon-plus" type="primary" @click="onCreate">立即创建</el-button>
                    <el-button @click="onCancel">取消</el-button>
                </el-col>
            </el-row>
        </el-form-item>

    </el-form>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    foodName:'',
                    foodType:'',
                    foodTag:'',
                    foodPrice:'',
                    foodPicture:'',
                    momalFlag:false,
                    supplyDate:'',
                    supplyType:'',
                },
                url:"",
                fileList:[],
                imageBase64:'',
                dialogVisible:false,
                status:200,
                responseData:''
            }
        },
        methods: {
            onCancel(){
                this.form.foodName='';
                this.form.foodType='';
                this.form.foodTag='';
                this.form.foodPrice='';
                this.form.foodPicture='';
                this.form.momalFlag=false;
                this.form.supplyDate='';
                this.form.supplyType='';
                this.url='';
            },
            onCreate(){
                let path = `http://localhost:8082/mealManage/insert`
                this.$ajax.post(path,this.form).then(res=>{
                    if(res.data.state==="success"){
                        this.$message({
                            message:"恭喜你添加成功",
                            type:"success",

                        })
                        this.onCancel()
                    }
                })
            },
            handleAvatarSuccess(res) {
                this.form.foodPicture = res
            },
        }
    }
</script>


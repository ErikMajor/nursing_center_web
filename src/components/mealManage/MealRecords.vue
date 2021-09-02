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
                    <el-select v-model="form.foodType" clearable placeholder="请选择膳食类别" style="float: left">
                        <el-option label="大荤" value="大荤"></el-option>
                        <el-option label="小荤" value="小荤"></el-option>
                        <el-option label="素菜" value="素菜"></el-option>
                        <el-option label="甜点" value="甜点"></el-option>
                        <el-option label="水果" value="水果"></el-option>
                        <el-option label="套餐" value="套餐"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="膳食标签">
            <el-row>
                <el-col :span="4">
                    <el-select v-model="form.foodTag" clearable placeholder="请选择膳食标签" style="float: left">
                        <el-option label="多糖" value="多糖"></el-option>
                        <el-option label="少糖" value="少糖"></el-option>
                        <el-option label="多脂肪" value="多脂肪"></el-option>
                        <el-option label="少脂肪" value="少脂肪"></el-option>
                        <el-option label="多盐" value="多盐"></el-option>
                        <el-option label="少盐" value="少盐"></el-option>
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
                                action="http://localhost:8081/common/upload"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="form.foodPicture" :src="`http://localhost:8081/${form.foodPicture}`" class="avatar">
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
                    <el-select v-model="supplyDate" multiple placeholder="请选择供应星期" style="float: left">
                        <el-option label="周一" value="周一"></el-option>
                        <el-option label="周二" value="周二"></el-option>
                        <el-option label="周三" value="周三"></el-option>
                        <el-option label="周四" value="周四"></el-option>
                        <el-option label="周五" value="周五"></el-option>
                        <el-option label="周六" value="周六"></el-option>
                        <el-option label="周日" value="周日"></el-option>
                    </el-select>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="供应类型">
            <el-row>
                <el-col :span="4">
                    <el-select v-model="supplyType" multiple placeholder="请选择供应类型" style="float: left">
                        <el-option label="早餐" value="早餐"></el-option>
                        <el-option label="午餐" value="午餐"></el-option>
                        <el-option label="晚餐" value="晚餐"></el-option>
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
                supplyDate:'',
                supplyType:'',
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
                this.supplyDate.forEach((item,index) => {
                    this.form.supplyDate=item
                    this.supplyType.forEach((item1,index1) =>{
                        this.form.supplyType=item1
                        let path = `http://localhost:8081/mealManage/insert`
                        this.$ajax.post(path,this.form).then(res=>{
                            if(res.data.state==="success" && index===this.supplyDate.length-1 && index1===this.supplyType.length-1){
                                this.$message({
                                    message:"恭喜你添加成功",
                                    type:"success",

                                })
                            }
                        })
                    })
                })
                this.onCancel()
            },
            handleAvatarSuccess(res) {
                this.form.foodPicture = res
            },
        }
    }
</script>



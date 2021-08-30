<template>
    <div>
        <el-upload
                v-loading="loading"
                element-loading-text="正在导入中..."
                list-type="picture-card"
                class="avatar-uploader"
                action="http://localhost:8081/user_manage/userImpotr"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: "UserImport",
        data(){
            return{
                loading: false
            }
        },
        methods: {
            //上传成功回调的方法
            handleAvatarSuccess(res) {
                console.log(res)
                this.loading = false;
                this.$message({
                    showClose: true,
                    message: '导入成功!',
                    type: 'success'
                });
            },
            //图片上传之前触发的方法
            beforeAvatarUpload(file) {
                console.log(file.type)
                const isJPG = file.type === 'application/vnd.ms-excel';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传Excel格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传大小不能超过 2MB!');
                }
                if(isJPG && isLt2M) this.loading = true
                return isJPG && isLt2M;
            }
        }
    }
</script>

<style scoped>
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
</style>
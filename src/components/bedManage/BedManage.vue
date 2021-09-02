<template>
<div>
    <el-table :data="bedList" stripe>
        <el-table-column label="床位号" prop="id"></el-table-column>
        <el-table-column label="客户编号" prop='parentId'>
        </el-table-column>
        <el-table-column label="房间号" prop='roomNumber'></el-table-column>
        <el-table-column label="床位状态" prop='bedStatus'></el-table-column>
        <el-table-column label="操作">

            <template slot-scope="scope">

                <el-button round icon="el-icon-edit" type="warning" @click = "setCustomerBed(scope.row)">分配客户床位</el-button>

            </template>

        </el-table-column>
    </el-table>
    <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
    <el-form label-position="left" ref="form" :model="form" label-width="80px">
        <el-form-item label="客户编号">
            <el-input v-model="form.parentId"></el-input>
        </el-form-item>
        <el-form-item label="房间号">
            <el-input v-model="form.roomNumber"></el-input>
        </el-form-item>
        <el-form-item label="床位号">
            <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="床位状态">
            <el-input v-model="form.bedStatus"></el-input>
        </el-form-item>
        <el-button @click="addCustomerBed()">添加</el-button>
    </el-form>
    </el-dialog>
</div>
</template>

<script>
    export default {
        name: "BedManage",
        data() {
            return {
                bedList:{},
                dialogVisible:false,
                form:{
                    parentId:'',
                    roomNumber:'',
                    id:'',
                    bedStatus:''
                },
                form1:{
                    roomNumber:''
                },
                tableData:{},
                id:''
            }
        },
        created(){
            this.id = this.$route.params.id
            this.searchBeds()
            // this.bedList.roomNumber = this.$route.params.id


        },
        methods:{
            searchBeds(){
                this.bedList.roomNumber = this.id
                let path = `http://localhost:8081/bedManage/searchBeds`
                this.$ajax.post(path,this.bedList).then(res=>{
                    this.bedList = res.data
                    this.bedList.forEach((item,index) => {
                        if (this.bedList[index].parentId === null) {
                            this.bedList[index].parentId = '暂无客户'
                        }
                    })
                })
            },
            setCustomerBed(val){
                this.form.parentId = val.parentId
                this.form.roomNumber = val.roomNumber
                this.form.id = val.id
                this.form.bedStatus = val.bedStatus
                if(this.form.parentId === '暂无客户'){
                    this.dialogVisible = true
                    this.form.parentId = ''
                }
                else{
                    this.dialogVisible = false
                    this.$message({
                        message: "该床位已有客户入住",
                        type: "failed",

                    })
                }

            },
            addCustomerBed(){
                let path = `http://localhost:8081/bedManage/searchCustomerId`
                const parentId = parseInt(this.form.parentId)
                let num = 0
                this.$ajax.post(path).then(res=>{
                    this.tableData = res.data
                    this.tableData.forEach((item,index) => {
                        if(this.tableData[index].parentId === parentId){
                            this.$message({
                                message: "此用户已经入住",
                                type: "failed",
                            })
                            num = 1
                        }
                        })
                    if(num !== 1) {
                        let path1 = `http://localhost:8081/bedManage/addCustomerBed`
                        this.$ajax.post(path1,this.form).then(res=>{
                            if (res.data.state === "success") {
                                this.$message({
                                    message: "恭喜你添加成功",
                                    type: "success",

                                })
                            }
                        })

                        this.updateRoomId()
                        this.searchBeds()
                        this.dialogVisible = false
                    }
                    })
                // this.bedList.roomNumber = parseInt(this.form.roomNumber)
                // console.log(this.bedList+"测试")
                // let path2 = `http://localhost:8081/bedManage/searchBeds`
                // this.$ajax.post(path2,this.bedList).then(res=>{
                //     this.bedList = res.data
                // })



            },
            updateRoomId(){
                this.form1.roomNumber = this.form.roomNumber
                let path = `http://localhost:8081/customerManage/updateRoomId`
                this.$ajax.post(path,this.form1).then(res=>{
                    console.log(res.data)
                })
            },
            // searchCustomerId(){
            //     let path = `http://localhost:8082/bedManage/searchCustomerId`
            //     this.$ajax.post(path).then(res=>{
            //         this.tableData = res.data
            //         this.tableData.forEach(item => {
            //             if(this.form.parentId === item){
            //                 this.$message({
            //                     message: "此用户已经入住",
            //                     type: "failed",
            //
            //                 })
            //             }
            //         })
            //     })
            // }
        }

    }
</script>

<style scoped>

</style>

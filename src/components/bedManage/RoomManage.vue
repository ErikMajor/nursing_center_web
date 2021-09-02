<template>
    <div>
        <el-table :data="roomList" stripe>
            <el-table-column label="房间号" prop="id"></el-table-column>
            <el-table-column label="房间状态" prop='roomStatus'></el-table-column>
            <el-table-column label="总共床位" prop='totalBeds'></el-table-column>
            <el-table-column label="剩余床位" prop='remainBeds'></el-table-column>
            <el-table-column label="已占床位" prop='occupiedBeds'></el-table-column>
            <el-table-column label="操作">

                <template slot-scope="scope">

                    <el-button circle icon="el-icon-share" type="success" @click = "searchBeds(scope.row)">查看床位</el-button>

                </template>

            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "RoomManage",
        data() {
            return {
                roomList:[]
            }
        },
        mounted(){
            this.searchRooms()
        },
        methods:{
            searchRooms(){
                let path = `http://localhost:8081/bedManage/searchRooms`
                this.$ajax.post(path).then(res=>{
                    this.roomList = res.data
                    this.roomList.forEach(item =>{
                        if(item.remainBeds === 0){
                            item.roomStatus = '住满'
                        }
                        }

                    )
                })
            },
            searchBeds(val){
                if(val.remainBeds === 0){
                    this.$message({
                        message: "该房间已经没有床位了",
                        type: "failed",

                    })
                }
                else{
                    this.$router.push(`/main/bedManage/${val.id}`)
                }
            }
        }

    }
</script>

<style scoped>

</style>

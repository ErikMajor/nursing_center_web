<template>
    <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="护理级别">
                <el-input v-model="formInline.levelName" placeholder="护理级别"></el-input>
            </el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button type="primary" @click="handleAdd">新增护理等级</el-button>
        </el-form>

        <el-table
                v-loading = "loading"
                :data="pageInfo.list"
                style="width: 100%">
            <el-table-column
                    label="护理级别"
                    width="100px"
                    prop="levelName">
            </el-table-column>
            <el-table-column
                    label="护理状态(是否启用)"
                    width="200px"
                    prop="levelStatus">
            </el-table-column>
            <el-table-column
                    label="创建者"
                    width="120px"
                    prop="createBy">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    width="200px"
                    prop="createDate">
            </el-table-column>
            <el-table-column
                    label="更新者"
                    width="120px"
                    prop="updateBy">
            </el-table-column>
            <el-table-column
                    label="更新时间"
                    width="200px"
                    prop="updateDate">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="total, prev, pager, next"
                :total="pageInfo.pageNum"
                :page-size="pageInfo.pageSize"
                @current-change="handleCurrentChange"
                class="page">
        </el-pagination>

        <el-pagination
                background
                layout="total, prev, pager, next"
                :total="pageInfo.pageNum"
                :page-size="pageInfo.pageSize"
                @current-change="handleCurrentChange"
                class="page">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                pageInfo:[],
                loading:false,
                currPage:1,
                search: '',
                formInline:{
                    levelName:''
                }
            }
        },
        created() {
            this.getData()
        },
        methods: {
            getData(){
                this.loading = true
                let path = `http://localhost:8081/nursingLevel/queryAll/${this.currPage}`
                this.$ajax.post(path,this.formInline).then(res=>{
                    this.pageInfo = res.data
                    this.loading = false
                    console.log(this.pageInfo)
                })
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleAdd(index,row){
                console.log(index,row)
            },
            handleCurrentChange(val) {
                this.currPage = val
                console.log(val)
                this.getData()
            },
            handleSearch(){
                this.currPage = 1
                this.getData()
            }
        }
    }
</script>

<style scoped>

    .page{
        text-align: center;
    }
</style>
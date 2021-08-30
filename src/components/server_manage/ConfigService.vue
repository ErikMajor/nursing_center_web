<template>
    <div class="company-list">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="header">
            <el-breadcrumb-item >首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/company' }">服务管理</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/main/companyAdd' }">新增</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="服务名称">
                <el-input v-model="formInline.name" placeholder="服务名称"></el-input>
            </el-form-item>
            <el-form-item label="种类">
                <el-select v-model="formInline.industry" placeholder="服务种类">
                    <el-option label="金融" value="金融"></el-option>
                    <el-option label="教育" value="教育"></el-option>
                    <el-option label="IT" value="IT"></el-option>
                    <el-option label="餐饮" value="餐饮"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="handleAdd">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table
                v-loading="loading"
                :data="pageInfo.list"
                :stripe=stripe
                :border=border
                style="width: 100%"
                class="tab">
            <el-table-column
                    type="index"
                    width="40">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="industry"
                    label="行业"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="funds"
                    label="注册资金(元)"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="scale"
                    label="规模(人)"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="tel"
                    label="联系方式"
                    width="180">
            </el-table-column>
            <el-table-column label="操作">
<!--                <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                            size="mini"-->
<!--                            @click="handleEdit(scope.row.id)">编辑</el-button>-->
<!--                    <el-button-->
<!--                            size="mini"-->
<!--                            type="danger"-->
<!--                            @click="handleDelete(scope.row.id)">删除</el-button>-->
<!--                    <el-button-->
<!--                            size="mini"-->
<!--                            type="danger"-->
<!--                            @click="handleShowPost(scope.row.id)">查看所有职位</el-button>-->
<!--                </template>-->
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="total,prev, pager, next"
                :total="pageInfo.total"
                :page-size="pageInfo.pageSize"
                @current-change="handleCurrentChange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "ConfigService",
        data(){
            return{
                stripe: true,
                border: true,
                loading: false,
                currPage: 1,
                pageInfo: {},
                formInline: {
                    name: '',
                    industry: ''
                }
            }
        },
        created(){
            this.getData()
        },
        methods: {
            getData(){
                this.loading = true
                let path = `http://localhost:8081/company/queryAll/${this.currPage}`
                this.$ajax.post(path,this.formInline).then(res=>{
                    this.pageInfo = res.data
                    this.loading = false
                    console.log(this.pageInfo)
                })
            },
            handleAdd(){
                this.$router.push('/main/companyAdd')
            },
            handleCurrentChange(val) {
                this.currPage = val
                this.getData()
            },
            onSubmit(){
                this.currPage = 1
                this.getData()
            },
            handleDelete(id){
                let path = `http://localhost:8081/company/del/${id}`
                this.$ajax.get(path).then(res=>{
                    if(res.data.status === 200){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                    this.currPage = 1
                    this.getData()
                })
            },
            // handleEdit(id){
            //     this.$router.push(`/main/companyUpdate/${id}`)
            // },
            // handleShowPost(id){
            //     this.$router.push(`/main/postList/${id}`)
            // }
        }
    }
</script>

<style scoped>
    .header {
        margin-bottom: 10px;
    }
    .company-list {
        padding: 10px;
    }
    .tab {
        margin: 10px 0;
    }
</style>
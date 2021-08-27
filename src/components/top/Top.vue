<template>
    <div class="home">
        <div class="con">
            <span class="title" @click="index">东软颐养中心</span>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span class="operate">{{user.username}}</span>
            <el-button type="info" icon="el-icon-switch-button" circle @click="exit" ></el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data(){
            return{

            }
        },
        created(){
            //从sessionStorage中取出user转成JSON对象
            //this.user = JSON.parse(sessionStorage.getItem("user"))
            //console.log(this.user)
        },
        computed: {
            //使用对象展开运算符将getters混入computed对象中
            ...mapGetters([
                'user'
            ])
        }
    }
</script>

<style scoped>

    .el-avatar--circle {
        border-radius: 50%;
        /* display: inline-block; */
        position: absolute;
        right: 150px;
        top: 15px;
    }
    .el-button{
        position: absolute;
        right: 80px;
        top: 15px;
    }
    .operate{
        color: #fff;
        position: absolute;
        right: 200px;
        font-size: 0.8em;
        font-weight: bold;
    }
    .con .title{
        font-weight: bold;
        font-size: 1.5em;
        color: #fff;
    }

 </style>
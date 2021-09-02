<template>
  <div>
    <el-menu
        :default-active="$route.path"
        :router="true"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical"
        text-color="#fff"
        @select="handleSelect"
    >
      <el-menu-item index="/main">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>客户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/main/manage">在院客户</el-menu-item>
          <el-menu-item index="/main/checkin">入住</el-menu-item>
          <el-menu-item index="/main/checkout">退住</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span>床位管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/main/roomManage">床位管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>护理管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/main/nursingLevel">护理级别管理</el-menu-item>
          <el-menu-item index="/main/nursingContent">护理内容管理</el-menu-item>
          <el-menu-item index="/main/nursingRecords">护理记录管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>膳食管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/main/mealRecords">膳食添加</el-menu-item>
                <el-menu-item index="/main/mealCanlender">膳食展示</el-menu-item>
                <el-menu-item index="/main/userMealManage">膳食日历</el-menu-item>
            </el-menu-item-group>
        </el-submenu>


      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>服务对象管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/main/customerConcern">设置服务对象</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/main/user">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/">
        <i class="el-icon-s-release"></i>
        <span slot="title">退出</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect(key) {
      console.log(key)
      switch (key) {
        case '3-1':
          this.$router.push('/main/bedManage');
          break;
        case '5-1':
          this.$router.push('/main/mealRecords');
          break;
        case '5-2':
          this.$router.push('/main/mealCalender');
          break;
        case '5-3':
          this.$router.push('/main/userMealManage');
          break;

      }
    }

  }
}
</script>

<style scoped>
.el-menu-vertical {
  min-height: 600px;
}
</style>

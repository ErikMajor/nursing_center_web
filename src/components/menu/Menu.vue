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
          <el-menu-item index="/main/checkin" >入住管理</el-menu-item>
          <el-menu-item index="1-2">退住管理</el-menu-item>
          <el-menu-item index="1-3">外出管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>床位管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">床位管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>护理管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">护理级别管理</el-menu-item>
          <el-menu-item index="1-2">护理记录管理</el-menu-item>
          <el-menu-item index="1-3">护理内容管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>膳食管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">膳食记录管理</el-menu-item>
          <el-menu-item index="1-2">膳食日历展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>服务对象管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">设置服务对象</el-menu-item>
          <el-menu-item index="1-1">服务关注</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="7">
        <template slot="title">
          <i class="el-icon-notebook-2"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">护士管理</el-menu-item>
          <el-menu-item index="1-2">护工管理</el-menu-item>
          <el-menu-item index="1-2">医生管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="8">
        <i class="el-icon-s-release"></i>
        <span slot="title">退出</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: "menu",
  data() {
    return {
    }
  },
  methods: {
    handleSelect(key) {
      console.log(key)
    }

  }
}
</script>

<style scoped>
.el-menu-vertical {
  min-height: 600px;
}
</style>
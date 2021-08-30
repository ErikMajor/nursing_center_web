<template>
  <el-card
      :body-style="{padding: '1%', margin: '1%'}"
      style="width: 100%"
      shadow="always"
  >
    <el-row>
      <el-col :span="12">
        <img class="image"
             src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
      </el-col>
      <el-col :span="12">
        <el-row>
          {{ this.customer }}
        </el-row>
        <el-row>
          {{ this.customer }}
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: ['customer']
}
</script>

<style scoped>

</style>
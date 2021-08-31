<template>
  <el-card
      :body-style="{padding: '1%', margin: '1%'}"
      shadow="always"
      style="width: 100%"
  >
    <el-row>
      <el-col :span="12">
        头像还没写
      </el-col>
      <el-col :span="12">
        <el-row>
          ID：
          <el-input
              v-model="id"
              :disabled="true"
              style="width: 10%;"
          ></el-input>
        </el-row>
        <el-row>
          姓名：
          <el-input
              v-model="name"
              style="width: 50%"
          ></el-input>
        </el-row>
        <el-row>
          年龄：
          <el-input
              v-model="age"
              style="width: 10%"
          ></el-input>
        </el-row>
        <el-row>
          性别：
          <el-input
              v-model="sex"
              style="width: 10%"
          ></el-input>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      customer: this.data,
      id: "",
      name: "",
      age: "",
      sex: "",
      idCard: "",
      roomId: "",
      buildingId: "",

    }

  },
  watch: {
    data(newVal) {
      this.customer = newVal
      this.id = newVal.id
      this.name = newVal.customerName
      this.age = newVal.customerAge
      this.sex = newVal.customerSex
      this.buildingId = newVal.buildingId
    }
  },
  methods: {

  },
  mounted() {
    this.id = this.customer.id
    this.name = this.customer.customerName
    this.age = this.customer.customerAge
    this.sex = this.customer.customerSex
    this.buildingId = this.customer.buildingId
  }
}
</script>

<style scoped>

</style>
<template>
  <el-card
      :body-style="{padding: '1%', margin: '1%'}"
      shadow="always"
      style="width: 100%"
  >
    <el-row :justify="justify" :align="align" :gutter="20">
      <el-col :span="4">
        头像还没写
      </el-col>
      <el-col :span="10">
        <el-row justify="center">
          ID：{{ id }}
        </el-row>
        <el-row>
          姓名：{{ name }}
        </el-row>
        <el-row>
          年龄：{{ age }}岁
        </el-row>
        <el-row>
          性别：{{ sex }}
        </el-row>
        <el-row>
          身份证号：{{ idCard }}
        </el-row>
        <el-row>
          房间号：{{ roomId }}
        </el-row>
        <el-row>
          所属楼房：{{ buildingId }}
        </el-row>
        <el-row>
          档案号：{{ recordId }}
        </el-row>
        <el-row>
          老人类型：{{ elderType }}
        </el-row>
      </el-col>
      <el-col :span="10">
        <el-row>
          入住时间：{{ checkinDate }}
        </el-row>
        <el-row>
          服务到期时间：{{ expirationDate }}
        </el-row>
        <el-row>
          联系电话：{{ contactTel }}
        </el-row>
        <el-row>
          出生日期：{{ birthday }}
        </el-row>
        <el-row>
          身高：{{ height }}cm
        </el-row>
        <el-row>
          婚姻状况：{{ maritalStatus }}
        </el-row>
        <el-row>
          体重：{{ weight }}kg
        </el-row>
        <el-row>
          血型：{{ bloodType }}型
        </el-row>
        <el-row>
          备注信息：{{ remarks }}
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
      align: "middle",
      justify: "center",
      customer: this.data,
      id: "",
      name: "",
      age: "",
      sex: "",
      idCard: "",
      roomId: "",
      buildingId: "",
      recordId: "",
      elderType: "",
      checkinDate: "",
      expirationDate: "",
      contactTel: "",
      birthday: "",
      height: "",
      maritalStatus: "",
      weight: "",
      bloodType: "",
      filePath: "",
      remarks: "",
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
      this.recordId = newVal.recordId
      this.elderType = newVal.elderType
      this.checkinDate = newVal.checkinDate
      this.expirationDate = newVal.expirationDate
      this.contactTel = newVal.contactTel
      this.birthday = newVal.birthday
      this.height = newVal.height
      this.maritalStatus = newVal.maritalStatus
      this.weight = newVal.weight
      this.bloodType = newVal.bloodType
      this.filePath = newVal.filePath
      this.remarks = newVal.remarks
    }
  },
  methods: {},
  mounted() {
    this.id = this.customer.id
    this.name = this.customer.customerName
    this.age = this.customer.customerAge
    this.sex = this.customer.customerSex
    this.buildingId = this.customer.buildingId
    this.recordId = this.customer.recordId
    this.elderType = this.customer.elderType
    this.checkinDate = this.customer.checkinDate
    this.expirationDate = this.customer.expirationDate
    this.contactTel = this.customer.contactTel
    this.birthday = this.customer.birthday
    this.height = this.customer.height
    this.maritalStatus = this.customer.maritalStatus
    this.weight = this.customer.weight
    this.bloodType = this.customer.bloodType
    this.filePath = this.customer.filePath
    this.remarks = this.customer.remarks
  }
}
</script>

<style scoped>

</style>
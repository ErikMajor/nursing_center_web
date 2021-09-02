<template>
  <el-dialog title="编辑客户信息" @click="dialogFormVisible = true">

  </el-dialog>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      customer: this.data,
      dialogFormVisible: false,
      form: {
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
    }
  },
  watch: {
    data(newVal) {
      this.customer = newVal
      this.form.id = newVal.id
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
}
</script>

<style scoped>

</style>
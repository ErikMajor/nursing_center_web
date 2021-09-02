<template>
  <el-form ref="form" :model="form" label-position="left" label-width="80%" size="mini">
    <el-form-item label="客户ID" size="medium">
      <el-input v-model="form.id" disabled></el-input>
    </el-form-item>
    <el-form-item label="客户姓名" size="medium">
      <el-input v-model="form.customerName"></el-input>
    </el-form-item>
    <el-form-item label="客户年龄" size="medium">
      <el-input v-model="form.customerAge"></el-input>
    </el-form-item>
    <el-form-item label="客户性别" size="medium">
      <el-input v-model="form.customerSex"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" size="medium">
      <el-input v-model="form.idCard"></el-input>
    </el-form-item>
    <el-form-item label="房间号" size="medium">
      <el-input disabled v-model="form.roomId"></el-input>
    </el-form-item>
    <el-form-item label="所属楼房" size="medium">
      <el-input disabled v-model="form.buildingId"></el-input>
    </el-form-item>
    <el-form-item label="档案号" size="medium">
      <el-input v-model="form.recordId"></el-input>
    </el-form-item>
    <el-form-item label="老人类型" size="medium">
      <el-input v-model="form.elderType"></el-input>
    </el-form-item>
    <el-form-item label="入住时间" size="medium">
      <el-date-picker
          v-model="form.checkinDate"
          placeholder="选择日期时间"
          style="width: 100%"
          type="datetime">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="服务到期时间" size="medium">
      <el-date-picker
          v-model="form.expirationDate"
          placeholder="选择日期时间"
          style="width: 100%"
          type="datetime">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="联系电话" size="medium">
      <el-input v-model="form.contactTel"></el-input>
    </el-form-item>
    <el-form-item label="出生日期" size="medium">
      <el-date-picker
          v-model="form.birthday"
          placeholder="选择日期"
          style="width: 100%"
          type="date">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="身高" size="medium">
      <el-input v-model="form.height">
        <template slot="append">cm</template>
      </el-input>
    </el-form-item>
    <el-form-item label="婚姻状况" size="medium">
      <el-input v-model="form.maritalStatus"></el-input>
    </el-form-item>
    <el-form-item label="体重" size="medium">
      <el-input v-model="form.weight">
        <template slot="append">kg</template>
      </el-input>
    </el-form-item>
    <el-form-item label="血型" size="medium">
      <el-input v-model="form.bloodType">
        <template slot="append">型</template>
      </el-input>
    </el-form-item>
    <el-form-item label="备注" size="medium">
      <el-input
          v-model="form.remarks"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          type="textarea">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">确认</el-button>
    </el-form-item>
  </el-form>
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
        customerName: "",
        customerAge: "",
        customerSex: "",
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
      this.form.customerName = newVal.customerName
      this.form.customerAge = newVal.customerAge
      this.form.customerSex = newVal.customerSex
      this.form.idCard = newVal.idCard
      this.form.buildingId = newVal.buildingId
      this.form.recordId = newVal.recordId
      this.form.elderType = newVal.elderType
      this.form.checkinDate = newVal.checkinDate
      this.form.expirationDate = newVal.expirationDate
      this.form.contactTel = newVal.contactTel
      this.form.birthday = newVal.birthday
      this.form.height = newVal.height
      this.form.maritalStatus = newVal.maritalStatus
      this.form.weight = newVal.weight
      this.form.bloodType = newVal.bloodType
      this.form.filePath = newVal.filePath
      this.form.remarks = newVal.remarks
    }
  },
  methods: {
    submit() {
      let url = 'http://localhost:8081/checkin/updateCustomer'
      this.$ajax.post(url, this.form).then(res => {
        if (res.data.state === "true") {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
        } else {
          this.$message.error('提交失败');
        }
      })
      location.reload()
    }
  },
  mounted() {
    this.form.id = this.customer.id
    this.form.customerName = this.customer.customerName
    this.form.customerAge = this.customer.customerAge
    this.form.customerSex = this.customer.customerSex
    this.form.idCard = this.customer.idCard
    this.form.buildingId = this.customer.buildingId
    this.form.recordId = this.customer.recordId
    this.form.elderType = this.customer.elderType
    this.form.checkinDate = this.customer.checkinDate
    this.form.expirationDate = this.customer.expirationDate
    this.form.contactTel = this.customer.contactTel
    this.form.birthday = this.customer.birthday
    this.form.height = this.customer.height
    this.form.maritalStatus = this.customer.maritalStatus
    this.form.weight = this.customer.weight
    this.form.bloodType = this.customer.bloodType
    this.form.filePath = this.customer.filePath
    this.form.remarks = this.customer.remarks
  }
}
</script>

<style scoped>

</style>
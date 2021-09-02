<template>
  <div style="width: 50%">
    <el-main>
    <el-form ref="form" :model="form" label-position="top" label-width="50%" size="medium">
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
    </el-main>
  </div>
</template>

<script>
import axios from "axios";

export default {

  data() {
    return {
      form: {
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
  methods: {
    submit() {
      axios.post('http://localhost:8081/checkin/addCustomer', this.form)
      // this.$router.push('/main/manage')
    }
  }
}
</script>

<style scoped>

</style>
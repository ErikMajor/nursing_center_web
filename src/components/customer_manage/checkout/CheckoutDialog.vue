<template>
  <el-form ref="form" :model="form" label-position="left" label-width="80%" size="mini">
    <el-form-item label="客户ID" size="medium">
      <el-input disabled v-model="form.customerId"></el-input>
    </el-form-item>
    <el-form-item label="退住类型" size="medium">
      <el-input v-model="form.checkoutStatus"></el-input>
    </el-form-item>
    <el-form-item label="退住原因" size="medium">
      <el-input v-model="form.retreatReason"></el-input>
    </el-form-item>
    <el-form-item label="退住时间" size="medium">
      <el-date-picker
          v-model="form.retreatTime"
          placeholder="选择日期时间"
          style="width: 100%"
          type="datetime">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="申请时间" size="medium">
      <el-date-picker
          v-model="form.askTime"
          placeholder="选择日期时间"
          style="width: 100%"
          type="datetime">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="备注信息" size="medium">
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
import axios from "axios";

export default {
  props: ['data'],
  methods: {
    submit() {
      let url = 'http://localhost:8081/checkout/insert'
      this.$ajax.post(url, this.form).then(res=>{
        if (res.data.state === "true") {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
        } else {
          this.$message.error('提交失败');
        }
      })
      axios.post('http://localhost:8081/checkin/delete?id='+this.form.customerId).then(function (response) {
        console.log(response)
      })
      location.reload()
    }
  },
  data() {
    return {
      id: this.data,
      form: {
        customerId: '',
        checkoutStatus: '',
        retreatReason: '',
        retreatTime: '',
        askTime: '',
        remarks: ''
      }
    }
  },
  watch: {
    data(newVal) {
      this.customerId = newVal
    }
  },
  mounted() {
    this.form.customerId = this.data
    console.log(this.data)
  }
}
</script>

<style scoped>

</style>
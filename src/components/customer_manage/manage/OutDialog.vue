<template>
  <el-form ref="form" :model="form" label-position="left" label-width="80%" size="mini">
    <el-form-item label="客户ID" size="medium">
      <el-input v-model="form.customerId" disabled></el-input>
    </el-form-item>
    <el-form-item label="外出事由" size="medium">
      <el-input v-model="form.outgoingReason"></el-input>
    </el-form-item>
    <el-form-item label="外出时间" size="medium">
      <el-date-picker
          v-model="form.outgoingTime"
          placeholder="选择日期时间"
          style="width: 100%"
          type="datetime">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="预计回院时间" size="medium">
      <el-date-picker
          v-model="form.expectedReturntime"
          placeholder="选择日期时间"
          style="width: 100%"
          type="datetime">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="陪同人" size="medium">
      <el-input v-model="form.escorted"></el-input>
    </el-form-item>
    <el-form-item label="与老人关系" size="medium">
      <el-input v-model="form.relation"></el-input>
    </el-form-item>
    <el-form-item label="陪同人电话" size="medium">
      <el-input v-model="form.escortedTel"></el-input>
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
export default {
  props: ['data'],
  data() {
    return {
      id: '',
      form: {
        customerId: '',
        outgoingReason: '',
        outgoingTime: '',
        expectedReturntime: '',
        escorted: '',
        relation: '',
        escortedTel: '',
        remarks: ''
      }
    }
  },
  watch: {
    data(newVal) {
      this.id = newVal
      this.form.customerId = newVal
    }
  },
  methods: {
    submit() {
      let url = 'http://localhost:8081/registration/out'
      this.$ajax.post(url, this.form).then(res => {
        if (res.data.state === "true") {
          this.out_id = res.data.id
          console.log(this.out_id)
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.$emit('outId', this.out_id)
        } else {
          this.$message.error('提交失败');
        }
      })
      location.reload()
    },
  },
  mounted() {
    this.id = this.data
    this.form.customerId = this.id
  }
}
</script>

<style scoped>

</style>
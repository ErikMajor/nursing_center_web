<template>
  <el-form ref="form" :model="form" label-position="left" label-width="80%" size="mini">
    <el-form-item label="备注信息" size="medium">
      <el-input v-model="form.remarks"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="实际回院时间" size="medium">
      <el-date-picker
          v-model="form.actualReturntime"
          placeholder="选择日期时间"
          style="width: 100%"
          type="datetime">
      </el-date-picker>
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
        id: this.data,
        remarks: '',
        actualReturntime: ''
      }
    }
  },
  watch: {
    data(newVal) {
      this.id = newVal
      this.form.id = newVal
      this.form.id = localStorage.getItem(newVal)
    }
  },
  methods: {
    submit() {
      let url = 'http://localhost:8081/registration/back'
      this.form.id = localStorage.getItem(this.data)
      console.log(this.form.id)
      this.$ajax.post(url, this.form).then(res => {
        if (res.data.state === "true") {
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          location.reload()
        } else {
          this.$message.error('提交失败');
        }
      })
    }
  },
  mounted() {
    this.form.id = localStorage.getItem(this.data)
    this.id = this.data
    this.form.id = this.id
    console.log(localStorage.getItem(this.data))
  }
}
</script>

<style scoped>

</style>
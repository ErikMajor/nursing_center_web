<template>
  <div>
    <el-container>
      <el-header>
        <el-input
            v-model="name"
            clearable
            placeholder="请输入客户的名字"
            style="width: 40%;margin: 1%;padding-left: 50%"
            @input="search"
        ></el-input>
      </el-header>
      <el-main>
        <customer :customer="this.name"/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import CustomerCard from "@/components/customer_manage/checkin/CustomerCard";
import axios from "axios";

export default {
  components: {
    customer: CustomerCard,
  },
  data() {
    return {
      rows: [],
      name: '',
      timeout: null
    }
  },
  methods: {
    async search() {
      let data = []
      await axios.get('http://localhost:8081/checkin/queryByName/1',{
        params: {
          name: this.name.toString()
        }
      })
      .then(function (response) {
        data = response.data.customers
        console.log(response)
      })
      this.rows = data
      console.log(this.rows[0])
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
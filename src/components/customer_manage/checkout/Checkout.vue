<template>
  <div>
    <el-container>
      <el-header>
        <el-autocomplete
            v-model="name"
            :fetch-suggestions="querySearchAsync"
            clearable
            placeholder="请输入内容"
            @select="handleSelect"
            @input="changeCard"
        ></el-autocomplete>
      </el-header>
      <el-main>
        <ul>
          <div v-for="data in this.customers" :key="data.id" style="margin: 2%">
            <customer :data="data"/>
          </div>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import axios from "axios";
import CustomerCard from "@/components/customer_manage/checkout/CustomerCard";
export default {
  components: {
    customer: CustomerCard,
  },
  data() {
    return {
      customers: [],
      name: '',
    }
  },
  methods: {
    changeCard(queryString) {
      var list = [{}]
      let url = 'http://localhost:8081/checkin/queryListByName?name=' + queryString
      axios.get(url).then((response) => {
        list = response.data.customers
        this.customers = list
        console.log(this.customers.length)
      })
    },
    querySearchAsync(queryString, cb) {
      var list = [{}]
      let url = 'http://localhost:8081/checkin/queryListByName?name=' + queryString
      axios.get(url).then((response) => {
        list = response.data.customers
        this.customers = list
        console.log(this.customers.length)
        cb(list)
      })
    },
    handleSelect(item) {
      console.log(item)
    }
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>
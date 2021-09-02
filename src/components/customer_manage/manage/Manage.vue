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
        <ul>
          <div v-for="customer in this.rows" :key="customer.id" style="margin: 2%">
            <customer :data="customer"/>
          </div>
        </ul>
      </el-main>
      <el-footer>
        <div class="pagination" v-if="pageshow">
          <el-pagination
              :total="pages"
              @current-change="handleCurrentChange"
              :current-change.sync="currentPage"
              layout="prev, pager, next">
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import CustomerCard from "@/components/customer_manage/manage/CustomerCard";
import axios from "axios";

export default {
  components: {
    customer: CustomerCard,
  },
  data() {
    return {
      rows: [],
      name: '',
      timeout: null,
      pages: 0,
      currentPage: 0,
      pageshow: true
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
      this.search()
    },
    async search() {
      let data = []
      let total = 0
      await axios.get('http://localhost:8081/checkin/queryByNameWithPage/'+this.currentPage, {
        params: {
          name: this.name.toString()
        }
      }).then(function (response) {
        data = response.data.customers
        total = response.data.pages
      })
      this.rows = data
      this.pages = total * 10
    }
  },
  mounted() {
    this.search()
  }
}
</script>

<style scoped>

</style>
<template>
  <div>
    <el-container>
      <el-header style="text-align: center;">
        <el-autocomplete
            v-model="state"
            :fetch-suggestions="queryCustomer"
            placeholder="输入客户名称"
            @select="handleSelect"
        ></el-autocomplete>
      </el-header>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Checkin",
  data() {
    return {
      customers: [],
      state: '',
      timeout: null
    }
  },
  methods: {
    loadAll() {
      return [
        {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
        {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
        {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
        {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
        {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
        {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
        {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
        {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"},
        {"value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107"},
        {"value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号"}
      ]
    },
    queryCustomer(name, cb) {
      var customers = this.customers
      var results = name ? customers.filter(this.createStateFilter(name)) : customers
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter(name) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(name.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  },
  mounted() {
    this.customers = this.loadAll()
  }
}
</script>

<style scoped>

</style>
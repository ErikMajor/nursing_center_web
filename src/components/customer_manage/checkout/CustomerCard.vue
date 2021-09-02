<template>
  <el-card
      :body-style="{padding: '1%', margin: '1%'}"
      shadow="always"
      style="width: 100%"
  >
    <el-row :align="align" :gutter="20" :justify="justify">
      <el-col :span="4">

      </el-col>
      <el-col :span="10">
        <el-row justify="center">
          ID：{{ id }}
        </el-row>
        <el-row>
          姓名：{{ name }}
        </el-row>
        <el-row>
          年龄：{{ age }}岁
        </el-row>
        <el-row>
          性别：{{ sex }}
        </el-row>
        <el-row>
          身份证号：{{ idCard }}
        </el-row>
        <el-row>
          房间号：{{ roomId }}
        </el-row>
        <el-row>
          所属楼房：{{ buildingId }}
        </el-row>
        <el-row>
          档案号：{{ recordId }}
        </el-row>
        <el-row>
          老人类型：{{ elderType }}
        </el-row>
      </el-col>
      <el-col :span="10">
        <el-row>
          入住时间：{{ checkinDate }}
        </el-row>
        <el-row>
          服务到期时间：{{ expirationDate }}
        </el-row>
        <el-row>
          联系电话：{{ contactTel }}
        </el-row>
        <el-row>
          出生日期：{{ birthday }}
        </el-row>
        <el-row>
          身高：{{ height }}cm
        </el-row>
        <el-row>
          婚姻状况：{{ maritalStatus }}
        </el-row>
        <el-row>
          体重：{{ weight }}kg
        </el-row>
        <el-row>
          血型：{{ bloodType }}型
        </el-row>
        <el-row>
          备注信息：{{ remarks }}
        </el-row>
      </el-col>
    </el-row>
    <el-row>
      <el-button :disabled="checkout" plain type="danger" @click="dialogFormVisible = true">{{ info }}</el-button>
      <div v-if="checkout">
        <el-button plain type="primary" @click="dialogVisible = true">查看退住信息</el-button>
      </div>
      <el-dialog :visible.sync="dialogFormVisible" title="填写客户退住信息">
        <Dialog :data="this.customer.id"/>
      </el-dialog>
      <el-dialog :visible.sync="dialogVisible" title="修改退住信息">
        <Info :data="this.record"/>
      </el-dialog>
    </el-row>
  </el-card>
</template>

<script>
import CheckoutDialog from "@/components/customer_manage/checkout/CheckoutDialog";
import CheckoutInfo from "@/components/customer_manage/checkout/CheckoutInfo";

export default {
  props: ['data'],
  components: {
    Dialog: CheckoutDialog,
    Info: CheckoutInfo
  },
  data() {
    return {
      align: "middle",
      checkout: false,
      record: [{}],
      info: '退住',
      dialogFormVisible: false,
      dialogVisible: false,
      justify: "center",
      customer: this.data,
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

  },
  watch: {
    data(newVal) {
      this.customer = newVal
      this.id = newVal.id
      this.name = newVal.value
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
  methods: {},
  mounted() {
    this.id = this.customer.id
    this.name = this.customer.customerName
    this.age = this.customer.customerAge
    this.sex = this.customer.customerSex
    this.buildingId = this.customer.buildingId
    this.recordId = this.customer.recordId
    this.elderType = this.customer.elderType
    this.checkinDate = this.customer.checkinDate
    this.expirationDate = this.customer.expirationDate
    this.contactTel = this.customer.contactTel
    this.birthday = this.customer.birthday
    this.height = this.customer.height
    this.maritalStatus = this.customer.maritalStatus
    this.weight = this.customer.weight
    this.bloodType = this.customer.bloodType
    this.filePath = this.customer.filePath
    this.remarks = this.customer.remarks
    this.$ajax.get('http://localhost:8081/checkout/record', {
      params: {
        id: this.id
      }
    }).then(res => {
      if (res.data.record === null) {
        this.checkout = false
      } else {
        this.checkout = true
        this.record = res.data.record
      }
    })
  }
}
</script>

<style scoped>

</style>
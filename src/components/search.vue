<template>
  <div>
    <el-input v-model="searchInfo" placeholder="请输入部门／IP／域名／操作系统" icon="search"
      :on-icon-click="handleIconClick" class="inputStyle" style="width: 30%">
    </el-input>

    <el-table :data="hostSimpleInfo" stripe border style="width: 100%" v-show="allowToShow">
      <el-table-column prop="address" label="机房位置" width="100"></el-table-column>

      <el-table-column prop="vm_server_name" label="主机名称" width="220"></el-table-column>

      <el-table-column prop="department" label="所属部门" width="250"></el-table-column>

      <el-table-column prop="ip_address" label="主机IP" width="220"></el-table-column>

      <el-table-column prop="operating_system" label="操作系统" width="150"></el-table-column>

      <el-table-column prop="vm_responsible" label="主机责任人" width="150"></el-table-column>

      <el-table-column prop="vm_responsible_phone" label="联系电话"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template scope="scope">
          <el-button @click="handleClick" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        layout="total, prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        allowToShow: false,
        searchInfo: '',
        hostSimpleInfo: [
          {
            address: '东区',
            vm_server_name: '123456',
            department: '软件学院',
            ip_address: '123465',
            operating_system: 'centos 7',
            vm_responsible: 'Z',
            vm_responsible_phone: '12345667897'
          }
        ],
        currentPage1: 5
      }
    },
    methods: {
      handleClick () {
        console.log(1)
      },
      handleIconClick () {
        this.allowToShow = true
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      }
    }
  }
</script>

<style scpoed>
  .inputStyle {
    margin: 20px 0 20px 20px;
  }
</style>

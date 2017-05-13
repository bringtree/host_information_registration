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
          <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" v-show="allowToShow">
      <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="20"
        layout="total, prev, pager, next"
        :total="totalInfo">
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
        hostSimpleInfo: [],
        // totalInfo为后台发送回来一共有多少符合的数据
        totalInfo: 1000,
        currentPage1: 1,
        requestInfo: {
          page: '',
          limit: ''
        }
      }
    },
    methods: {
      handleClick (index, row) {
        this.$router.push({path: '/hostDetailed', query: { queryInfoID: index }})
      },
      handleIconClick () {
        this.allowToShow = true
        // 在这里加上搜索的ajax操作
        this.$ajax.post('http://localhost/hostInfo/hostSimpleInfo.php', this.requestInfo)
        .then((res) => {
          // console.log(JSON.parse(res.data.data))
          this.hostSimpleInfo = JSON.parse(res.data.data)
        }).catch(() => {
          this.err()
        })
      },
      // 下面的分页也要写ajax，要和后端协商好，如何拿数据
      handleCurrentChange (val) {
        // console.log(`当前页: ${val}`)
        this.$ajax.post('http://localhost/hostInfo/hostSimpleInfo_2.php', this.requestInfo)
          .then((res) => {
            this.hostSimpleInfo = JSON.parse(res.data.data)
          }).catch(() => {
            this.err()
          })
      },
      err: function () {
        this.$message({
          showClose: true,
          message: '网络异常',
          type: 'error'
        })
      }
    }
  }
</script>

<style scpoed>
  .inputStyle {
    margin: 20px 0 20px 20px;
  }
  .pagination {
    width: 344.19px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 30px;
  }
</style>

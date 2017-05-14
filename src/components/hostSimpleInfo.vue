<template>
  <div>
    <el-table :data="hostSimpleInfo" stripe border style="width: 100%">
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
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        class="pagination"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
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
        hostSimpleInfo: [],
        // totalInfo为后台发送回来一共有多少符合的数据,为int类型
        totalInfo: 0,
        pageSize: 10,
        currentPage: 1,
        requiredInfo: {
          page: 1,
          limit: 10
        }
      }
    },
    methods: {
      handleClick (index, row) {
        // 从row这行数据取得详情页请求的id
        this.$router.push({path: '/hostDetailed', query: { queryInfoID: row.id }})
      },
      handleDelete (index, row) {
        this.$confirm('此操作将删除该条主机信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res === 'confirm') {
            this.$ajax.post('http://localhost/hostInfo/hostSimpleInfo_2.php', row.id)
              .then((res) => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                })
              })
              .catch(() => {
                this.err()
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 下面的分页也要写ajax，要和后端协商好，如何拿数据
      handleCurrentChange (val) {
        // 点击页数时触发，请求后台更新数据
        this.requiredInfo.page = val
        this.$ajax.post('http://localhost/hostInfo/hostSimpleInfo_2.php', this.requiredInfo)
          .then((res) => {
            this.hostSimpleInfo = JSON.parse(res.data.data)
            this.totalInfo = Number(res.data.totalInfo)
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
    },
    mounted: function () {
      this.$ajax.post('http://localhost/hostInfo/hostSimpleInfo.php', this.requiredInfo)
        .then((res) => {
          this.hostSimpleInfo = JSON.parse(res.data.data)
          this.totalInfo = Number(res.data.totalInfo)
        }).catch(() => {
          this.err()
        })
    }
  }
</script>

<style scpoed>
  .pagination {
    width: 344.19px;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 30px;
  }
</style>

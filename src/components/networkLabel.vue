<template>
  <div>
    <el-button type="text" @click="addFormVisible = true">点击添加网络标签</el-button>
    <div>
      <el-dialog title="添加网络标签" v-model="addFormVisible">
        <el-form :model="addForm">
          <el-form-item label="网络标签名称" :label-width="modifyLabelWidth">
            <el-input v-model="addForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="vlan ID" :label-width="modifyLabelWidth">
            <el-input v-model="addForm.valn_id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="modifyLabelWidth">
            <el-select v-model="addForm.status" placeholder="请选择状态">
              <el-option label="未启用" value=0></el-option>
              <el-option label="启用" value=1></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-table
        :data="tableData"
        border
        :default-sort="{prop: 'update_time', order: 'descending'}"
        style="width: 100%">
        <el-table-column
          label="id"
          width="100">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="网络标签名称"
          width="300"
        >
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="vlan ID"
        >
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.valn_id }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
        >
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status==1?'启用':'未启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最后修改日期"
          prop="update_time"
          sortable
          width="250">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.update_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="200"
        >
          <template scope="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- Form -->
      <el-dialog title="修改信息" v-model="modifyFormVisible">
        <el-form :model="modifyForm">
          <el-form-item label="网络标签名称" :label-width="modifyLabelWidth">
            <el-input v-model="modifyForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="vlan ID" :label-width="modifyLabelWidth">
            <el-input v-model="modifyForm.valn_id" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="modifyLabelWidth">
            <el-select v-model="modifyForm.status" placeholder="请选择状态">
              <el-option label="未启用" value=0></el-option>
              <el-option label="启用" value=1></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  /* eslint-disable eqeqeq */

  export default {
    data () {
      return {
        tableData: [],
        modifyFormVisible: false,
        addFormVisible: false,
        modifyForm: {
          index: '',
          id: '',
          name: '',
          valn_id: '',
          status: ''
        },
        addForm: {
          name: '',
          valn_id: '',
          status: ''
        },
        modifyLabelWidth: '120px'
      }
    },
    methods: {
      handleEdit (index, row) {
        this.modifyFormVisible = true
        this.modifyForm.index = index
        this.modifyForm.id = row.id
        this.modifyForm.name = row.name
        this.modifyForm.valn_id = row.valn_id
        this.modifyForm.status = row.status
      },
      handleDelete (index, row) {
        this.modifyForm.index = index
        this.modifyForm.id = row.id
        this.modifyForm.name = row.name
        this.modifyForm.valn_id = row.valn_id
        this.modifyForm.status = row.status
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res == 'confirm') {
            this.$ajax.post('', this.modifyForm)
              .then((res) => {
                this.tableData.splice(this.modifyForm.index, 1)
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                  showClose: true
                })
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '网络故障',
                  showClose: true
                })
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      modifySubmit () {
        this.modifyFormVisible = false
        this.$ajax.post('', this.modifyForm)
          .then((res) => {
            // 这一块 还差一个时间没更新
            this.tableData[this.modifyForm.index].id = this.modifyForm.id
            this.tableData[this.modifyForm.index].name = this.modifyForm.name
            this.tableData[this.modifyForm.index].valn_id = this.modifyForm.valn_id
            this.tableData[this.modifyForm.index].status = this.modifyForm.status
            this.$message({
              type: 'success',
              message: '编辑成功!',
              showClose: true
            })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '网络故障',
              showClose: true
            })
          })
      },
      addSubmit () {
        this.$ajax.post('', this.addForm)
          .then((res) => {
            // 这一块 还差一个时间和id没更新
            var o = {}
            o.name = this.addForm.name
            o.valn_id = this.addForm.valn_id
            o.status = this.addForm.status
            this.tableData.push(o)
            this.$message = {
              type: 'success',
              message: '添加成功',
              showClose: true
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '网络故障',
              showClose: true
            })
          })
      }
    },
    mounted () {
      this.$ajax.get('/network/info')
        .then((res) => {
          this.tableData = res.data.message
          console.log(res.data)
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
</script>

<template>
  <div>
    <el-button type="text" @click="registerFormVisible = true">点击添加新用户</el-button>
    <div>
      <el-dialog title="添加账号" v-model="registerFormVisible">
        <el-form :model="registerForm">
          <el-form-item label="用户名" :label-width="modifyLabelWidth">
            <el-input v-model="registerForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="modifyLabelWidth">
            <el-input v-model="registerForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="modifyLabelWidth">
            <el-input v-model="registerForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="modifyLabelWidth">
            <el-select v-model="registerForm.status" placeholder="请选择状态">
              <el-option label="未启用" value=0></el-option>
              <el-option label="启用" value=1></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="registerFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="registerSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          label="id"
          sortable
          width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="用户名"
        >
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="用户密码"
        >
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.password }}</span>
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
          sortable
          width="180">
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
          <el-form-item label="用户名" :label-width="modifyLabelWidth">
            <el-input v-model="modifyForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="modifyLabelWidth">
            <el-input v-model="modifyForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="modifyLabelWidth">
            <el-select v-model="modifyForm.status" placeholder="请选择状态">
              <el-option label="未启用" value=0></el-option>
              <el-option label="启用" value=1></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="registerFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="registerSubmit">确 定</el-button>
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
        tableData: [
          {
            'id': '1',
            'username': '0',
            'password': '重在参与',
            'status': '1',
            'update_time': 'xxxx-xx-xx'
          },
          {
            'id': '2',
            'username': '1',
            'password': '党委办公室',
            'status': '0',
            'update_time': 'xxxx-xx-xx'
          },
          {
            'id': '2',
            'username': '2',
            'password': '党委统战部',
            'update_time': 'xxxx-xx-xx'
          },
          {
            'id': '3',
            'username': '3',
            'password': '校长办公室',
            'update_time': 'xxxx-xx-xx'
          }
        ],
        modifyFormVisible: false,
        registerFormVisible: false,
        modifyForm: {
          index: '',
          id: '',
          username: '',
          password: '',
          status: ''
        },
        registerForm: {
          username: '',
          password: '',
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
        this.modifyForm.username = row.username
        this.modifyForm.password = row.password
        this.modifyForm.status = row.status
      },
      handleDelete (index, row) {
        this.modifyForm.index = index
        this.modifyForm.id = row.id
        this.modifyForm.username = row.username
        this.modifyForm.password = row.password
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
                  message: '删除成功!'
                })
              })
              .catch(() => {
                this.$message({
                  type: 'error',
                  message: '网络故障'
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
            this.tableData[this.modifyForm.index].username = this.modifyForm.username
            this.tableData[this.modifyForm.index].password = this.modifyForm.password
            this.tableData[this.modifyForm.index].status = this.modifyForm.status
            this.$message({
              type: 'success',
              message: '编辑成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '网络故障'
            })
          })
      },
      registerSubmit () {
        this.$ajax.post('', this.registerForm)
          .then((res) => {
            // 这一块 还差一个时间和id没更新
            var o = {}
            o.username = this.registerForm.username
            o.password = this.registerForm.password
            o.status = this.registerForm.status
            this.tableData.push(o)
            this.$message = {
              type: 'success',
              message: '注册成功'
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '网络故障'
            })
          })
      }
    }
  }
</script>

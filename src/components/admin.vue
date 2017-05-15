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
            <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="modifyLabelWidth">
            <el-input type="password" v-model="registerForm.password_verify" auto-complete="off"></el-input>
            <div class="el-form-item__error" v-if="warnWord_register">
              {{registerForm.username===''?'用户名不能为空':'两次输入的密码不一致'}}
            </div>
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
          <el-button type="primary" @click="registerSubmit" :disabled="warnWord_register">确 定</el-button>
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
          label="状态"
        >
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status==1?'启用':'未启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最后修改日期"
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
          <el-form-item label="用户名" :label-width="modifyLabelWidth">
            <el-input v-model="modifyForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="modifyLabelWidth">
            <el-input type="password" v-model="modifyForm.password" auto-complete="off"
                      placeholder="空白表示不修改密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="modifyLabelWidth">
            <el-input type="password" v-model="modifyForm.password_verify" auto-complete="off"
                      placeholder="空白表示不修改密码"></el-input>
            <div class="el-form-item__error" v-if="warnWord_modify">
              {{modifyForm.username===''?'用户名不能为空':'两次输入的密码不一致'}}
            </div>
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
          <el-button type="primary" @click="modifySubmit" :disabled="warnWord_modify">确 定</el-button>
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
        warnWord_modify: false,
        warnWord_register: false,
        modifyFormVisible: false,
        registerFormVisible: false,
        modifyForm: {
          row: '',
          id: '',
          username: '',
          password: '',
          password_verify: '',
          status: ''
        },
        registerForm: {
          username: '',
          password: '',
          password_verify: '',
          status: '0'
        },
        modifyLabelWidth: '120px'
      }
    },
    methods: {
      handleEdit (index, row) {
        this.modifyFormVisible = true
        this.modifyForm.row = row
        this.modifyForm.id = row.id
        this.modifyForm.username = row.username
        this.modifyForm.password = ''
        this.modifyForm.password_verify = ''
        this.modifyForm.status = row.status
      },
      handleDelete (index, row) {
        this.modifyForm.index = index
        this.modifyForm.id = row.id
        this.modifyForm.username = row.username
        this.modifyForm.password = ''
        this.modifyForm.password_verify = ''
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
            message: '已取消删除',
            showClose: true
          })
        })
      },
      modifySubmit () {
        this.modifyFormVisible = false
        var o = JSON.parse(JSON.stringify(this.modifyForm))
        if (o.password === '') {
          delete o.password
          delete o.password_verify
        }
        this.$ajax.post('/auth/updateUser', o)
          .then((res) => {
            switch (res.data.code) {
              case 10040:
                this.modifyForm.row.update_time = JSON.parse(res.data.data).update_time
                this.modifyForm.row.id = this.modifyForm.id
                this.modifyForm.row.username = this.modifyForm.username
                this.modifyForm.row.status = this.modifyForm.status
                this.$message({
                  type: 'success',
                  message: '编辑成功!',
                  showClose: true
                })
                break
              case 20040:
                this.$message({
                  type: 'error',
                  message: '用户id不存在!',
                  showClose: true
                })
                break
              case 20041:
                this.$message({
                  type: 'error',
                  message: '所修改用户的用户名已存在!',
                  showClose: true
                })
                break
              case 20042:
                this.$message({
                  type: 'error',
                  message: '所修改用户的用户名不能为空!',
                  showClose: true
                })
                break
            }
          })
          .catch((e) => {
            console.log(e)
            this.$message({
              type: 'error',
              message: '网络故障'
            })
          })
      },
      registerSubmit () {
        this.$ajax.post('/auth/addUser', this.registerForm)
          .then((res) => {
            console.log(res)
            // 这一块 还差一个时间和id没更新
            var o = {}
            o.username = this.registerForm.username
            o.password = this.registerForm.password
            o.status = this.registerForm.status
            this.tableData.push(o)
            this.$message = {
              type: 'success',
              message: '注册成功',
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
      this.$ajax.get('/auth/getUser')
        .then((res) => {
          switch (res.data.code) {
            case 20020:
              this.$message({
                type: 'error',
                message: '无用户信息可获取',
                showClose: true
              })
              break
            case 10020:
              this.$message({
                type: 'success',
                message: '获取用户成功',
                showClose: true
              })
              this.tableData = JSON.parse(res.data.data.slice(0, res.data.data.length))
              break
            default :
              this.$message({
                type: 'error',
                message: '网络故障',
                showClose: true
              })
          }
        })
        .catch((e) => {
          this.$message({
            type: 'error',
            message: '网络故障',
            showClose: true
          })
        })
    },
    watch: {
      modifyForm: {
        handler (o) {
          if (o.password !== o.password_verify) {
            this.warnWord_modify = true
          } else if (o.username === '') {
            this.warnWord_modify = true
          } else {
            this.warnWord_modify = false
          }
        },
        deep: true
      },
      registerForm: {
        handler (o) {
          if (o.password !== o.password_verify) {
            this.warnWord_register = true
          } else if (o.username === '') {
            this.warnWord_register = true
          } else {
            this.warnWord_register = false
          }
        },
        deep: true
      }

    }
  }
</script>

<style scoped>
  .password {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

<template>
  <div>
    <el-button type="text" @click="addFormVisible = true">点击添加部门</el-button>
    <div>
      <el-dialog title="点击添加部门" v-model="addFormVisible">
        <el-form :model="addForm">
          <el-form-item label="部门类型" :label-width="modifyLabelWidth">
            <el-select v-model="addForm.type" placeholder="请选择类型">
              <el-option label="机关部门" value=0></el-option>
              <el-option label="教学单位" value=1></el-option>
              <el-option label="教辅/科研单位" value=2></el-option>
              <el-option label="群团/附属单位" value=3></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="部门名字" :label-width="modifyLabelWidth">
            <el-input v-model="addForm.department"></el-input>
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
        style="width: 100%">
        <el-table-column
          label="类型"
          sortable
          prop="type"
          width="180">
          <template scope="scope">
            <el-tag>{{
              scope.row.type==0
              ?'机关部门'
              :(scope.row.type==1
              ?'教学单位'
              :(scope.row.type==2
              ?'教辅/科研单位'
              :'群团/附属单位'
              )
              )
              }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="部门名字"
        >
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.department }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="状态"
          width="100"
          sortable
          prop="status"
        >
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status==1?'启用':'未启用' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="最后修改日期"
          sortable
          prop="update_time"
          width="220">
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
          <el-form-item label="部门名字" :label-width="modifyLabelWidth">
            <el-input v-model="modifyForm.department" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="类型" :label-width="modifyLabelWidth">
            <el-select v-model="modifyForm.type" placeholder="请选择类型">
              <el-option label="机关部门" value=0></el-option>
              <el-option label="教学单位" value=1></el-option>
              <el-option label="教辅/科研单位" value=2></el-option>
              <el-option label="群团/附属单位" value=3></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" :label-width="modifyLabelWidth">
            <el-select v-model="modifyForm.status" placeholder="请选择状态">
              <el-option label="未启用" value=0></el-option>
              <el-option label="启用" value=1></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="modifyFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifySubmit">确 定</el-button>
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
        modifyForm: {
          id: '',
          department: '',
          status: '',
          type: '',
          row: ''
        },
        addFormVisible: false,
        addForm: {
          department: '',
          type: '',
          status: ''
        },
        modifyLabelWidth: '120px'
      }
    },
    methods: {
      handleEdit (index, row) {
        this.modifyFormVisible = true
        this.modifyForm.row = row
        this.modifyForm.id = row.id
        this.modifyForm.department = row.department
        this.modifyForm.status = row.status
        this.modifyForm.type = row.type
      },
      handleDelete (index, row) {
        this.modifyForm.index = index
        this.modifyForm.id = row.id
        this.modifyForm.department = row.department
        this.modifyForm.status = row.status
        this.modifyForm.type = row.type
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
        this.$ajax.post('/department/edit', this.modifyForm)
          .then((res) => {
            if (res.data.type === 'success') {
              this.modifyForm.row.update_time = res.data.update_time
              this.modifyForm.row.id = this.modifyForm.id
              this.modifyForm.row.department = this.modifyForm.department
              this.modifyForm.row.type = this.modifyForm.type
              this.modifyForm.row.status = this.modifyForm.status
              this.$message({
                type: 'success',
                message: '编辑成功!',
                showClose: true
              })
            } else {
              this.$message({
                type: 'error',
                message: '编辑失败!',
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
      addSubmit () {
        this.$ajax.post('/department/add', this.addForm)
          .then((res) => {
            if (res.data.type === 'success') {
              var o = {}
              o.id = res.data.id
              o.update_time = res.data.update_time
              o.department = this.addForm.department
              o.type = this.addForm.type
              o.status = this.addForm.status
              this.tableData.push(o)
              this.addFormVisible = false
              this.$message({
                type: 'success',
                message: '添加成功',
                showClose: true
              })
            } else {
              this.$message({
                type: 'error',
                message: '添加失败',
                showClose: true
              })
            }
          })
          .catch((e) => {
            console.log(e)
            this.$message({
              type: 'error',
              message: '网络故障',
              showClose: true
            })
          })
      }
    },
    mounted () {
      this.$ajax.get('/department/info')
        .then((res) => {
          if (res.data.type === 'success') {
            this.$message({
              type: 'success',
              message: '信息载入成功',
              showClose: true
            })
            this.tableData = res.data.message
          } else {
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
    }
  }
</script>

<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="类型"
        sortable
        width="180">
        <template scope="scope">
          <el-tag>{{
            scope.row.type===0
            ?'机关部门'
            :(scope.row.type===1
            ?'教学单位'
            :(scope.row.type===2
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
        label="最后修改日期"
        sortable
        width="180">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
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
          <el-select v-model="modifyForm.type" placeholder="请选择活动区域">
            <el-option label="机关部门" value="0"></el-option>
            <el-option label="教学单位" value="1"></el-option>
            <el-option label="教辅/科研单位" value="2"></el-option>
            <el-option label="群团/附属单位" value="3"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifySubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tableData: [
          {
            'id': 1,
            'type': 0,
            'department': '重在参与',
            'updateTime': 'xxxx-xx-xx'
          },
          {
            'id': 1,
            'type': 1,
            'department': '党委办公室',
            'updateTime': 'xxxx-xx-xx'
          },
          {
            'id': 2,
            'type': 2,
            'department': '党委统战部',
            'updateTime': 'xxxx-xx-xx'
          },
          {
            'id': 3,
            'type': 3,
            'department': '校长办公室',
            'updateTime': 'xxxx-xx-xx'
          }
        ],
        modifyFormVisible: false,
        modifyForm: {
          index: '',
          id: '',
          department: '',
          type: ''
        },
        modifyLabelWidth: '120px'
      }
    },
    methods: {
      handleEdit (index, row) {
        this.modifyFormVisible = true
        this.modifyForm.index = index
        this.modifyForm.id = row.id
        this.modifyForm.department = row.department
        this.modifyForm.type = row.type
      },
      handleDelete (index, row) {
        this.modifyForm.index = index
        this.modifyForm.id = row.id
        this.modifyForm.department = row.department
        this.modifyForm.type = row.type
        this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then((res) => {
          if (res === 'confirm') {
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
            this.tableData[this.modifyForm.index].department = this.modifyForm.department
            this.tableData[this.modifyForm.index].type = this.modifyForm.type
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
      }
    }
  }
</script>

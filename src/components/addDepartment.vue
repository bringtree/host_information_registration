<template>
  <div>
    <div style="margin: 20px;"></div>
    <el-form label-position="right" label-width="80px" :model="formLabelAlign">
      <el-form-item label="部门类型">
        <el-input v-model="department.type"></el-input>
      </el-form-item>
      <el-form-item label="部门名字">
        <el-input v-model="department.name"></el-input>
      </el-form-item>
      <el-form-item label="状态" >
        <el-select v-model="department.status" placeholder="请选择状态">
          <el-option label="未启用" value=0></el-option>
          <el-option label="启用" value=1></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="float:right;width:100px; margin:20px" @click="add">添加</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        department: {
          name: '',
          status: '',
          type: ''
        }
      }
    },
    methods: {
      add () {
        this.$ajax.post('', this.department)
          .then((res) => {
            this.$message = {
              type: 'success',
              message: '添加成功'
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

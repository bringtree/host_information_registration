<template>
  <div>
    <div>
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">
          <router-link to="/hostSimpleInfo">所有主机信息</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/addHost">增加主机信息</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/search">搜索</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/adddepartment">添加所属部门</router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link to="/department">所属部门</router-link>
        </el-menu-item>
        <el-menu-item index="6">
          <router-link to="/networkLabel">网络标签</router-link>
        </el-menu-item>
        <el-menu-item index="7">
          <router-link to="/admin">管理员</router-link>
        </el-menu-item>
      </el-menu>
    </div>

    <div>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        // 每次点击导航时都会将当前的激活index保存到sessionStorage
        // sessionStorage.activekey = key
      }
    },
    mounted: function () {
      // 使得页面刷新时导航的activeIndex不会每次都被初始化为1
      // let key = sessionStorage.activekey
      // this.activeIndex = key
    }
  }
</script>


<style scoped>

</style>

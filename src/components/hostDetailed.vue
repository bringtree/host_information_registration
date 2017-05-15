<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="card-header" style="line-height: 36px;">主机详细信息</span>
        <el-button style="float: right;" type="primary" @click="diologShow">编辑</el-button>
      </div>

      <div class="text item clearfix">
        <div class="contentLeft">信息录入人</div>
        <div class="contentRight">{{ hostInfo.username }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">机房位置</div>
        <div class="contentRight">{{ hostInfo.address }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">网络标签</div>
        <div class="contentRight">{{ hostInfo.network_tag }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">所属部门</div>
        <div class="contentRight">{{ hostInfo.department }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">操作系统</div>
        <div class="contentRight">{{ hostInfo.operating_system }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">所属资源池</div>
        <div class="contentRight">{{ hostInfo.re_pool }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">虚机服务器名称</div>
        <div class="contentRight">{{ hostInfo.vm_server_name }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">位数</div>
        <div class="contentRight">{{ hostInfo.num_bit }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">cpu(核数)</div>
        <div class="contentRight">{{ hostInfo.kernel }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">内存（GB）</div>
        <div class="contentRight">{{ hostInfo.ram }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">硬盘1（GB）</div>
        <div class="contentRight">{{ hostInfo.hard_disk_1 }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">硬盘2（GB）</div>
        <div class="contentRight">{{ hostInfo.hard_disk_2 }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">ip地址</div>
        <div class="contentRight">{{ hostInfo.ip_address }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">是否有加密狗</div>
        <div class="contentRight">{{ hostInfo.dongle }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">管理员账号</div>
        <div class="contentRight">{{ hostInfo.admin_account }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">管理员密码</div>
        <div class="contentRight">{{ hostInfo.admin_psw }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">堡垒机对应账号</div>
        <div class="contentRight">{{ hostInfo.sas_account }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">堡垒机对应账号密码</div>
        <div class="contentRight">{{ hostInfo.sas_password }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">开通时间</div>
        <div class="contentRight">{{ hostInfo.opening_time }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">主机责任人</div>
        <div class="contentRight">{{ hostInfo.vm_responsible }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">责任人联系电话</div>
        <div class="contentRight">{{ hostInfo.vm_responsible_phone }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">新应用上线是否检测</div>
        <div class="contentRight">{{ hostInfo.online_detection }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">检测时间</div>
        <div class="contentRight">{{ hostInfo.detection_time }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">备注</div>
        <div class="contentRight">{{ hostInfo.remark }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">状态</div>
        <div class="contentRight">{{ hostInfo.status }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">注册时间</div>
        <div class="contentRight">{{ hostInfo.create_time }}</div>
      </div>

      <hr>

      <div class="text item clearfix">
        <div class="contentLeft">更新时间</div>
        <div class="contentRight">{{ hostInfo.update_time }}</div>
      </div>
    </el-card>


    <el-dialog title="修改主机信息" :visible.sync="dialogFormVisible" top="0">
      <el-form :model="hostInfo">
        <el-form-item label="信息录入人" prop="username">
          <el-input v-model="hostInfo.username" placeholder="请输入信息录入人名字"></el-input>
        </el-form-item>

        <el-form-item label="机房位置" prop="address">
          <el-select v-model="hostInfo.address" placeholder="请选择机房位置" style="width:100%">
            <el-option label="华山" value="华山"></el-option>
            <el-option label="东区" value="东区"></el-option>
            <el-option label="教三" value="教三"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="网络标签" prop="network_tag">
          <el-select v-model="hostInfo.network_tag" placeholder="请选择网络标签" style="width:100%">
            <el-option label="MetcServers" value="MetcServers"></el-option>
            <el-option label="DepartmentServers" value="DepartmentServers"></el-option>
            <el-option label="CollegeServers_dq" value="CollegeServers_dq"></el-option>
            <el-option label="DataBase" value="DataBase"></el-option>
            <el-option label="ipaa" value="ipaa"></el-option>
            <el-option label="hmt_development_testing" value="hmt_development_testing"></el-option>
            <el-option label="hmt_softdevelopment" value="hmt_softdevelopment"></el-option>
            <el-option label="hmt_development_producting" value="hmt_development_producting"></el-option>
            <el-option label="softwareDevelopment" value="softwareDevelopment"></el-option>
            <el-option label="VDIServers" value="VDIServers"></el-option>
            <el-option label="SafeManage" value="SafeManage"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属部门" prop="department">
          <el-select v-model="hostInfo.department" placeholder="请选择所属部门" style="width:100%">
            <el-option-group label="机关部处" value="机关部处">
              <el-option label="党委办公室" value="党委办公室"></el-option>
              <el-option label="党委统战部" value="党委统战部"></el-option>
              <el-option label="校长办公室" value="校长办公室"></el-option>
              <el-option label="党委组织部（党校办公室）、机关党委" value="党委组织部（党校办公室）、机关党委"></el-option>
              <el-option label="纪委办、监察处" value="纪委办、监察处"></el-option>
              <el-option label="党委宣传部" value="党委宣传部"></el-option>
              <el-option label="党委学生工作部、学生工作处" value="党委学生工作部、学生工作处"></el-option>
              <el-option label="党委保卫部、人民武装部、保卫处" value="党委保卫部、人民武装部、保卫处"></el-option>
              <el-option label="人事处（校人才交流中心）、人才工作办公室" value="人事处（校人才交流中心）、人才工作办公室"></el-option>
              <el-option label="教务处" value="教务处"></el-option>
              <el-option label="研究生院" value="研究生院"></el-option>
              <el-option label="党委研究生工作部" value="党委研究生工作部"></el-option>
              <el-option label="招生就业处（招生办公室、就业指导中心）" value="招生就业处（招生办公室、就业指导中心）"></el-option>
              <el-option label="科学技术处" value="科学技术处"></el-option>
              <el-option label="人文社会科学处" value="人文社会科学处"></el-option>
              <el-option label="发展规划处（高教研究所）" value="发展规划处（高教研究所）"></el-option>
              <el-option label="财务处" value="财务处"></el-option>
              <el-option label="资产管理处" value="资产管理处"></el-option>
              <el-option label="后勤处（基建办）" value="后勤处（基建办）"></el-option>
              <el-option label="审计处" value="审计处"></el-option>
              <el-option label="国际交流处（港澳台事务办公室）" value="国际交流处（港澳台事务办公室）"></el-option>
              <el-option label="离退休工作处" value="离退休工作处"></el-option>
              <el-option label="设备处（暂保留）" value="设备处（暂保留）"></el-option>
            </el-option-group>
            <el-option-group label="教学单位" value="教学单位">
              <el-option label="农学院" value="农学院"></el-option>
              <el-option label="林学与风景园林学院" value="林学与风景园林学院"></el-option>
              <el-option label="园艺学院" value="园艺学院"></el-option>
              <el-option label="兽医学院" value="兽医学院"></el-option>
              <el-option label="动物科学学院" value="动物科学学院"></el-option>
              <el-option label="资源环境学院" value="资源环境学院"></el-option>
              <el-option label="海洋学院" value="海洋学院"></el-option>
              <el-option label="生命科学学院" value="生命科学学院"></el-option>
              <el-option label="工程学院" value="工程学院"></el-option>
              <el-option label="食品学院" value="食品学院"></el-option>
              <el-option label="水利与土木工程学院" value="水利与土木工程学院"></el-option>
              <el-option label="材料与能源学院" value="材料与能源学院"></el-option>
              <el-option label="数学与信息学院、软件学院" value="数学与信息学院、软件学院"></el-option>
              <el-option label="电子工程学院" value="电子工程学院"></el-option>
              <el-option label="经济管理学院" value="经济管理学院"></el-option>
              <el-option label="公共管理学院" value="公共管理学院"></el-option>
              <el-option label="人文与法学学院" value="人文与法学学院"></el-option>
              <el-option label="外国语学院" value="外国语学院"></el-option>
              <el-option label="艺术学院" value="艺术学院"></el-option>
              <el-option label="马克思主义学院" value="马克思主义学院"></el-option>
              <el-option label="体育教学研究部" value="体育教学研究部"></el-option>
              <el-option label="继续教育学院" value="继续教育学院"></el-option>
              <el-option label="国际教育学院" value="国际教育学院"></el-option>
              <el-option label="创新创业学院" value="创新创业学院"></el-option>
              <el-option label="珠江学院" value="珠江学院"></el-option>
            </el-option-group>
            <el-option-group label="教辅/科研单位" value="教辅/科研单位">
              <el-option label="新农村发展研究院" value="新农村发展研究院"></el-option>
              <el-option label="重点实验室建设办公室" value="重点实验室建设办公室"></el-option>
              <el-option label="试验中心、农事训练中心" value="试验中心、农事训练中心"></el-option>
              <el-option label="测试中心" value="测试中心"></el-option>
              <el-option label="实验动物中心" value="实验动物中心"></el-option>
              <el-option label="现代教育技术中心" value="现代教育技术中心"></el-option>
              <el-option label="公共基础课实验教学中心" value="公共基础课实验教学中心"></el-option>
              <el-option label="工程基础教学与训练中心" value="工程基础教学与训练中心"></el-option>
              <el-option label="图书馆" value="图书馆"></el-option>
              <el-option label="档案馆" value="档案馆"></el-option>
              <el-option label="华南农业博物馆筹建办公室" value="华南农业博物馆筹建办公室"></el-option>
              <el-option label="中国农业历史遗产研究所" value="中国农业历史遗产研究所"></el-option>
              <el-option label="学报编辑部" value="学报编辑部"></el-option>
              <el-option label="亚热带农业生物资源保护与利用国家重点实验室" value="亚热带农业生物资源保护与利用国家重点实验室"></el-option>
              <el-option label="国家植物航天育种工程技术研究中心" value="国家植物航天育种工程技术研究中心"></el-option>
              <el-option label="国家生猪种业工程技术研究中心" value="国家生猪种业工程技术研究中心"></el-option>
              <el-option label="农业部转基因植物及植物用微生物环境安全监督检验测试中心（广州）" value="农业部转基因植物及植物用微生物环境安全监督检验测试中心（广州）"></el-option>
              <el-option label="广东农村政策研究中心" value="广东农村政策研究中心"></el-option>
            </el-option-group>
            <el-option-group label="群团/附属单位" value="群团/附属单位">
              <el-option label="中国教育工会华南农业大学委员会" value="中国教育工会华南农业大学委员会"></el-option>
              <el-option label="中国共产主义青年团华南农业大学委员会" value="中国共产主义青年团华南农业大学委员会"></el-option>
              <el-option label="华南农业大学校友会、广东省华南农业大学教育发展基金会" value="华南农业大学校友会、广东省华南农业大学教育发展基金会"></el-option>
              <el-option label="广东华农大资产经营有限公司" value="广东华农大资产经营有限公司"></el-option>
              <el-option label="校医院" value="校医院"></el-option>
              <el-option label="附属小学" value="附属小学"></el-option>
              <el-option label="幼儿园" value="幼儿园"></el-option>
            </el-option-group>
          </el-select>
        </el-form-item>

        <el-form-item label="操作系统" prop="operating_system">
          <el-select v-model="hostInfo.operating_system" placeholder="请选择操作系统" style="width:100%">
            <el-option label="centos6" value="centos6"></el-option>
            <el-option label="centos7" value="centos7"></el-option>
            <el-option label="Ubuntu12.04" value="Ubuntu12.04"></el-option>
            <el-option label="Ubuntu14.04" value="Ubuntu14.04"></el-option>
            <el-option label="Ubuntu16.04" value="Ubuntu16.04"></el-option>
            <el-option label="Windows2003" value="Windows2003"></el-option>
            <el-option label="Windows2008R2T" value="Windows2008R2T"></el-option>
            <el-option label="Windows2012" value="Windows2012"></el-option>
            <el-option label="RedHat6" value="RedHat6"></el-option>
            <el-option label="RedHat7" value="RedHat7"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属资源池" prop="re_pool">
          <el-input v-model="hostInfo.re_pool" placeholder="请输入所属资源池"></el-input>
        </el-form-item>

        <el-form-item label="虚机服务器名称" prop="vm_server_name">
          <el-input v-model="hostInfo.vm_server_name" placeholder="请输入虚机服务器名称"></el-input>
        </el-form-item>

        <el-form-item label="位数" prop="num_bit">
          <el-select v-model="hostInfo.num_bit" placeholder="请选择操作系统位数" style="width:100%">
            <el-option label="32位" value="0"></el-option>
            <el-option label="64位" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="cpu(核数)" prop="kernel">
          <el-input v-model="hostInfo.kernel" placeholder="请输入cpu(核数)"></el-input>
        </el-form-item>

        <el-form-item label="内存（GB）" prop="ram">
          <el-input v-model="hostInfo.ram" placeholder="请输入内存（GB）"></el-input>
        </el-form-item>

        <el-form-item label="硬盘1（GB）" prop="hard_disk_1">
          <el-input v-model="hostInfo.hard_disk_1" placeholder="请输入硬盘1（GB）"></el-input>
        </el-form-item>

        <el-form-item label="硬盘2（GB）" prop="hard_disk_2">
          <el-input v-model="hostInfo.hard_disk_2" placeholder="请输入硬盘2（GB）"></el-input>
        </el-form-item>

        <el-form-item label="ip地址" prop="ip_address">
          <el-input v-model="hostInfo.ip_address" placeholder="请输入ip地址"></el-input>
        </el-form-item>

        <el-form-item label="是否有加密狗" prop="dongle">
          <el-select v-model="hostInfo.dongle" placeholder="请选择是否有加密狗" style="width:100%">
            <el-option label="无" value="0"></el-option>
            <el-option label="有" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="管理员账号" prop="admin_account">
          <el-input v-model="hostInfo.admin_account" placeholder="请输入管理员账号"></el-input>
        </el-form-item>

        <el-form-item label="管理员密码" prop="admin_psw">
          <el-input v-model="hostInfo.admin_psw" placeholder="请输入管理员密码"></el-input>
        </el-form-item>

        <el-form-item label="堡垒机对应账号" prop="sas_account">
          <el-input v-model="hostInfo.sas_account" placeholder="请输入堡垒机对应账号"></el-input>
        </el-form-item>

        <el-form-item label="堡垒机对应账号密码" prop="sas_password">
          <el-input v-model="hostInfo.sas_password" placeholder="请输入堡垒机对应账号密码"></el-input>
        </el-form-item>

        <el-form-item label="开通时间" prop="opening_time">
          <el-date-picker type="datetime" @change="opening_time_change" v-model="hostInfo.opening_time" placeholder="选择开通日期时间" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item label="主机责任人" prop="vm_responsible">
          <el-input v-model="hostInfo.vm_responsible" placeholder="请输入主机责任人"></el-input>
        </el-form-item>

        <el-form-item label="责任人联系电话" prop="vm_responsible_phone">
          <el-input v-model="hostInfo.vm_responsible_phone" placeholder="请输入责任人联系电话"></el-input>
        </el-form-item>

        <el-form-item label="新应用上线是否检测" prop="online_detection">
          <el-select v-model="hostInfo.online_detection" placeholder="请选择新应用上线是否检测" style="width:100%">
            <el-option label="否" value="0"></el-option>
            <el-option label="有" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="检测时间" prop="detection_time">
          <el-date-picker type="datetime" @change="detection_time_change" v-model="hostInfo.detection_time" placeholder="请选择检测日期时间" style="width: 100%;"></el-date-picker>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="hostInfo.status" placeholder="请选择状态" style="width:100%">
            <el-option label="未启用" value="0"></el-option>
            <el-option label="已启用" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="10" resize="none" v-model="hostInfo.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitChangeInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        hostInfo: {
          username: '',
          address: '',
          network_tag: '',
          department: '',
          operating_system: '',
          re_pool: '',
          vm_server_name: '',
          num_bit: '',
          kernel: '',
          ram: '',
          hard_disk_1: '',
          hard_disk_2: '',
          ip_address: '',
          dongle: '',
          admin_account: '',
          admin_psw: '',
          sas_account: '',
          sas_password: '',
          opening_time: '',
          vm_responsible: '',
          vm_responsible_phone: '',
          online_detection: '',
          detection_time: '',
          remark: '',
          status: '',
          create_time: '',
          update_time: ''
        },
        dialogFormVisible: false,
        queryInfoID: ''
      }
    },
    methods: {
      diologShow: function () {
        this.dialogFormVisible = true
      },
      submitChangeInfo: function () {
        this.dialogFormVisible = false
        // 在这里加上提交修改数据的ajax操作
        this.$ajax.post('http://localhost/hostInfo/hostDetailed.php', this.hostInfo)
          .then((res) => {
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
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
      },
      // 用element-ui提供的change回调返回格式化的数据
      // 因为暂时想不到办法判断是哪个时间触发的，所以先写了两个
      opening_time_change: function (val) {
        this.hostInfo.opening_time = val
      },
      detection_time_change: function (val) {
        this.hostInfo.detection_time = val
      }
    },
    mounted: function () {
      // 在这里加上初始化的数据操作
      // 拿到router传的query参数queryInfoID
      // 用queryInfoID请求后台数据
      this.queryInfoID = this.$route.query.queryInfoID
      // 缺少请求地址
      this.$ajax.post('http://localhost/hostInfo/hostDetailed.php', this.queryInfoID)
        .then((res) => {
          this.hostInfo = JSON.parse(res.data.data)
          // 将操作系统位数，是否有加密狗，新应用上线是否检测，状态转化为文字信息
          // if-else太low,也不好,改成三元操作符语句比较简洁
          this.hostInfo.num_bit = (this.hostInfo.num_bit === '0') ? '32位' : '64位'
          this.hostInfo.dongle = (this.hostInfo.dongle === '0') ? '无' : '有'
          this.hostInfo.online_detection = (this.hostInfo.online_detection === '0') ? '否' : '有'
          this.hostInfo.status = (this.hostInfo.status === '0') ? '未启用' : '已启用'
          /*
          if (this.hostInfo.num_bit === '0') {
            this.hostInfo.num_bit = '32位'
          } else if (this.hostInfo.num_bit === '1') {
            this.hostInfo.num_bit = '64位'
          }
          if (this.hostInfo.dongle === '0') {
            this.hostInfo.dongle = '无'
          } else if (this.hostInfo.dongle === '1') {
            this.hostInfo.dongle = '有'
          }
          if (this.hostInfo.online_detection === '0') {
            this.hostInfo.online_detection = '否'
          } else if (this.hostInfo.online_detection === '1') {
            this.hostInfo.online_detection = '有'
          }
          if (this.hostInfo.status === '0') {
            this.hostInfo.status = '未启用'
          } else if (this.hostInfo.status === '1') {
            this.hostInfo.status = '已启用'
          }
          */
        }).catch(() => {
          this.err()
        })
    }
  }
</script>


<style scoped>
  .card-header {
    font-size: 20px;
    font-weight: bold;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 10px 0;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .box-card {
    margin: 0 auto;
    width: 60%;
  }
  .contentLeft {
    float: left;
    width: 60%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
  }
  .contentRight {
    float: left;
    width: 40%;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
  }
</style>

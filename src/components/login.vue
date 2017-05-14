<template>
  <div>
    <div class="printer-container">
      <span id="teletype" v-html="form.type">{{form.type}}<span>|</span></span>
    </div>
    <div class="login">
      <h1>登录</h1>
      <input type="text" v-model="form.username" class="username" placeholder="用户名">
      <input type="password" v-model="form.password" class="password" placeholder="密码">
      <button type="submit" @click="login">提交</button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        form: {
          username: '',
          password: '',
          type: ''
        }
      }
    },
    methods: {
      login () {
        this.$ajax.post('/auth/login', this.form)
          .then((res) => {
            switch (res.data.code) {
              case 10010:
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push('/home')
                break
              case 20010:
                this.$message({
                  message: '用户不存在',
                  type: 'error'
                })
                break
              case 20011:
                this.$message({
                  message: '密码错误',
                  type: 'error'
                })
                break
              case 20012:
                this.$message({
                  message: '用户未启用',
                  type: 'error'
                })
                break
              case 20013:
                this.$message({
                  message: '用户已被删除',
                  type: 'error'
                })
                break
              case 10001:
                this.$message({
                  message: '系统错误',
                  type: 'error'
                })
                break
              default:
                this.$message({
                  message: '系统错误',
                  type: 'error'
                })
            }
          })
          .catch(() => {
            this.$message({
              message: '网络故障',
              type: 'error'
            })
          })
      }
    },
    mounted () {
      var word = '我就是那个漂亮的背景图<br /> ......'.split('')
      for (var i = 0; i < word.length; i++) {
        ((i) => {
          setTimeout(() => {
            this.form.type += (word[i])
          }, 300 * i)
        })(i)
      }
    }
  }

</script>

<style scoped>
  @keyframes blink {
    from, to {
      color: transparent;
    }
    50% {
      color: black;
    }
  }

  #teletype {
    font-size: 50px;
  }

  #teletype span {
    animation: blink 1s step-end infinite;
  }

  body {
    background: #f8f8f8;
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #fff;
  }

  .login {
    margin: 120px auto 0 auto;
    position: relative;
    width: 305px;
    text-align: center;
  }

  h1 {
    font-size: 30px;
    font-weight: 700;
    text-shadow: 0 1px 4px rgba(0, 0, 0, .2);
  }

  input {
    width: 270px;
    height: 42px;
    margin-top: 25px;
    padding: 0 15px;
    background: #2d2d2d;
    background-color: rgba(45, 45, 45, .15);
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #3d3d3d;
    border: 1px solid rgba(255, 255, 255, .15);
    -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset;
    -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, .1) inset;
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
  }

  button {
    cursor: pointer;
    width: 300px;
    height: 44px;
    margin-top: 25px;
    padding: 0;
    background: #ef4300;
    -moz-border-radius: 6px;
    -webkit-border-radius: 6px;
    border-radius: 6px;
    border: 1px solid #ff730e;
    -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .25) inset,
    0 2px 7px 0 rgba(0, 0, 0, .2);
    -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .25) inset,
    0 2px 7px 0 rgba(0, 0, 0, .2);
    box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .25) inset,
    0 2px 7px 0 rgba(0, 0, 0, .2);
    font-family: 'PT Sans', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .1);
    -o-transition: all .2s;
    -moz-transition: all .2s;
    -webkit-transition: all .2s;
    -ms-transition: all .2s;
  }

  button:hover {
    -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset,
    0 2px 7px 0 rgba(0, 0, 0, .2);
    -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset,
    0 2px 7px 0 rgba(0, 0, 0, .2);
    box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset,
    0 2px 7px 0 rgba(0, 0, 0, .2);
  }

  button:active {
    -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset,
    0 2px 7px 0 rgba(0, 0, 0, .2);
    -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, .15) inset,
    0 2px 7px 0 rgba(0, 0, 0, .2);
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, .1) inset,
    0 1px 4px 0 rgba(0, 0, 0, .1);

    border: 0px solid #ef4300;
  }
</style>

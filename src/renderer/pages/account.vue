<template>
  <div class="account-page">
    <Button type="primary" @click.native="login">添加账号</Button>
    <Button type="primary" @click.native="clear">清空账号</Button>
    <Table style="margin-top: 10px;" :columns="columns" :data="accountList"></Table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  const { BrowserWindow } = require('electron').remote

  export default {
    name: 'account',
    data () {
      return {
        columns: [
          {
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            title: '账号',
            key: 'name'
          },
          {
            title: '登录状态',
            key: 'isLogin'
          },
          {
            title: 'plus会员',
            key: 'isPlusMember'
          }
        ]
      }
    },
    computed: {
      ...mapGetters('user', ['accountList'])
    },
    created () {
      this.$store.dispatch('user/checkAccountList')
    },
    methods: {
      login () {
        const loginWin = new BrowserWindow({
          width: 800,
          height: 600
        })
        loginWin.loadURL('https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fwww.jd.com%2F')
        loginWin.webContents.on('did-navigate', (event, url) => {
          console.log('did-navigate=================>', url)
          if (url !== 'https://www.jd.com/') {
            return
          }
          loginWin.webContents.session.cookies.get({domain: '.jd.com'}, (error, cookies) => {
            if (error) {
              this.$Message.error('获取Cookies失败！')
            }
            const cookieStr = cookies.reduce((str, cookie) => {
              const {
                name,
                value
              } = cookie
              str += `${name}=${value};`
              return str
            }, '')
            console.log('did-navigate webContents cookies=================>', cookieStr)
            loginWin.destroy()
            this.$store.dispatch('user/saveAccount', cookieStr)
            this.$Message.success('账号已添加！')
          })
        })
      },
      clear () {
        this.$store.commit('user/CLEAR_ALL')
      }
    }
  }
</script>

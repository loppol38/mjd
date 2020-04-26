<template>
  <div class="task-page">
    <List border>
      <ListItem style="background-color: #ffffff;">
        <ListItemMeta avatar="http://img13.360buyimg.com/n5/jfs/t1/97097/12/15694/245806/5e7373e6Ec4d1b0ac/9d8c13728cc2544d.jpg" title="飞天" description="每天10:30预约，次日10:00抢购" />
        <template slot="action">
          <li>
            <a href="#" @click="createOrders(100012043978, 2)">开抢</a>
          </li>
          <li>
            <a href="#" @click="stopAll">停止</a>
          </li>
        </template>
      </ListItem>
    </List>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  const api = require('electron').remote.require('./api').default

  export default {
    name: 'task',
    data () {
      return {
        timers: []
      }
    },
    computed: {
      ...mapGetters('user', ['accountList'])
    },
    methods: {
      createOrders (sku, num) {
        this.$Notice.open({
          name: 'task_start_notice',
          title: '开抢~'
        })
        for (let i = 0; i < this.accountList.length; i++) {
          let task = setInterval(() => {
            this.createOrder(this.accountList[i].cookie, sku, num, this.accountList[i].pinId, this.accountList[i].name)
          }, 1000)
          this.timers.push({
            pinId: this.accountList[i].pinId,
            task
          })
        }
      },
      async createOrder (cookie, sku, num, pinId, name) {
        try {
          const buyInfo = await api.jd.getBuyInfo(cookie, sku, num)
          const submitResult = await api.jd.orderSubmit(cookie, sku, num, buyInfo)
          if (submitResult && submitResult.success) {
            this.stopTask(pinId)
            this.$Notice.open({
              title: `恭喜,账号「${name}」已抢到`,
              desc: '此账号不再参与本轮抢购~',
              duration: 0
            })
          } else if (submitResult && submitResult.errorMessage) {
            this.$Message.info(submitResult.errorMessage)
          } else {
            this.$Message.info('抢购失败，还未到时间')
          }
        } catch (e) {
          window.alert(e.message)
        } finally {
          this.$Notice.close('task_start_notice')
        }
      },
      stopAll () {
        for (let i = 0; i < this.timers.length; i++) {
          let task = this.timers[i].task
          clearInterval(task)
        }
        this.timers = []
      },
      stopTask (pinId) {
        for (let i = 0; i < this.timers.length; i++) {
          if (this.timers[i].pinId === pinId) {
            clearInterval(this.timers[i].task)
            this.timers.splice(i, 1)
            break
          }
        }
      }
    }
  }
</script>

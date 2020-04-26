<template>
  <div id="app">
    <Menu mode="horizontal" theme="light" active-name="account">
      <MenuItem name="account" to="/">
        <Icon type="ios-people" />
        账号管理
      </MenuItem>
      <MenuItem name="task" to="/task">
        <Icon type="ios-paper" />
        任务清单
      </MenuItem>
<!--      <Submenu name="3">-->
<!--        <template slot="title">-->
<!--          <Icon type="ios-stats" />-->
<!--          统计分析-->
<!--        </template>-->
<!--        <MenuGroup title="使用">-->
<!--          <MenuItem name="3-1">新增和启动</MenuItem>-->
<!--          <MenuItem name="3-2">活跃分析</MenuItem>-->
<!--          <MenuItem name="3-3">时段分析</MenuItem>-->
<!--        </MenuGroup>-->
<!--        <MenuGroup title="留存">-->
<!--          <MenuItem name="3-4">用户留存</MenuItem>-->
<!--          <MenuItem name="3-5">流失用户</MenuItem>-->
<!--        </MenuGroup>-->
<!--      </Submenu>-->
    </Menu>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mjd'
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  #app {
    background: radial-gradient(
      ellipse at center,
      rgba(229, 229, 229, 1) 40%,
      rgba(200, 200, 200, .9) 100%
    );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }
</style>
<style scoped>
  .main {
    padding-top: 10px;
  }
</style>

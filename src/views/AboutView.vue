<template>
  <div>我的
    <router-link to="/about/user">我的-个人信息</router-link>
    &nbsp
    <router-link to="/about/address">我的-地址管理</router-link>
    <router-view></router-view>
  </div>
</template> 

<script>
export default {
  mounted() {
    console.log('this.$route',this.$route);
    console.log('this.$router', this.$router);
  }
}
</script>

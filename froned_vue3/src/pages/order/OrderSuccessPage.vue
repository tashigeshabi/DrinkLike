<template>
  <view class="container">
    <icon type="success" size="100" color="#4cd964" />
    <text class="success-text">支付成功</text>
    <button class="btn" type="primary" @click="goHome">返回首页</button>
  </view>
</template>

<script setup lang="ts">
const goHome = () => {
  uni.switchTab({
    url: '/pages/home/HomePage'
  })
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.success-text {
  font-size: 24px;
  margin: 20px 0;
  font-weight: bold;
}
.btn {
  width: 80%;
}
</style>

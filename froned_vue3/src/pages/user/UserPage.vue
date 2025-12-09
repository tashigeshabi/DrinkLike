<template>
  <view class="page-container">
    <!-- 顶部背景与用户信息 -->
    <view class="header-section" :style="{ paddingTop: statusBarHeight + 20 + 'px' }">
      <view class="user-card">
        <view class="avatar-box">
          <!-- 默认头像 -->
          <view class="avatar-placeholder"></view>
        </view>
        <view class="user-info">
          <text class="nickname">DrinkUser</text>
          <text class="vip-tag">VIP 会员</text>
        </view>
      </view>
    </view>

    <!-- 订单状态栏 -->
    <view class="order-status-card">
      <view class="card-header">
        <text class="card-title">我的订单</text>
        <text class="card-more">全部订单 ></text>
      </view>
      <view class="status-grid">
        <view class="status-item" v-for="(item, index) in orderStatus" :key="index">
          <text class="status-icon">{{ item.icon }}</text>
          <text class="status-text">{{ item.text }}</text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="menu-list">
      <view
        class="menu-item"
        v-for="(item, index) in menuList"
        :key="index"
        @click="handleMenuClick(item)"
      >
        <text class="menu-icon-left">{{ item.icon }}</text>
        <text class="menu-text">{{ item.text }}</text>
        <text class="menu-arrow">></text>
      </view>
    </view>

    <!-- 版本信息 -->
    <view class="version-info">
      <text>v1.0.0</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const statusBarHeight = ref(20)

onLoad(() => {
  const sysInfo = uni.getSystemInfoSync()
  statusBarHeight.value = sysInfo.statusBarHeight || 20
})

const orderStatus = ref([
  { text: '待付款', icon: '💳' },
  { text: '待发货', icon: '📦' },
  { text: '待收货', icon: '🚚' },
  { text: '已完成', icon: '✅' },
  { text: '退款/售后', icon: '🔧' },
])

const menuList = ref([
  { text: '收货地址', icon: '📍' },
  { text: '优惠券', icon: '🎫' },
  { text: '联系客服', icon: '🎧' },
  { text: '设置', icon: '⚙️' },
])

const handleMenuClick = (item: any) => {
  uni.showToast({
    title: `点击了${item.text}`,
    icon: 'none',
  })
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 顶部区域 */
.header-section {
  background-color: #ff6b00;
  height: 180px;
  padding: 0 20px 20px;
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
}

.user-card {
  display: flex;
  align-items: center;
}

.avatar-box {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #fff;
  margin-right: 16px;
  border: 2px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background-color: #eee;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.nickname {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 6px;
}

.vip-tag {
  font-size: 12px;
  color: #ff6b00;
  background-color: #fff;
  padding: 2px 8px;
  border-radius: 10px;
  align-self: flex-start;
}

/* 订单状态卡片 */
.order-status-card {
  background-color: #fff;
  margin: -40px 16px 16px;
  border-radius: 12px;
  padding: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 12px;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.card-more {
  font-size: 12px;
  color: #999;
}

.status-grid {
  display: flex;
  justify-content: space-between;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.status-icon {
  font-size: 24px;
  margin-bottom: 8px;
}

.status-text {
  font-size: 12px;
  color: #666;
}

/* 菜单列表 */
.menu-list {
  background-color: #fff;
  margin: 0 16px;
  border-radius: 12px;
  padding: 0 16px;
}

.menu-item {
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-icon-left {
  font-size: 20px;
  margin-right: 12px;
}

.menu-text {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.menu-arrow {
  font-size: 14px;
  color: #ccc;
}

.version-info {
  text-align: center;
  padding: 20px;
  color: #ccc;
  font-size: 12px;
}
</style>

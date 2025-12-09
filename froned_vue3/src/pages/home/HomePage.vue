<template>
  <view class="page-container">
    <!-- 顶部导航栏区域 -->
    <view class="custom-navbar" :style="{ paddingTop: statusBarHeight + 'px' }">
      <view class="nav-content">
        <view class="location-box">
          <text class="location-icon">📍</text>
          <text class="location-text">深圳市南山区...</text>
          <text class="arrow-icon">></text>
        </view>
        <view class="search-box">
          <text class="search-icon">🔍</text>
          <text class="placeholder">搜索你想喝的奶茶</text>
        </view>
      </view>
    </view>

    <!-- 滚动内容区域 -->
    <view class="scroll-content" :style="{ paddingTop: statusBarHeight + 44 + 'px' }">
      <!-- Banner 轮播图 -->
      <swiper
        class="banner-swiper"
        circular
        indicator-dots
        autoplay
        indicator-active-color="#FF6B00"
      >
        <swiper-item v-for="(item, index) in banners" :key="index">
          <view class="banner-item" :style="{ backgroundColor: item.color }">
            <text class="banner-text">{{ item.title }}</text>
          </view>
        </swiper-item>
      </swiper>

      <!-- 金刚区菜单 -->
      <view class="menu-grid">
        <view
          class="menu-item"
          v-for="(menu, index) in menus"
          :key="index"
          @click="handleMenuClick(menu)"
        >
          <view class="menu-icon-box" :style="{ backgroundColor: menu.bgColor }">
            <text class="menu-icon">{{ menu.icon }}</text>
          </view>
          <text class="menu-text">{{ menu.name }}</text>
        </view>
      </view>

      <!-- 推荐商品 -->
      <view class="section-header">
        <text class="section-title">猜你喜欢</text>
        <text class="section-more">查看全部 ></text>
      </view>

      <view class="goods-list">
        <view
          class="goods-item"
          v-for="item in recommendList"
          :key="item.id"
          @click="addToCart(item)"
        >
          <view class="goods-img-box">
            <!-- 实际开发请替换为 image 组件 -->
            <view class="goods-img-placeholder"></view>
          </view>
          <view class="goods-info">
            <text class="goods-name">{{ item.name }}</text>
            <text class="goods-desc">{{ item.description }}</text>
            <view class="goods-bottom">
              <text class="goods-price">¥{{ item.price }}</text>
              <view class="add-btn">+</view>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部占位，防止被 TabBar 遮挡 -->
      <view class="footer-spacer"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import type { Drink } from '@/types'

// 状态栏高度
const statusBarHeight = ref(20)

onLoad(() => {
  const sysInfo = uni.getSystemInfoSync()
  statusBarHeight.value = sysInfo.statusBarHeight || 20
})

// Banner 数据
const banners = ref([
  { title: '新品上市', color: '#FFD8B2' },
  { title: '超值优惠', color: '#B2F2BB' },
  { title: '会员专享', color: '#A5D8FF' },
])

// 菜单数据
const menus = ref([
  { name: '门店自取', icon: '🥤', bgColor: '#FFF0F6' },
  { name: '外卖配送', icon: '🛵', bgColor: '#E6FCF5' },
  { name: '拼单优惠', icon: '💰', bgColor: '#FFF9DB' },
  { name: '我的订单', icon: '📋', bgColor: '#F3F0FF' },
])

// 推荐列表数据
const recommendList = ref<Drink[]>([
  {
    id: '1',
    name: '珍珠奶茶',
    price: 15,
    image: '',
    description: '经典口味，Q弹珍珠',
    shopId: '1',
  },
  {
    id: '2',
    name: '杨枝甘露',
    price: 22,
    image: '',
    description: '满满芒果肉，清爽解腻',
    shopId: '1',
  },
  {
    id: '3',
    name: '多肉葡萄',
    price: 28,
    image: '',
    description: '鲜萃葡萄，芝士奶盖',
    shopId: '1',
  },
  { id: '4', name: '烤奶', price: 12, image: '', description: '焦香浓郁，回味无穷', shopId: '1' },
  {
    id: '5',
    name: '芝士莓莓',
    price: 26,
    image: '',
    description: '草莓鲜果，咸香芝士',
    shopId: '1',
  },
])

const handleMenuClick = (menu: any) => {
  uni.showToast({
    title: `点击了${menu.name}`,
    icon: 'none',
  })
}

const addToCart = (item: Drink) => {
  uni.showToast({
    title: `已加入购物车: ${item.name}`,
    icon: 'success',
  })
}
</script>

<style scoped>
.page-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

/* 自定义导航栏 */
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  z-index: 100;
  padding-bottom: 10px;
}

.nav-content {
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.location-box {
  display: flex;
  align-items: center;
  max-width: 120px;
  margin-right: 12px;
}

.location-text {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 4px;
}

.search-box {
  flex: 1;
  height: 32px;
  background-color: #f5f5f5;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.placeholder {
  font-size: 12px;
  color: #999;
  margin-left: 6px;
}

/* 轮播图 */
.banner-swiper {
  height: 150px;
  margin: 12px 16px;
  border-radius: 12px;
  overflow: hidden;
}

.banner-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner-text {
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 菜单网格 */
.menu-grid {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: #fff;
  margin: 0 16px 12px;
  border-radius: 12px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.menu-icon {
  font-size: 24px;
}

.menu-text {
  font-size: 12px;
  color: #333;
}

/* 推荐商品 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 12px;
}

.section-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.section-more {
  font-size: 12px;
  color: #999;
}

.goods-list {
  padding: 0 16px;
}

.goods-item {
  background-color: #fff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  margin-bottom: 12px;
}

.goods-img-box {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: #eee;
  margin-right: 12px;
  overflow: hidden;
}

.goods-img-placeholder {
  width: 100%;
  height: 100%;
  background-color: #e0e0e0;
}

.goods-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.goods-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.goods-desc {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.goods-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-price {
  font-size: 18px;
  font-weight: bold;
  color: #ff6b00;
}

.add-btn {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: #ff6b00;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
}

.footer-spacer {
  height: 20px;
}
</style>

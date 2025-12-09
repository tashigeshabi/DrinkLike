<template>
  <view class="page-container">
    <view class="fav-list" v-if="favList.length > 0">
      <view class="fav-item" v-for="(item, index) in favList" :key="item.id">
        <view class="item-img"></view>
        <view class="item-info">
          <text class="item-name">{{ item.name }}</text>
          <text class="item-desc">{{ item.description }}</text>
          <view class="item-bottom">
            <text class="item-price">¥{{ item.price }}</text>
            <view class="action-btn" @click="removeFav(index)">取消收藏</view>
          </view>
        </view>
      </view>
    </view>

    <view class="empty-state" v-else>
      <text class="empty-text">暂无收藏</text>
      <button class="go-shop-btn" @click="goShop">去逛逛</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Drink } from '@/types'

const favList = ref<Drink[]>([
  {
    id: '1',
    name: '珍珠奶茶',
    price: 15,
    image: '',
    description: '经典口味，Q弹珍珠',
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
])

const removeFav = (index: number) => {
  uni.showModal({
    title: '提示',
    content: '确定取消收藏吗？',
    success: (res) => {
      if (res.confirm) {
        favList.value.splice(index, 1)
        uni.showToast({ title: '已取消', icon: 'none' })
      }
    },
  })
}

const goShop = () => {
  uni.switchTab({ url: '/pages/home/HomePage' })
}
</script>

<style scoped>
.page-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 12px;
}

.fav-item {
  background-color: #fff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  margin-bottom: 12px;
}

.item-img {
  width: 80px;
  height: 80px;
  background-color: #eee;
  border-radius: 8px;
  margin-right: 12px;
}

.item-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.item-desc {
  font-size: 12px;
  color: #999;
}

.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  font-size: 16px;
  font-weight: bold;
  color: #ff6b00;
}

.action-btn {
  font-size: 12px;
  color: #999;
  padding: 4px 8px;
  border: 1px solid #eee;
  border-radius: 12px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
}

.empty-text {
  font-size: 14px;
  color: #999;
  margin-bottom: 20px;
}

.go-shop-btn {
  width: 120px;
  font-size: 14px;
  background-color: #ff6b00;
  color: #fff;
  border-radius: 20px;
}
</style>

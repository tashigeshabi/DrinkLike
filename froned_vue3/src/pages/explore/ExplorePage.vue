<template>
  <view class="page-container">
    <!-- 头部搜索 -->
    <view class="search-header">
      <view class="search-input">
        <text class="search-icon">🔍</text>
        <text class="placeholder">搜索店铺或商品</text>
      </view>
    </view>

    <view class="content-box">
      <!-- 左侧店铺分类 -->
      <scroll-view scroll-y class="left-menu">
        <view
          v-for="(shop, index) in appStore.shops"
          :key="shop.id"
          class="menu-item"
          :class="{ active: currentCategory === index }"
          @click="switchCategory(index)"
        >
          <text>{{ shop.name }}</text>
        </view>
      </scroll-view>

      <!-- 右侧商品列表 -->
      <scroll-view scroll-y class="right-content" :scroll-top="scrollTop">
        <view class="category-title" v-if="currentShop">{{ currentShop.name }}</view>

        <view class="product-list" v-if="currentShop">
          <view
            class="product-item"
            v-for="drink in currentShop.drinks"
            :key="drink.id"
            @click="showDetail(drink)"
          >
            <image class="product-img" :src="drink.image" mode="aspectFill"></image>
            <view class="product-info">
              <text class="name">{{ drink.name }}</text>
              <text class="desc">{{ drink.description }}</text>
              <view class="price-row">
                <!-- 价格已隐藏 -->
                <!-- <text class="price">¥{{ drink.price }}</text> -->
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <!-- 详情弹窗 (Replaced by Component) -->
    <DrinkDetailCard
      v-if="selectedDrink"
      :drink="selectedDrink"
      :shop-name="getShopName(selectedDrink.shopId)"
      :is-favorite="isFavorite"
      @close="closeDetail"
      @toggle-favorite="toggleFavorite"
      @want-to-drink="wantToDrink"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import type { Drink } from '@/types'
import DrinkDetailCard from '@/components/DrinkDetailCard.vue'

const appStore = useAppStore()

const currentCategory = ref(0)
const scrollTop = ref(0)
const selectedDrink = ref<Drink | null>(null)

const currentShop = computed(() => {
  return appStore.shops[currentCategory.value]
})

const isFavorite = computed(() => {
  if (!selectedDrink.value) return false
  return appStore.isFavorite(selectedDrink.value.id)
})

const getShopName = (shopId: string) => {
  const shop = appStore.shops.find((s) => s.id === shopId)
  return shop ? shop.name : ''
}

const switchCategory = (index: number) => {
  currentCategory.value = index
  scrollTop.value = 0
}

const showDetail = (drink: Drink) => {
  selectedDrink.value = drink
}

const closeDetail = () => {
  selectedDrink.value = null
}

const toggleFavorite = () => {
  if (selectedDrink.value) {
    appStore.toggleFavorite(selectedDrink.value)
    uni.showToast({
      title: isFavorite.value ? '已添加到喜欢' : '已取消喜欢',
      icon: 'none',
    })
  }
}

const wantToDrink = () => {
  if (selectedDrink.value) {
    appStore.addToHistory(selectedDrink.value)
    uni.showToast({
      title: '已添加到我想喝清单', // 实际上这里存入了 history，可以根据需求调整
      icon: 'success',
    })
    closeDetail()
  }
}
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  /* Doraemon Theme Colors */
  --doraemon-blue: #0096e0;
  --doraemon-red: #e70012;
  --doraemon-yellow: #ffc600;
  --doraemon-white: #ffffff;
}

.search-header {
  padding: 10px 16px;
  background-color: var(--doraemon-blue); /* Updated header background */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.search-input {
  background-color: #fff;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 0 12px;
}

.search-icon {
  margin-right: 6px;
}

.placeholder {
  font-size: 12px;
  color: #999;
}

.content-box {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.left-menu {
  width: 90px;
  background-color: #f0f8ff; /* Light blue tint */
  height: 100%;
}

.menu-item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
  padding: 0 10px;
  text-align: center;
}

.menu-item.active {
  background-color: #fff;
  color: var(--doraemon-blue);
  font-weight: bold;
  border-left: 4px solid var(--doraemon-red); /* Red accent */
}

.right-content {
  flex: 1;
  height: 100%;
  background-color: #fff;
  padding: 0 12px;
}

.category-title {
  padding: 12px 0;
  font-size: 14px;
  color: #666;
  font-weight: bold;
}

.product-list {
  padding-bottom: 20px;
}

.product-item {
  display: flex;
  margin-bottom: 20px;
}

.product-img {
  width: 80px;
  height: 80px;
  background-color: #eee;
  border-radius: 8px;
  margin-right: 10px;
  border: 1px solid #e0e0e0;
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.desc {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: var(--doraemon-red); /* Red price */
}

/* 详情弹窗样式 */
/* Styles moved to @/components/DrinkDetailCard.vue */
</style>

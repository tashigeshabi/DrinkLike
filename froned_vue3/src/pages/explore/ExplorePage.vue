<template>
  <view class="page-container">
    <!-- 头部搜索 -->
    <view class="search-header">
      <view class="search-input">
        <text class="search-icon">🔍</text>
        <text class="placeholder">搜索商品</text>
      </view>
    </view>

    <view class="content-box">
      <!-- 左侧分类 -->
      <scroll-view scroll-y class="left-menu">
        <view
          v-for="(item, index) in categories"
          :key="index"
          class="menu-item"
          :class="{ active: currentCategory === index }"
          @click="switchCategory(index)"
        >
          <text>{{ item.name }}</text>
        </view>
      </scroll-view>

      <!-- 右侧商品 -->
      <scroll-view scroll-y class="right-content" :scroll-top="scrollTop">
        <view class="category-title">{{ categories[currentCategory].name }}</view>

        <view class="product-list">
          <view
            class="product-item"
            v-for="product in categories[currentCategory].products"
            :key="product.id"
          >
            <view class="product-img"></view>
            <view class="product-info">
              <text class="name">{{ product.name }}</text>
              <text class="desc">{{ product.description }}</text>
              <view class="price-row">
                <text class="price">¥{{ product.price }}</text>
                <view class="add-cart-btn" @click="addToCart(product)">选规格</view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentCategory = ref(0)
const scrollTop = ref(0)

const categories = ref([
  {
    name: '人气热销',
    products: [
      { id: '101', name: '超大桶水果茶', price: 24, description: '1000ml超大容量，喝到爽' },
      { id: '102', name: '满杯红柚', price: 18, description: '精选红柚，酸甜可口' },
    ],
  },
  {
    name: '当季新品',
    products: [
      { id: '201', name: '生椰拿铁', price: 19, description: '厚椰乳+浓缩咖啡' },
      { id: '202', name: '冰吸生椰', price: 16, description: '清凉薄荷感' },
    ],
  },
  {
    name: '鲜果茶',
    products: [
      { id: '301', name: '多肉葡萄', price: 28, description: '手工剥皮，果肉丰富' },
      { id: '302', name: '芝士草莓', price: 26, description: '新鲜草莓打制' },
    ],
  },
  {
    name: '醇香奶茶',
    products: [
      { id: '401', name: '珍珠奶茶', price: 12, description: '经典永不过时' },
      { id: '402', name: '布丁奶茶', price: 13, description: '整颗布丁在里面' },
    ],
  },
  {
    name: '芝士奶盖',
    products: [{ id: '501', name: '芝士绿茶', price: 15, description: '咸香芝士+清爽绿茶' }],
  },
])

const switchCategory = (index: number) => {
  currentCategory.value = index
  scrollTop.value = 0 // 切换分类回到顶部
}

const addToCart = (product: any) => {
  uni.showToast({
    title: `已选择 ${product.name}`,
    icon: 'none',
  })
}
</script>

<style scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.search-header {
  padding: 10px 16px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.search-input {
  background-color: #f5f5f5;
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
  background-color: #f5f5f5;
  height: 100%;
}

.menu-item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
}

.menu-item.active {
  background-color: #fff;
  color: #333;
  font-weight: bold;
  border-left: 4px solid #ff6b00;
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
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #ff6b00;
}

.add-cart-btn {
  padding: 4px 12px;
  background-color: #ff6b00;
  color: #fff;
  font-size: 12px;
  border-radius: 12px;
}
</style>

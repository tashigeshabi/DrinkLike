<template>
  <view class="page-container">
    <!-- 购物车列表 -->
    <scroll-view scroll-y class="cart-list" v-if="cartList.length > 0">
      <view class="cart-item" v-for="(item, index) in cartList" :key="item.id">
        <!-- 勾选框 -->
        <view class="checkbox" :class="{ checked: item.checked }" @click="toggleCheck(index)">
          <text v-if="item.checked" class="check-icon">✓</text>
        </view>

        <view class="item-img"></view>

        <view class="item-info">
          <text class="item-name">{{ item.name }}</text>
          <text class="item-spec">{{ item.spec }}</text>
          <view class="item-bottom">
            <text class="item-price">¥{{ item.price }}</text>
            <view class="quantity-control">
              <view class="qty-btn" @click="updateQty(index, -1)">-</view>
              <text class="qty-num">{{ item.quantity }}</text>
              <view class="qty-btn" @click="updateQty(index, 1)">+</view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 空状态 -->
    <view class="empty-state" v-else>
      <view class="empty-icon">🛒</view>
      <text class="empty-text">购物车还是空的</text>
      <button class="go-shop-btn" @click="goShop">去喝一杯</button>
    </view>

    <!-- 底部结算栏 -->
    <view class="settle-bar" v-if="cartList.length > 0">
      <view class="all-check" @click="toggleAll">
        <view class="checkbox" :class="{ checked: isAllChecked }">
          <text v-if="isAllChecked" class="check-icon">✓</text>
        </view>
        <text class="all-text">全选</text>
      </view>

      <view class="total-box">
        <text class="total-label">合计:</text>
        <text class="total-price">¥{{ totalPrice }}</text>
      </view>

      <view class="settle-btn" @click="handleSettle"> 结算({{ totalCount }}) </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  spec: string
  checked: boolean
}

const cartList = ref<CartItem[]>([
  { id: '1', name: '多肉葡萄', price: 28, quantity: 1, spec: '标准冰/少糖', checked: true },
  { id: '2', name: '烤奶', price: 12, quantity: 2, spec: '热/标准糖', checked: false },
])

const isAllChecked = computed(() => {
  return cartList.value.every((item) => item.checked)
})

const totalPrice = computed(() => {
  return cartList.value
    .filter((item) => item.checked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const totalCount = computed(() => {
  return cartList.value.filter((item) => item.checked).reduce((sum, item) => sum + item.quantity, 0)
})

const toggleCheck = (index: number) => {
  cartList.value[index].checked = !cartList.value[index].checked
}

const toggleAll = () => {
  const newVal = !isAllChecked.value
  cartList.value.forEach((item) => (item.checked = newVal))
}

const updateQty = (index: number, delta: number) => {
  const item = cartList.value[index]
  const newQty = item.quantity + delta
  if (newQty > 0) {
    item.quantity = newQty
  } else {
    uni.showModal({
      title: '提示',
      content: '确定要删除该商品吗？',
      success: (res) => {
        if (res.confirm) {
          cartList.value.splice(index, 1)
        }
      },
    })
  }
}

const goShop = () => {
  uni.switchTab({ url: '/pages/home/HomePage' })
}

const handleSettle = () => {
  if (totalCount.value === 0) {
    uni.showToast({ title: '请选择商品', icon: 'none' })
    return
  }

  // 模拟下单成功
  uni.showLoading({ title: '正在提交...' })
  setTimeout(() => {
    uni.hideLoading()
    // 跳转到订单成功页（非 tabbar 页面）
    uni.navigateTo({
      url: '/pages/order/OrderSuccessPage',
    })
  }, 1000)
}
</script>

<style scoped>
.page-container {
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.cart-list {
  flex: 1;
  padding: 12px;
  padding-bottom: 60px; /* 留出底部高度 */
}

.cart-item {
  background-color: #fff;
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.checkbox {
  width: 20px;
  height: 20px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkbox.checked {
  background-color: #ff6b00;
  border-color: #ff6b00;
}

.check-icon {
  color: #fff;
  font-size: 12px;
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
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.item-spec {
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

.quantity-control {
  display: flex;
  align-items: center;
}

.qty-btn {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.qty-num {
  margin: 0 12px;
  font-size: 14px;
}

/* 底部结算栏 */
.settle-bar {
  position: fixed;
  bottom: 0; /* 默认在底部，如果在 tabbar 页面可能会有 tabbar 高度，这里用 fixed 简单处理 */
  /* 注意：在 tabbar 页面，fixed bottom:0 会在 tabbar 之上吗？不，会被 tabbar 遮挡。
     但是在 H5/小程序 tabbar 页面，window height 不包含 tabbar。
     不过为了安全起见，我们通常给 list 加 padding-bottom，然后 settle-bar 放这里。
     但是 Uniapp 的 TabBar 是原生层级，我们这里如果是 TabBar 页面，
     bottom 应该设为 var(--window-bottom, 0)
  */
  bottom: var(--window-bottom, 0);
  left: 0;
  width: 100%;
  height: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.all-check {
  display: flex;
  align-items: center;
  margin-right: auto;
}

.all-text {
  font-size: 14px;
  color: #666;
}

.total-box {
  display: flex;
  align-items: center;
  margin-right: 12px;
}

.total-label {
  font-size: 14px;
  color: #333;
  margin-right: 4px;
}

.total-price {
  font-size: 18px;
  font-weight: bold;
  color: #ff6b00;
}

.settle-btn {
  width: 100px;
  height: 36px;
  background-color: #ff6b00;
  color: #fff;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 20px;
  color: #ccc;
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

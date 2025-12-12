<template>
  <view class="detail-overlay" @click="handleClose">
    <view class="detail-card" :class="{ 'gift-anim': animationType === 'gift' }" @click.stop>
      <image class="detail-img" :src="drink.image" mode="aspectFill"></image>
      <view class="detail-content">
        <text class="detail-shop-name">{{ shopName }}</text>
        <text class="detail-name">{{ drink.name }}</text>
        <text class="detail-desc">{{ drink.description }}</text>
      </view>

      <view class="detail-actions">
        <view
          class="action-btn favorite-btn"
          :class="{ active: isFavorite }"
          @click="handleToggleFavorite"
        >
          <text class="icon">{{ isFavorite ? '❤️' : '🤍' }}</text>
          <text>{{ isFavorite ? '取消喜欢' : '添加到我喜欢' }}</text>
        </view>
        <view class="action-btn drink-btn" @click="handleWantToDrink">
          <text>我想喝</text>
        </view>
      </view>

      <!-- 再选一次按钮 -->
      <view v-if="showPickAgain" class="pick-again-btn" @click="handlePickAgain">
        <text>再选一次</text>
      </view>

      <view class="close-btn" @click.stop="handleClose">✕</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { Drink } from '@/types'

// Props definition
const props = defineProps<{
  drink: Drink
  shopName: string
  isFavorite: boolean
  showPickAgain?: boolean
  animationType?: 'default' | 'gift'
}>()

// Emits definition
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'toggleFavorite'): void
  (e: 'wantToDrink'): void
  (e: 'pickAgain'): void
}>()

const handleClose = () => {
  emit('close')
}

const handleToggleFavorite = () => {
  emit('toggleFavorite')
}

const handleWantToDrink = () => {
  emit('wantToDrink')
}

const handlePickAgain = () => {
  emit('pickAgain')
}
</script>

<style scoped>
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.detail-card {
  width: 600rpx;
  background-color: #fff;
  border-radius: 24rpx; /* Unified radius */
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 1001;
  box-shadow: 0 10rpx 40rpx rgba(0, 0, 0, 0.2);
}

.detail-card.gift-anim {
  animation: giftPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.detail-img {
  width: 100%;
  height: 500rpx;
  background-color: #eee;
}

.detail-content {
  padding: 40rpx 30rpx;
}

.detail-shop-name {
  font-size: 28rpx;
  color: #0096e0; /* Doraemon Blue */
  font-weight: bold;
  margin-bottom: 12rpx;
  display: block;
}

.detail-name {
  font-size: 40rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 20rpx;
  display: block;
}

.detail-desc {
  font-size: 28rpx;
  color: #666;
  margin-bottom: 24rpx;
  display: block;
  line-height: 1.6;
}

.detail-actions {
  display: flex;
  padding: 0 30rpx 24rpx;
  gap: 24rpx;
}

.action-btn {
  flex: 1;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  border-radius: 24rpx; /* Unified radius */
  transition: opacity 0.2s;
}

.action-btn:active {
  opacity: 0.9;
}

.favorite-btn {
  background-color: #f5f5f5;
  color: #666;
  font-weight: bold;
}

.favorite-btn.active {
  background-color: #fff0f0;
  color: #e70012; /* Doraemon Red */
}

.favorite-btn .icon {
  margin-right: 8rpx;
  font-size: 34rpx;
}

.drink-btn {
  background-color: #0096e0; /* Doraemon Blue */
  color: #fff;
  font-weight: bold;
  box-shadow: 0 6rpx 20rpx rgba(0, 150, 224, 0.3);
}

/* Pick Again Button */
.pick-again-btn {
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28rpx;
  background-color: #fff;
  color: #0096e0;
  font-weight: bold;
  border: 2rpx solid #0096e0;
  border-radius: 24rpx; /* Unified radius */
  margin: 0 30rpx 40rpx;
  transition: background-color 0.2s;
}

.pick-again-btn:active {
  background-color: #e6f7ff;
}

.close-btn {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  width: 64rpx;
  height: 64rpx;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  z-index: 2;
  backdrop-filter: blur(4px);
  cursor: pointer;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes giftPop {
  0% {
    opacity: 0;
    transform: scale(0.1) rotate(-10deg);
  }
  40% {
    opacity: 1;
    transform: scale(1.1) rotate(5deg);
  }
  60% {
    transform: scale(0.95) rotate(-3deg);
  }
  80% {
    transform: scale(1.02) rotate(1deg);
  }
  100% {
    transform: scale(1) rotate(0);
  }
}
</style>

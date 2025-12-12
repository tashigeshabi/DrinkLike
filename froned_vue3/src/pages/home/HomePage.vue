<template>
  <view class="container">
    <view class="content">
      <!-- 动画弹窗遮罩 (Replaced by Component) -->
      <DrinkDetailCard
        v-if="showAnim && currentDrink"
        :drink="currentDrink"
        :shop-name="getShopName(currentDrink.shopId)"
        :is-favorite="isFavorite"
        :show-pick-again="true"
        animation-type="gift"
        @close="closeAnim"
        @toggle-favorite="toggleFavorite"
        @want-to-drink="wantToDrink"
        @pick-again="pickAgain"
      />

      <!-- 首页动画图片 -->
      <view class="home-gif-wrapper">
        <image class="home-gif" :src="currentGif" mode="aspectFit"></image>
      </view>

      <text class="title">哆啦A梦的魔法口袋</text>
      <text class="subtitle">不知道喝什么？让哆啦A梦为你选一杯！</text>

      <button class="track-btn" @click="handleRecommend">今天想喝啥</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import type { Drink } from '@/types'
import DrinkDetailCard from '@/components/DrinkDetailCard.vue'

const appStore = useAppStore()

const showAnim = ref(false)
// 定义 GIF 列表
const gifList = [
  '/static/images/gif/doraemon_sit.gif',
  '/static/images/gif/aixing.gif',
  '/static/images/gif/chi.gif',
  '/static/images/gif/zan.gif',
]

const currentDrink = ref<Drink | null>(null)
const showResult = ref(false)

// 当前显示的 GIF 图片路径
const currentGif = ref('/static/images/gif/doraemon_sit.gif')

const isFavorite = computed(() => {
  if (!currentDrink.value) return false
  return appStore.isFavorite(currentDrink.value.id)
})

const getShopName = (shopId: string) => {
  const shop = appStore.shops.find((s) => s.id === shopId)
  return shop ? shop.name : ''
}

const handleRecommend = () => {
  console.log('点击今天想喝啥')
  // 1. 从 Store 获取随机推荐
  const recommendation = appStore.getRandomRecommendation()
  if (recommendation) {
    currentDrink.value = recommendation
  } else {
    // Fallback if no drinks available (shouldn't happen with default data)
    uni.showToast({ title: '暂无奶茶数据', icon: 'none' })
    return
  }

  showResult.value = false // 先隐藏结果

  // 2. 切换为挥手的 GIF 图片
  currentGif.value = '/static/images/gif/doraemon_wave.gif'

  // 3. 延时后显示弹窗
  setTimeout(() => {
    showAnim.value = true
    showResult.value = true
  }, 1500) // 1.5秒后显示弹窗
}

const closeAnim = () => {
  showAnim.value = false

  // 随机切换一个 GIF
  const randomIndex = Math.floor(Math.random() * gifList.length)
  currentGif.value = gifList[randomIndex]
  console.log('切换 GIF:', currentGif.value)
}

const toggleFavorite = () => {
  if (currentDrink.value) {
    appStore.toggleFavorite(currentDrink.value)
    uni.showToast({
      title: isFavorite.value ? '已添加到喜欢' : '已取消喜欢',
      icon: 'none',
    })
  }
}

const wantToDrink = () => {
  if (currentDrink.value) {
    appStore.addToHistory(currentDrink.value)
    uni.showToast({
      title: '已添加到我想喝清单',
      icon: 'success',
    })
    closeAnim()
  }
}

const pickAgain = () => {
  // 1. Get new recommendation
  const recommendation = appStore.getRandomRecommendation()
  if (recommendation) {
    currentDrink.value = recommendation
  }

  // 2. Play animation again (optional, or just update data)
  // For better UX, we might want to just switch the content or do a small shake
  // But since the user wants "pick again", maybe just updating the data is enough?
  // Let's add a small toast to feedback
  uni.showToast({
    title: '已为你重新挑选',
    icon: 'none',
  })
}
</script>

<style scoped>
/* Doraemon Theme Colors */
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* Doraemon Blue Gradient */
  background: linear-gradient(to bottom, #e6f7ff, #ffffff, #e6f7ff);
  padding: 30px;
  --doraemon-blue: #0096e0;
  --doraemon-red: #e70012;
  --doraemon-yellow: #ffc600;
  --doraemon-white: #ffffff;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.home-gif-wrapper {
  width: 200px;
  height: 200px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.home-gif {
  width: 100%;
  height: 100%;
}

.title {
  font-size: 26px;
  font-weight: bold;
  color: #1a1a1a;
  text-align: center;
  margin-bottom: 16px;
  max-width: 80%;
}

.subtitle {
  font-size: 15px;
  color: #666;
  text-align: center;
  margin-bottom: 50px;
  line-height: 1.5;
  max-width: 85%;
}

.track-btn {
  width: 50%;
  height: 80rpx;
  background: linear-gradient(90deg, #0096e0, #1e90ff); /* Blue Gradient */
  color: white;
  border-radius: 24rpx;
  font-size: 30rpx;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 15px rgba(0, 150, 224, 0.3); /* Blue Shadow */
  margin-bottom: 24px;
}

.back-home {
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 600;
  padding: 10px;
}
</style>

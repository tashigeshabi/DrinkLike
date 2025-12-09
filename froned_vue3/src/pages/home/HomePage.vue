<template>
  <view class="container">
    <view class="content">
      <!-- 动画弹窗遮罩 -->
      <view v-if="showAnim" class="anim-overlay" @click="closeAnim">
        <canvas id="anim-canvas" type="2d" class="anim-canvas" @click.stop></canvas>
        <view class="close-btn" @click.stop="closeAnim">✕</view>
      </view>

      <!-- 图标区域 -->
      <view class="icon-wrapper">
        <view class="success-ring">
          <view class="success-circle">
            <text class="checkmark">✓</text>
          </view>
        </view>

        <!-- 模拟彩带的装饰元素 -->
        <view class="deco d1"></view>
        <view class="deco d2"></view>
        <view class="deco d3"></view>
        <view class="deco d4"></view>
        <view class="deco squiggle1"></view>
        <view class="deco squiggle2"></view>
      </view>

      <text class="title">您的订单已接单</text>
      <text class="subtitle">您的商品已下单，正在处理中</text>

      <button class="track-btn" @click="handleTrackOrder">追踪订单</button>
      <view class="back-home" @click="handleBackToHome">返回首页</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, nextTick, getCurrentInstance, onUnmounted } from 'vue'
import * as TWEEN from '@tweenjs/tween.js'

const showAnim = ref(false)
const instance = getCurrentInstance()
let canvasContext: any = null
let animationFrameId: number = 0
let pixelRatio = 1
let canvasWidth = 0
let canvasHeight = 0

// 动画状态对象
const animState = {
  itemY: 0, // 物品垂直位置
  itemScale: 0, // 物品缩放
  itemAlpha: 0, // 物品透明度
  handY: 0, // 手部位置（简单模拟）
}

const handleTrackOrder = () => {
  console.log('点击追踪订单')
  showAnim.value = true

  nextTick(() => {
    // 增加一个小延时，确保 Canvas 节点完全创建
    setTimeout(() => {
      initAnimation()
    }, 50)
  })
}

const initAnimation = () => {
  console.log('开始初始化动画')
  uni
    .createSelectorQuery()
    .in(instance)
    .select('#anim-canvas')
    .node((res) => {
      if (!res || !res.node) {
        console.error('未找到 Canvas 节点，尝试重新获取')
        // 如果失败，再次尝试
        setTimeout(initAnimation, 100)
        return
      }
      console.log('获取到 Canvas 节点', res.node)
      const canvas = res.node
      const ctx = canvas.getContext('2d')
      canvasContext = ctx

      // 适配高分屏
      // 兼容性处理
      try {
        if (uni.getWindowInfo) {
          pixelRatio = uni.getWindowInfo().pixelRatio
        } else {
          pixelRatio = uni.getSystemInfoSync().pixelRatio
        }
      } catch (e) {
        console.error('获取设备信息失败', e)
        pixelRatio = 1
      }

      console.log('设备像素比:', pixelRatio)

      canvasWidth = 300 * pixelRatio
      canvasHeight = 300 * pixelRatio
      canvas.width = canvasWidth
      canvas.height = canvasHeight
      ctx.scale(pixelRatio, pixelRatio)

      // 启动动画循环
      const renderLoop = () => {
        if (!showAnim.value) return
        try {
          // 显式传递时间，避免 TWEEN 内部获取时间失败
          TWEEN.update()
          drawScene(ctx)
          // 兼容性处理 requestAnimationFrame
          if (canvas.requestAnimationFrame) {
            animationFrameId = canvas.requestAnimationFrame(renderLoop)
          } else {
            //以此作为回退
            animationFrameId = setTimeout(renderLoop, 16) as unknown as number
          }
        } catch (e) {
          console.error('动画循环出错:', e)
        }
      }

      if (canvas.requestAnimationFrame) {
        animationFrameId = canvas.requestAnimationFrame(renderLoop)
      } else {
        animationFrameId = setTimeout(renderLoop, 16) as unknown as number
      }

      // 开始动画序列
      startTweenAnimation()
    })
    .exec()
}

// 开始 Tween 动画
const startTweenAnimation = () => {
  // 重置状态
  animState.itemY = 200
  animState.itemScale = 0
  animState.itemAlpha = 0
  animState.handY = 180

  // 动画1: 手伸进口袋
  new TWEEN.Tween(animState)
    .to({ handY: 200 }, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .chain(
      // 动画2: 拿出物品
      new TWEEN.Tween(animState)
        .to({ itemY: 100, itemScale: 1, itemAlpha: 1, handY: 180 }, 1000)
        .easing(TWEEN.Easing.Elastic.Out),
    )
    .start()
}

// 绘制场景
const drawScene = (ctx: any) => {
  const width = 300
  const height = 300

  ctx.clearRect(0, 0, width, height)

  // 1. 绘制哆啦A梦 (简化版)
  drawDoraemon(ctx, 150, 180)

  // 2. 绘制物品 (根据动画状态)
  drawItem(ctx, 150, animState.itemY, animState.itemScale, animState.itemAlpha)
}

// 绘制哆啦A梦
const drawDoraemon = (ctx: any, x: number, y: number) => {
  // 身体 (蓝色)
  ctx.fillStyle = '#00a0e9'
  ctx.beginPath()
  ctx.ellipse(x, y + 60, 50, 60, 0, 0, Math.PI * 2)
  ctx.fill()

  // 头部 (蓝色)
  ctx.beginPath()
  ctx.arc(x, y, 60, 0, Math.PI * 2)
  ctx.fill()

  // 脸部 (白色)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(x, y + 10, 50, 0, Math.PI * 2)
  ctx.fill()

  // 眼睛 (白色底)
  ctx.beginPath()
  ctx.ellipse(x - 15, y - 25, 15, 20, 0, 0, Math.PI * 2)
  ctx.ellipse(x + 15, y - 25, 15, 20, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // 眼珠 (黑色)
  ctx.fillStyle = '#000000'
  ctx.beginPath()
  ctx.arc(x - 10, y - 20, 3, 0, Math.PI * 2)
  ctx.arc(x + 10, y - 20, 3, 0, Math.PI * 2)
  ctx.fill()

  // 鼻子 (红色)
  ctx.fillStyle = '#e9002d'
  ctx.beginPath()
  ctx.arc(x, y - 5, 8, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // 胡须
  ctx.beginPath()
  ctx.moveTo(x - 10, y + 5)
  ctx.lineTo(x - 40, y - 5)
  ctx.moveTo(x - 10, y + 15)
  ctx.lineTo(x - 40, y + 15)
  ctx.moveTo(x - 10, y + 25)
  ctx.lineTo(x - 40, y + 35)
  ctx.moveTo(x + 10, y + 5)
  ctx.lineTo(x + 40, y - 5)
  ctx.moveTo(x + 10, y + 15)
  ctx.lineTo(x + 40, y + 15)
  ctx.moveTo(x + 10, y + 25)
  ctx.lineTo(x + 40, y + 35)
  ctx.strokeStyle = '#333'
  ctx.stroke()

  // 嘴巴
  ctx.beginPath()
  ctx.moveTo(x, y + 5)
  ctx.lineTo(x, y + 45)
  ctx.moveTo(x - 30, y + 30)
  ctx.quadraticCurveTo(x, y + 55, x + 30, y + 30)
  ctx.stroke()

  // 肚子 (白色)
  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(x, y + 65, 40, 0, Math.PI * 2)
  ctx.fill()

  // 口袋 (半圆)
  ctx.beginPath()
  ctx.arc(x, y + 65, 30, 0, Math.PI, false)
  ctx.stroke()

  // 铃铛 (黄色)
  ctx.fillStyle = '#f8e71c'
  ctx.beginPath()
  ctx.arc(x, y + 50, 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(x, y + 53, 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.moveTo(x, y + 53)
  ctx.lineTo(x, y + 60)
  ctx.stroke()
}

// 绘制物品 (例如一杯饮料)
const drawItem = (ctx: any, x: number, y: number, scale: number, alpha: number) => {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  ctx.globalAlpha = alpha

  // 杯身
  ctx.fillStyle = '#FF9800'
  ctx.beginPath()
  ctx.moveTo(-15, -20)
  ctx.lineTo(15, -20)
  ctx.lineTo(10, 20)
  ctx.lineTo(-10, 20)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // 杯盖
  ctx.fillStyle = '#FFF'
  ctx.beginPath()
  ctx.ellipse(0, -20, 15, 5, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // 吸管
  ctx.beginPath()
  ctx.moveTo(0, -20)
  ctx.lineTo(10, -35)
  ctx.stroke()

  // 光芒效果
  if (scale > 0.8) {
    ctx.strokeStyle = '#FFD700'
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4
      ctx.beginPath()
      ctx.moveTo(Math.cos(angle) * 30, Math.sin(angle) * 30)
      ctx.lineTo(Math.cos(angle) * 40, Math.sin(angle) * 40)
      ctx.stroke()
    }
  }

  ctx.restore()
}

const closeAnim = () => {
  showAnim.value = false
  TWEEN.removeAll()
  // 停止动画循环
  // 注意：在小程序中通常无法直接 cancelAnimationFrame，
  // 我们通过 showAnim.value = false 让循环在下一帧自动停止
}

const handleBackToHome = () => {
  console.log('点击返回首页')
  uni.switchTab({
    url: '/pages/explore/ExplorePage',
  })
}

// 组件卸载时清理
onUnmounted(() => {
  TWEEN.removeAll()
})
</script>

<style scoped>
.anim-overlay {
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

.anim-canvas {
  width: 300px;
  height: 300px;
}

.close-btn {
  margin-top: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #fff;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    to bottom,
    #fff5f2,
    #ffffff,
    #f0fdf4
  ); /* Subtle gradient trying to match the warm tone */
  padding: 30px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.icon-wrapper {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
}

.success-ring {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #4caf50;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  box-shadow: 0 10px 20px rgba(76, 175, 80, 0.2);
}

.success-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkmark {
  color: white;
  font-size: 48px;
  font-weight: bold;
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
  width: 100%;
  height: 56px;
  background: linear-gradient(90deg, #4caf50, #66bb6a);
  color: white;
  border-radius: 28px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
  margin-bottom: 24px;
}

.back-home {
  font-size: 16px;
  color: #1a1a1a;
  font-weight: 600;
  padding: 10px;
}

/* Decorations */
.deco {
  position: absolute;
  border-radius: 50%;
}

.d1 {
  top: 20px;
  right: 30px;
  width: 10px;
  height: 10px;
  background: #ff5722;
}
.d2 {
  bottom: 30px;
  left: 20px;
  width: 8px;
  height: 8px;
  background: #4caf50;
}
.d3 {
  top: 40px;
  left: 10px;
  width: 12px;
  height: 12px;
  border: 2px solid #ffc107;
  background: transparent;
}
.d4 {
  bottom: 20px;
  right: 20px;
  width: 6px;
  height: 6px;
  background: #9c27b0;
}

.squiggle1 {
  top: 10px;
  right: 0;
  width: 15px;
  height: 15px;
  border: 2px solid #ff5722;
  border-radius: 50%;
  border-color: transparent transparent #ff5722 #ff5722;
  transform: rotate(45deg);
}

.squiggle2 {
  bottom: 40px;
  left: -10px;
  width: 15px;
  height: 15px;
  border: 2px solid #2196f3;
  border-radius: 50%;
  border-color: #2196f3 transparent transparent #2196f3;
  transform: rotate(-30deg);
}
</style>

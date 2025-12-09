import { defineStore } from 'pinia';
import type { AppState, Drink, Shop, User } from '@/types';

export const useAppStore = defineStore('app', {
  state: (): AppState & { shops: Shop[] } => ({
    user: {
      id: 'u1',
      nickname: '奶茶爱好者',
      avatar: '/static/images/index/default_avatar.png', // 假设有一个默认头像
    },
    favorites: [],
    history: [],
    currentCharacter: 'doraemon',
    shops: [
      {
        id: 's1',
        name: '喜茶',
        logo: 'https://img.meituan.net/msmerchant/054b5de0ba035087d5678f7f39a54978149267.jpg', // 示例图片
        address: '市中心广场1号',
        drinks: [
          {
            id: 'd1',
            name: '多肉葡萄',
            price: 28,
            image: 'https://img.meituan.net/msmerchant/614656880a4479d69212124e43603649144225.jpg',
            description: '新鲜葡萄，多肉口感',
            shopId: 's1',
          },
          {
            id: 'd2',
            name: '烤黑糖波波牛乳',
            price: 19,
            image: 'https://img.meituan.net/msmerchant/2c3f7f5e4e3a8e0e0e0e0e0e0e0e0e0e.jpg', // Placeholder
            description: '经典黑糖，软糯波波',
            shopId: 's1',
          },
        ],
      },
      {
        id: 's2',
        name: '奈雪的茶',
        logo: 'https://img.meituan.net/msmerchant/e8f3f6f6f6f6f6f6f6f6f6f6f6f6f6f6.jpg', // Placeholder
        address: '商业街88号',
        drinks: [
          {
            id: 'd3',
            name: '霸气橙子',
            price: 25,
            image: 'https://img.meituan.net/msmerchant/f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8f8.jpg', // Placeholder
            description: '整颗橙子，维C满满',
            shopId: 's2',
          },
        ],
      },
      {
        id: 's3',
        name: '蜜雪冰城',
        logo: 'https://img.meituan.net/msmerchant/a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1.jpg', // Placeholder
        address: '学校门口',
        drinks: [
          {
            id: 'd4',
            name: '冰鲜柠檬水',
            price: 4,
            image: 'https://img.meituan.net/msmerchant/b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2.jpg', // Placeholder
            description: '物美价廉，清凉解暑',
            shopId: 's3',
          },
        ],
      },
    ],
  }),
  actions: {
    /**
     * 切换角色形象
     * @param character 角色标识
     */
    switchCharacter(character: string) {
      this.currentCharacter = character;
    },
    /**
     * 切换喜爱状态
     * @param drink 奶茶对象
     */
    toggleFavorite(drink: Drink) {
      const index = this.favorites.findIndex((d) => d.id === drink.id);
      if (index > -1) {
        this.favorites.splice(index, 1);
      } else {
        this.favorites.push(drink);
      }
    },
    /**
     * 添加到历史记录
     * @param drink 奶茶对象
     */
    addToHistory(drink: Drink) {
        // 避免重复添加最近的一条
        if (this.history.length > 0 && this.history[0].id === drink.id) {
            return;
        }
        this.history.unshift(drink);
        // 限制历史记录数量
        if (this.history.length > 20) {
            this.history.pop();
        }
    },
    /**
     * 获取随机推荐奶茶
     * 如果有喜欢的奶茶，优先从喜欢的列表中随机推荐
     * 否则从所有店铺的奶茶中随机推荐
     */
    getRandomRecommendation(): Drink | null {
      let pool: Drink[] = this.favorites;
      if (pool.length === 0) {
        pool = this.shops.flatMap(s => s.drinks);
      }
      if (pool.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * pool.length);
      return pool[randomIndex];
    },
    /**
     * 检查是否已收藏
     */
    isFavorite(drinkId: string): boolean {
        return this.favorites.some(d => d.id === drinkId);
    }
  },
  persist: {
    key: 'drink-like-store',
    storage: {
        getItem: (key) => uni.getStorageSync(key),
        setItem: (key, value) => uni.setStorageSync(key, value),
    }
  },
});

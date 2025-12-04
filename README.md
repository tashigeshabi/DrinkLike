# 消防安全隐患排查系统

这是一个基于 Vue.js 和 Express 的消防安全隐患排查系统，用于进行各类场所的安全隐患排查、记录、上报和整改。

## 功能特点

- **隐患排查**: 支持电气火灾、消防通道、消防设施、易燃易爆物品、燃气安全等多种类型的隐患排查
- **检查记录**: 记录检查结果，包括正常项和异常项，支持上传照片和添加备注
- **隐患上报**: 用户可主动上报发现的安全隐患，包括位置、照片和描述信息
- **整改管理**: 对发现的隐患进行整改，并记录整改过程和结果
- **数据统计**: 统计分析隐患情况，生成安全报告

## 技术栈

### 前端

- Vue.js
- uniapp (跨平台支持)
- Sass/SCSS

### 后端

- Node.js
- Express
- MongoDB
- Mongoose

## 主要页面

1. **检查首页(check.vue)**: 展示各类检查项目和检查记录
2. **检查详情页(detail.vue)**: 进行具体项目的检查，填写检查结果
3. **检查结果页(result.vue)**: 显示检查结果统计和发现的隐患
4. **整改页面(rectification.vue)**: 对发现的隐患进行整改
5. **隐患上报页(report.vue)**: 用户主动上报发现的安全隐患
6. **检查记录页(records.vue)**: 查看历史检查记录

## 数据模型

系统包含以下主要数据模型：

1. **CheckItem**: 检查项目模板
2. **CheckRecord**: 检查记录
3. **Rectification**: 整改记录
4. **HazardReport**: 隐患上报

## 安装和运行

### 前端

```bash
# 安装依赖
npm install

# 运行开发服务
npm run dev:h5

# 构建
npm run build:h5
```

### 后端

```bash
# 安装依赖
cd src/server
npm install

# 运行服务
node app.js
```

## API 接口文档

### 检查项目相关

- `GET /api/safety/check-items` - 获取检查项目列表
- `GET /api/safety/check-items/:id` - 获取检查项目详情

### 检查记录相关

- `POST /api/safety/check-records` - 提交检查记录
- `GET /api/safety/check-records` - 获取检查记录列表
- `GET /api/safety/check-records/:id` - 获取检查记录详情

### 整改相关

- `POST /api/safety/rectification` - 提交整改信息
- `GET /api/safety/rectification/:id` - 获取整改详情

### 隐患上报相关

- `POST /api/safety/hazard-report` - 提交隐患上报
- `GET /api/safety/hazard-report` - 获取隐患上报列表
- `GET /api/safety/hazard-report/:id` - 获取隐患上报详情

### 文件上传

- `POST /api/safety/upload` - 上传图片

## 使用流程

1. 在首页选择检查项目类型
2. 进入检查页面，对每个检查项进行检查
3. 提交检查结果，查看检查报告
4. 对发现的隐患进行整改
5. 提交整改结果

## 贡献指南

欢迎对本项目提出建议和改进意见，提交问题或功能请求可以通过 Issues 页面进行。

## 许可证

MIT

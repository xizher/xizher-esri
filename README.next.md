# @xizher/esri

## 介绍

- 基于`ArcGIS API for JavaScript`二次开发的**业务功能型**地图API库
- 使用面向对象（封装、继承、多态）及插件化（按需引入）的编码思想开发
- 其他类似的地图API二次封装库: `@xizher/ol`、`@xizher/leaflet`、`@xizher/cesium`

## 设计架构

![设计架构](C:\usr\y2021\xizher\xizher-esri\设计架构.png)

## 项目目录及重要文件说明

- `__tests__` 测试项目目录
- `dist`  编译结果目录
- `src` 源码目录
  - `hooks` 基于Vue Composition API封装的地图相关功能响应式模块目录
  - `plugins` @xizher/esri插件目录
  - `taskbox` 地图任务工具箱模块目录
  - `utilities` 工具集模块目录
  - `web-map` @xizher/esri主类
  - `web-map-plugin` @xizher/esri插件类的父类
- `.eslintignore` Eslint检测忽略配置文件
- `.eslintrc.js` Eslint配置文件
- `tsconfig` TypeScript配置文件
- `vite.config.ts` 测试项目的Vite配置

## 基础使用

### 1. npm

```shell
npm install --save @xizher/esri
```

```javascript
import { WebMap, Basemap } from '@xizher/esri'
const webMap = new WebMap('esri-container')
  .use(new Basemap())
  .mount()
```

### 2. cdn with esm

<iframe height="397" style="width: 100%;" scrolling="no" title="KKWNgoP" src="https://codepen.io/wxzgis/embed/KKWNgoP?height=397&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/wxzgis/pen/KKWNgoP'>KKWNgoP</a> by wxzgis
  (<a href='https://codepen.io/wxzgis'>@wxzgis</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
## 使用案例

### 底图的可见性控制

<iframe height="265" style="width: 100%;" scrolling="no" title="Set Basemap Visible With @xizher/esri" src="https://codepen.io/wxzgis/embed/Vwppqrj?height=265&theme-id=dark&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/wxzgis/pen/Vwppqrj'>Set Basemap Visible With @xizher/esri</a> by wxzgis
  (<a href='https://codepen.io/wxzgis'>@wxzgis</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

#### 
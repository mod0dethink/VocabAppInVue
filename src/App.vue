<template>
  <div id="app" class="app-container">
    <MainSidebar class="sidebar"/>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import MainSidebar from './components/MainSidebar.vue';

export default {
  components: {
    MainSidebar
  }
};
</script>

<style>
h1 {
  font-family: 'Arial', sans-serif; /* フォントファミリー */
  color: #333; /* 文字色 */
  text-align: center; /* 中央揃え */
  padding: 20px 0; /* 上下のパディング */
  margin-bottom: 30px; /* 下のマージン */
  background-color: #f0f0f0; /* 背景色 */
  border-radius: 10px; /* 角の丸み */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 影の追加 */
  transition: all 0.3s ease; /* アニメーション効果 */
}

h1:hover {
  transform: scale(1.05); /* ホバー時に少し大きく */
  background-color: #e8e8e8; /* ホバー時の背景色 */
}

.app-container {
  display: flex; /* フレックスボックスを有効化 */
}

.sidebar {
  width: 200px; /* サイドバーの幅を指定 */
  margin-right: 30px;
}

.main-content {
  flex-grow: 1; /* 残りのスペースをメインコンテンツが占める */
}
</style>

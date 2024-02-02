<template>
    <div class="sidebar">
      <router-link to="/">ホーム</router-link>
      <router-link to="/learning">学習画面へ</router-link>
      <!-- 他のリンクを追加 -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'MainSidebar',
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 200px; /* サイドバーの幅を指定 */
    height: 100vh; /* 画面の高さ全体をカバー */
    background-color: #858080;
    padding: 20px;
  }
  
  /* リンクのスタイル */
  .router-link-active {
    font-weight: bold;
  }
  </style>
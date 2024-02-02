<template>
  <div class="sidebar">
    <router-link to="/" class="sidebar-link">ホーム</router-link>
    <router-link to="/learning" class="sidebar-link">学習画面へ</router-link>
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
    width: 200px;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2); /* 横方向に0、縦方向に2px、ぼかしを4px、色を黒の透明度0.2で指定 */
  }

  .sidebar-link {
    display: block;
    margin: 10px 0;
    padding: 10px;
    color: #333;
    text-decoration: none;
    font-size: 16px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }
  
  .sidebar-link:hover {
    background-color: #ddd;
  }
  
  .router-link-active {
    font-weight: bold;
    color: #000;
    background-color: #ccc;
  }
  </style>
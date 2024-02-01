<template>
    <div>
      <h1>About Page</h1>
      <!-- LocalStorageから取得したデータを表示 -->
      <p>保存された内容: {{ savedInput }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AboutPage',
    data() {
      return {
        savedInput: '', // LocalStorageから取得したデータを保持するためのデータプロパティ
      };
    },
    mounted() {
      // コンポーネントがマウントされた後にLocalStorageからデータを取得
      this.savedInput = localStorage.getItem('userInput') || '何も保存されていません';
    }
  }
  </script>
<template>
    <div>
      <h1>Home Page</h1>
      <input v-model="inputValue" placeholder="何か入力してください">
      <button @click="saveToLocalStorage">保存</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage',
    data() {
      return {
        inputValue: '', // ユーザーの入力を保持するためのデータプロパティ
      };
    },
    methods: {
      saveToLocalStorage() {
        // LocalStorageにユーザーの入力を保存
        localStorage.setItem('userInput', this.inputValue);
        alert('保存しました: ' + this.inputValue);
        // 保存後、入力フィールドをクリア
        this.inputValue = '';
      }
    }
  }
  </script>
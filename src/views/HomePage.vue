<template>
  <div>
    <h1>単語一覧ページ</h1>
    <input v-model="inputWord" placeholder="単語">
    <input v-model="inputTranslation" placeholder="和訳">
    <button @click="saveToLocalStorage">保存</button>
    <button @click="deleteWords" class="delete-button">削除</button>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th></th> <!-- チェックボックス用のヘッダー -->
            <th>単語</th>
            <th>和訳</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, index) in words" :key="index">
            <td><input type="checkbox" v-model="word.checked"></td>
            <td>{{ word.word }}</td>
            <td>{{ word.translation }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      inputWord: '',
      inputTranslation: '',
      words: [] // LocalStorageから読み込んだデータを保持する配列
    };
  },
  methods: {
    saveToLocalStorage() {
      // 新しい単語を追加してLocalStorageに保存
      this.words.push({ word: this.inputWord, translation: this.inputTranslation, checked: false });
      this.updateLocalStorage();
      this.inputWord = '';
      this.inputTranslation = '';
    },
    updateLocalStorage() {
      // LocalStorageを更新
      localStorage.setItem('Words', JSON.stringify(this.words));
      const checkedWords = this.words.filter(word => word.checked);
      localStorage.setItem('CheckedWords', JSON.stringify(checkedWords));
    },
    deleteWords() {
      // チェックされていない単語のみを残す
      this.words = this.words.filter(word => !word.checked);
      // LocalStorageを更新
      this.updateLocalStorage();
    }
  },
  watch: {
    words: {
      handler() {
        // words配列が変更されたらLocalStorageを更新
        this.updateLocalStorage();
      },
      deep: true // 配列内のオブジェクトの変更も検知する
    }
  },
  mounted() {
    this.words = JSON.parse(localStorage.getItem('Words')) || [];
  }
}
</script>

<style scoped>
.table-container {
  max-height: 400px; /* コンテナの最大高さを設定 */
  overflow-y: auto; /* 縦方向にスクロールバーを表示 */
  border: 1px solid #ddd; /* コンテナの境界線を設定 */
}

input {
  display: block;
  /* ブロックレベル要素として表示 */
  width: 30%;
  /* 幅を親要素の80%に */
  margin: 10px auto;
  /* 上下のマージンを10px、左右は自動で中央揃えに */
  padding: 8px;
  /* 内側の余白 */
  border: 1px solid #ccc;
  /* 境界線 */
  border-radius: 4px;
  /* 境界線の角を丸く */
  box-sizing: border-box;
  /* ボックスサイズの計算方法 */
}

/* 保存ボタンのスタイル */
button {
  display: block;
  /* ブロックレベル要素として表示 */
  width: 100px;
  /* 幅 */
  margin: 20px auto;
  /* 上下のマージンを20px、左右は自動で中央揃えに */
  padding: 10px 15px;
  /* 内側の余白 */
  background-color: #333;
  /* 背景色 */
  color: #fff;
  /* 文字色 */
  border: none;
  /* 境界線なし */
  border-radius: 5px;
  /* 境界線の角を丸く */
  cursor: pointer;
  /* カーソルをポインターに */
  transition: background-color 0.3s;
  /* 背景色の変化を滑らかに */
}

button:hover {
  background-color: #555;
  /* ホバー時の背景色 */
}

table {
  border-collapse: collapse;
  /* 隣接するセルのボーダーを1つに */
  width: 100%;
  /* テーブルの幅を親要素に合わせる */
  margin-top: 20px;
  /* テーブルの上にマージンを設定 */
}

th,
td {
  border: 1px solid #ddd;
  /* セルのボーダーを設定 */
  text-align: left;
  /* テキストを左揃えに */
  padding: 8px;
  /* セル内のパディング */
}

th {
  background-color: #f2f2f2;
  /* ヘッダーの背景色 */
}
</style>
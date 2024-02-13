<template>
  <div>
    <h1>単語一覧ページ</h1>
    <div class="search-container">
      <input v-model="searchWords" placeholder="単語">
      <input v-model="searchTranslations" placeholder="和訳">
    </div>
    <div class="button">
      <input type="file" @change="loadWords" accept=".json">
      <button @click="downloadWords" class="download-button">単語ダウンロード</button>
      <button @click="registerDialog" class="register-button">新規作成</button>
      <button @click="editDialog" class="save-button">編集</button>
      <button @click="deleteWords" class="delete-button">削除</button>
    </div>
    <!-- 新規作成ダイアログ、showCreateDialogがtrueの時に表示 -->
    <dialog id="create-dialog" ref="createDialog">
      <h2>新規単語の追加</h2>
      <input v-model="inputWord" placeholder="単語を入力">
      <input v-model="inputTranslation" placeholder="和訳を入力">
      <button @click="saveToLocalStorage">保存</button>
      <button @click="closeCreateDialog">キャンセル</button>
    </dialog>
    <!--編集ダイアログ -->
    <dialog id="edit-dialog" ref="editDialog">
      <h2>編集</h2>
      <input v-model="editWord" placeholder="単語を入力">
      <input v-model="editTranslation" placeholder="和訳を入力">
      <button @click="updateWord">更新</button>
      <button @click="closeEditDialog">キャンセル</button>
    </dialog>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" @change="toggleAllChecks"></th> <!-- マスターチェックボックスを追加 -->
            <th>単語</th>
            <th>和訳</th>
            <th>難易度</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(word, index) in filteredWords" :key="index">
            <td><input type="checkbox" v-model="word.checked"></td>
            <td>{{ word.word }}</td>
            <td>{{ word.translation }}</td>
            <td>{{ word.difficulty || '未学習' }}</td>
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
      editWord: '',
      editTranslation: '',
      editIndex: null,
      words: [],
      showCreateDialog: false,
      searchWords: '',
      searchTranslations: '',
    };
  },
  computed: {
    filteredWords() {
      return this.words.filter(word => {
        const wordLowerCase = word.word.toLowerCase();
        const translationLowerCase = word.translation.toLowerCase();
        const searchWordsLowerCase = this.searchWords.toLowerCase();
        const searchTranslationsLowerCase = this.searchTranslations.toLowerCase();
        return wordLowerCase.includes(searchWordsLowerCase) && translationLowerCase.includes(searchTranslationsLowerCase);
      });
    }
  },
  methods: {
    registerDialog() {
      this.$refs.createDialog.showModal();
    },
    closeCreateDialog() {
      this.$refs.createDialog.close();
    },
    saveToLocalStorage() {
      this.words.push({ word: this.inputWord, translation: this.inputTranslation, checked: false });
      this.updateLocalStorage();
      this.inputWord = '';
      this.inputTranslation = '';
      this.$refs.createDialog.close();
    },
    updateLocalStorage() {
      // LocalStorageを更新
      localStorage.setItem('Words', JSON.stringify(this.words));
    },
    deleteWords() {
      // チェックされていない単語のみを残す
      this.words = this.words.filter(word => !word.checked);
      // LocalStorageを更新
      this.updateLocalStorage();
    },
    editDialog() {
      const checkedWords = this.words.filter(word => word.checked);
      if (checkedWords.length === 1) {
        this.editIndex = this.words.indexOf(checkedWords[0]);
        this.editWord = checkedWords[0].word;
        this.editTranslation = checkedWords[0].translation;
        this.$refs.editDialog.showModal();
      } else {
        alert('1つしか編集できません');
      }
    },
    closeEditDialog() {
      this.$refs.editDialog.close();
    },
    updateWord() {
      if (this.editIndex !== null) {
        this.words[this.editIndex].word = this.editWord;
        this.words[this.editIndex].translation = this.editTranslation;
        this.updateLocalStorage();
        this.closeEditDialog();
      }
    },
    toggleAllChecks(event) {
      const isChecked = event.target.checked;
      this.words.forEach(word => {
        word.checked = isChecked;
      });
      this.updateLocalStorage();
    },
    downloadWords() {
      const wordsData = JSON.stringify(this.words);
      const blob = new Blob([wordsData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'words.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
    loadWords(event) {
      const file = event.target.files[0];
      if (!file) {
        return; // ファイルが選択されていなければ何もしない
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const words = JSON.parse(e.target.result);
          if (Array.isArray(words)) {
            this.words = words; // 読み込んだ単語リストでwordsを更新
            this.updateLocalStorage(); // LocalStorageを更新
          } else {
            alert('ファイルの形式が正しくありません。');
          }
        } catch (error) {
          alert('ファイルの読み込みに失敗しました。');
        }
      };
      reader.readAsText(file); // ファイルの内容をテキストとして読み込む
    },
  },
  watch: {
    words: {
      handler() {
        this.updateLocalStorage();
      },
      deep: true
    }
  },
  mounted() {
    this.words = JSON.parse(localStorage.getItem('Words')) || [];
  }
}
</script>

<style scoped>
.button {
  text-align: right;
}

.table-container {
  max-height: 300px;
  /* コンテナの最大高さを設定 */
  overflow-y: auto;
  /* 縦方向にスクロールバーを表示 */
  border: 1px solid #ddd;
  /* コンテナの境界線を設定 */
}

.search-container input {
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

.button {
  text-align: right;
}

/* ボタン共通スタイル */
.button button {
  background-color: #ffffff;
  /* 白色背景 */
  color: #333333;
  /* 濃いグレー文字色 */
  border: 2px solid #333333;
  /* 濃いグレー枠 */
  padding: 8px 16px;
  /* 内側の余白 */
  margin: 5px;
  /* 外側の余白 */
  border-radius: 4px;
  /* 角の丸み */
  cursor: pointer;
  /* カーソルをポインターに */
  transition: background-color 0.3s, color 0.3s;
  /* 背景色と文字色の変化を滑らかに */
}

/* ボタンホバー時のスタイル */
.button button:hover {
  background-color: #333333;
  /* 濃いグレー背景 */
  color: #ffffff;
  /* 白色文字色 */
}

/* ダイアログボックスのスタイル調整 */
dialog {
  width: 80%;
  /* ダイアログの幅を80%に */
  max-width: 500px;
  /* 最大幅を500pxに設定 */
  padding: 20px;
  /* パディングを20pxに */
  border: 1px solid #ccc;
  /* 境界線のスタイル */
  border-radius: 5px;
  /* 角の丸み */
}

/* ダイアログ内のinputタグのスタイル調整 */
dialog input {
  width: 100%;
  /* 幅を100%に */
  margin: 10px 0;
  /* 上下のマージンを10pxに */
  padding: 10px;
  /* パディングを10pxに */
  font-size: 16px;
  /* フォントサイズを16pxに */
  border: 1px solid #ccc;
  /* 境界線のスタイル */
  border-radius: 4px;
  /* 角の丸み */
}

</style>

<template>
  <div>
    <h1>学習画面</h1>
    <div v-if="checkedWords.length === 0">
      <p>選択されていません。</p>
    </div>
    <template v-else>
      <div v-if="currentWordIndex < checkedWords.length">
        <h2>{{ currentWord.word }}</h2>
        <button @click="showTranslation = !showTranslation">和訳を表示</button>
        <p v-if="showTranslation">和訳: {{ currentWord.translation }}</p>
        <div v-if="showTranslation">
          <button @click="updateWordDifficulty('普通')">普通</button>
          <button @click="updateWordDifficulty('簡単')">簡単</button>
          <button @click="updateWordDifficulty('難しい')">難しい</button>
        </div>
      </div>
      <div v-else>
        <p>全ての単語の学習が完了しました。</p>
      </div>
    </template>
  </div>
</template>

<script scoped>
export default {
  name: 'LearningPage',
  data() {
    return {
      checkedWords: [],
      currentWordIndex: 0,
      showTranslation: false,
    };
  },
  computed: {
    currentWord() {
      return this.checkedWords[this.currentWordIndex] || {};
    }
  },
  methods: {
    goToNextWord() {
      if (this.currentWordIndex < this.checkedWords.length) {
        this.currentWordIndex++;
      }
      this.showTranslation = false;
    },
    updateWordDifficulty(difficulty) {
      if (this.currentWordIndex < this.checkedWords.length) {
        this.checkedWords[this.currentWordIndex].difficulty = difficulty;
        localStorage.setItem('Words', JSON.stringify(this.checkedWords));
        this.goToNextWord();
      }
    }
  },
  mounted() {
    const savedWords = localStorage.getItem('Words');
    if (savedWords) {
      const words = JSON.parse(savedWords);
      this.checkedWords = words.filter(word => word.checked);
    }
  }
}
</script>

<style scoped>
div {
  color: #333; /* テキストの色 */
  font-family: 'Arial', sans-serif; /* フォントファミリー */
  text-align: center;
}

button {
  background-color: #fff; /* ボタンの背景色 */
  color: #333; /* ボタンのテキスト色 */
  border: 2px solid #333; /* ボタンの境界線 */
  padding: 10px 20px; /* ボタン内のパディング */
  margin: 10px 15px; /* ボタン外のマージン */
  border-radius: 5px; /* ボタンの角の丸み */
  cursor: pointer; /* カーソルをポインターに */
  transition: background-color 0.3s, color 0.3s; /* 背景色とテキスト色の変化を滑らかに */
}

button:hover {
  background-color: #333; /* ホバー時の背景色 */
  color: #fff; /* ホバー時のテキスト色 */
}

p {
  margin: 10px 0; /* パラグラフの外側のマージン */
}

/* 学習画面全体のスタイリング */
div {
  max-width: 600px; /* 最大幅 */
  margin: 0 auto; /* 中央揃え */
  padding: 20px; /* 内側のパディング */
}

/* 和訳を表示する部分のスタイリング */
p {
  background-color: #f0f0f0; /* 背景色 */
  padding: 10px; /* パディング */
  border-radius: 5px; /* 角の丸み */
}
</style>
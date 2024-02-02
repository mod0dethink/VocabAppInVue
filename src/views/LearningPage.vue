<template>
  <div>
    <h1>学習画面</h1>
    <div v-if="checkedWords.length === 0">
      <p>選択されていません。</p>
    </div>
    <div v-else-if="currentWordIndex < checkedWords.length">
      <h2>現在の単語: {{ currentWord.word }}</h2>
      <button @click="showTranslation = !showTranslation">和訳を表示</button>
      <p v-if="showTranslation">和訳: {{ currentWord.translation }}</p>
      <button @click="goToNextWord">次へ</button>
    </div>
    <div v-else>
      <p>全ての単語の学習が完了しました。</p>
    </div>
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
    }
  },
  mounted() {
    const savedCheckedWords = localStorage.getItem('CheckedWords');
    if (savedCheckedWords) {
      this.checkedWords = JSON.parse(savedCheckedWords);
    }
  }
}
</script>
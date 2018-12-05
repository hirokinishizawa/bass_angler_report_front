<template>
  <div class="main-container">
    <div class="time-line">
      <div class="title">みんなの投稿</div>
      <report-row 
        v-for="(report, key) in reports" 
        :report="report.report" 
        :key="key"/>
      <div 
        v-if="isLoading && isGoNextPage" 
        class="loading">
        Loading...
      </div>
      <div 
        v-if="!isLoading && isGoNextPage" 
        class="load-button"
        @click="addReports">
        続きを読み込む
      </div>
    </div>
    <div class="like-ranking">
      <div class="title">いいねランキング</div>
      <like-ranking-row 
        v-for="(report, key) in rankingList" 
        :report="report" 
        :key="key"/>
    </div>
  </div>
</template>

<script>
import ReportRow from '~/components/Report/ReportRow'
import LikeRankingRow from '~/components/Report/LikeRankingRow'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    ReportRow,
    LikeRankingRow
  },
  middleware: ['authenticated'],
  data() {
    return {
      rankingList: [
        {
          name: '西澤ひろき',
          user_id: 'hiroki0206',
          address: '千葉県鴨川市保台ダム',
          prefecture: '千葉県',
          description:
            'ブルフラット3inchのテキサスでねちねちやってたら釣れました。',
          size: 40,
          good_count: 20
        },
        {
          name: '西澤ひろき',
          user_id: 'hiroki0206',
          address: '千葉県鴨川市保台ダム',
          prefecture: '千葉県',
          description:
            'ブルフラット3inchのテキサスでねちねちやってたら釣れました。',
          size: 40,
          good_count: 20
        },
        {
          name: '西澤ひろき',
          user_id: 'hiroki0206',
          address: '千葉県鴨川市保台ダム',
          prefecture: '千葉県',
          description:
            'ブルフラット3inchのテキサスでねちねちやってたら釣れました。',
          size: 40,
          good_count: 20
        },
        {
          name: '西澤ひろき',
          user_id: 'hiroki0206',
          address: '千葉県鴨川市保台ダム',
          prefecture: '千葉県',
          description:
            'ブルフラット3inchのテキサスでねちねちやってたら釣れました。',
          size: 40,
          good_count: 20
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      reports: 'report/reports',
      isGoNextPage: 'report/isGoNextPage',
      isLoading: 'report/isLoading'
    })
  },
  created() {
    this.addReports()
  },
  methods: {
    ...mapActions({
      fetchReports: 'report/fetchReports'
    }),
    addReports() {
      this.fetchReports()
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: gray;
  margin-bottom: 8px;
}

.time-line {
  width: 100%;
  margin-right: 16px;
}

.loading {
  text-align: center;
  color: gray;
  margin-top: 30px;
}

.load-button {
  background: #d9f8e9;
  padding: 16px;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  color: skyblue;
  margin-top: 8px;
  box-shadow: 0 0 4px 4px #eafbf3 inset;
  cursor: pointer;
}

.like-ranking {
  width: 320px;
}
</style>

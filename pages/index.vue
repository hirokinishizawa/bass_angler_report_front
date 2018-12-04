<template>
  <div class="main-container">
    <div class="time-line">
      <div class="title">みんなの投稿</div>
      <report-row 
        v-for="(report, key) in reports" 
        :report="report" 
        :key="key"/>
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
export default {
  components: {
    ReportRow,
    LikeRankingRow
  },
  middleware: ['authenticated'],
  data() {
    return {
      reports: [
        {
          name: '西澤ひろき',
          user_id: 'hiroki0206',
          address: '千葉県鴨川市保台ダム',
          description:
            'ブルフラット3inchのテキサスでねちねちやってたら釣れました。',
          size: 40,
          good_count: 20
        }
      ],
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

.like-ranking {
  width: 320px;
}
</style>

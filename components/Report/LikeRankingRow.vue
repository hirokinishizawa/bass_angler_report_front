<template>
  <el-card>
    <div class="name">
      {{ report.user.name }}
    </div>
    <div class="prefecture">
      {{ report.prefectures }}
    </div>
    <div class="user-id">
      @{{ report.user.account }}
    </div>
    <div class="address">
      {{ report.address }}
    </div>
    <div class="description">
      <p>{{ report.description }}</p>
    </div>
    <div class="size">
      {{ report.size }}cm
    </div>
    <div 
      :class="{ghost: good}" 
      class="good"
      @click="onSubmit">
      <div class="text">いいね</div>
      <i 
        v-if="good" 
        class="el-icon-circle-check"/>
      <div 
        v-if="report.goods_count" 
        class="count">{{ report.goods_count }}</div>
    </div>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    report: {
      type: Object,
      required: true
    },
    good: {
      type: Object,
      required: false,
      default: null
    }
  },
  methods: {
    ...mapActions({
      deleteReportGood: 'report/deleteReportGood',
      addReportGood: 'report/addReportGood'
    }),
    async onSubmit() {
      if (this.good) {
        await this.deleteReportGood(this.good)
      } else {
        await this.addReportGood(this.report.id)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  position: relative;
  margin-bottom: 8px;
  width: 100%;

  /deep/ &__body {
    padding: 12px;
    overflow: hidden;
  }
  .name {
    font-size: 18px;
    margin-right: 12px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .prefecture {
    position: absolute;
    top: 0;
    right: 0;
    padding: 12px;
    font-weight: bold;
    font-size: 14px;
    background-color: red;
    color: white;
    border-radius: 4px;
  }
  .user-id {
    font-size: 12px;
    color: lightgray;
    display: flex;
    margin-bottom: 8px;
  }

  .address {
    margin-bottom: 12px;
  }

  .description {
    padding: 12px;
    box-shadow: 0px 0px 6px 3px #d9f8e9 inset;
    border-radius: 8px;
    margin-bottom: 12px;
    width: 100%;
    overflow: hidden;
    p {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      font-size: 14px;
      color: gray;
    }
  }

  .size {
    font-size: 16px;
    font-weight: bold;
    line-height: 1;
    margin-top: 16px;
  }
  .good {
    font-size: 14px;
    font-weight: bold;
    color: skyblue;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 8px;
    line-height: 1;
    border: 2px solid skyblue;
    border-radius: 4px;
    display: flex;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
  .ghost {
    color: white;
    background-color: skyblue;
  }
}
</style>

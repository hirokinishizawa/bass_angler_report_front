<template>
  <div class="goodRanking">
    <el-card>
      <div 
        class="report-wrapper" 
        @click="toggleDetail">
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
        <div class="flex-box">
          <div class="size">
            {{ report.size }}cm
          </div>
          <!-- <div 
            v-if="!hasImage" 
            class="has-image">
            詳細
            <i class="el-icon-arrow-down"/>
          </div> -->
        </div>
      </div>
      <div 
        :class="{ghost: report.good}" 
        class="good"
        @click="onSubmit">
        <div class="text">いいね</div>
        <i 
          v-if="report.good" 
          class="el-icon-circle-check"/>
        <div 
          v-if="report.goods_count" 
          class="count">{{ report.goods_count }}</div>
      </div>
    </el-card>
    <div 
      v-if="isDetail" 
      class="detail">
      <el-card>
        <div 
          v-if="report.image_filename" 
          class="image">
          <img :src="imageUrl">
        </div>
      </el-card>
    </div>
    <div 
      v-if="isDetail"
      class="modal-cover" 
      @click="toggleDetail"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isDetail: false
    }
  },
  computed: {
    hasImage() {
      return this.report.image_filename
    },
    imageUrl() {
      return `http://localhost:8000/images/${this.report.image_filename}`
    }
  },
  methods: {
    ...mapActions({
      deleteReportGood: 'report/deleteReportGood',
      addReportGood: 'report/addReportGood'
    }),
    async onSubmit() {
      if (this.report.good) {
        await this.deleteReportGood(this.report.good)
      } else {
        await this.addReportGood(this.report.id)
      }
    },
    toggleDetail() {
      this.isDetail = !this.isDetail
    }
  }
}
</script>

<style lang="scss" scoped>
.goodRanking {
  .detail {
    z-index: 10;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90vh;
    max-width: 810px;
    margin: auto;
    .el-card {
      height: 100%;
      width: auto;
      img {
        width: 100%;
        height: 87vh;
        object-fit: contain;
      }
    }
  }
}
.el-card {
  position: relative;
  margin-bottom: 8px;
  width: 224px;

  /deep/ &__body {
    padding: 12px;
    overflow: hidden;
  }
  .report-wrapper {
    cursor: pointer;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  .has-image {
    font-size: 16px;
    color: lightgray;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 32px;
    text-align: center;
    margin: auto;
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
.modal-cover {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 7;
  background: rgba(black, 0.2);
  height: 100vh;
  width: 100vw;
}
</style>

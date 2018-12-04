<template>
  <el-card>
    <div class="user-information">
      <div class="name">
        {{ report.name }}
      </div>
      <div class="user-id">
        @{{ report.user_id }}
      </div>
    </div>
    <div class="address">
      {{ report.address }}
    </div>
    <div class="description">
      {{ report.description }}
    </div>
    <div class="image"/>
    <div class="size">
      {{ report.size }}cm
    </div>
    <div class="good">
      いいね{{ report.good_count }}
    </div>

  </el-card>
</template>

<script>
export default {
  props: {
    report: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  width: 100%;
  position: relative;
}
.user-information {
  display: flex;
  margin-bottom: 12px;
  align-items: center;

  .name {
    font-size: 18px;
    margin-right: 12px;
    font-weight: bold;
  }
  .user-id {
    font-size: 12px;
    color: lightgray;
    display: flex;
  }
}

.address {
  margin-bottom: 12px;
}

.description {
  padding: 16px;
  box-shadow: 0px 0px 6px 3px #d9f8e9 inset;
  border-radius: 8px;
  color: gray;
  margin-bottom: 12px;
}

.size {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  margin-top: 16px;
}
.good {
  font-size: 20px;
  font-weight: bold;
  color: skyblue;
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 12px;
  line-height: 1;
  border: 2px solid skyblue;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
}
</style>

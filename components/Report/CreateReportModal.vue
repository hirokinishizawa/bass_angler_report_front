<template>
  <modal 
    title="投稿する" 
    submit-text="投稿する" 
    @cancel="doCancel" 
    @submit="doSubmit">
    <div slot="modal-content">
      <el-form
        ref="form" 
        :model="formData" 
        label-width="120px">
        <el-form-item label="サイズ:">
          <div class="size">
            <el-input v-model="formData.size"/>
            cm
          </div>
        </el-form-item>
        <el-form-item label="都道府県:">
          <el-select v-model="formData.prefectures">
            <el-option
              v-for="item in prefectures"
              :key="item"
              :label="item"
              :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="都道府県以下:">
          <el-input v-model="formData.address"/>
        </el-form-item>
        <el-form-item label="備考:">
          <el-input
            v-model="formData.description" 
            :rows="2"
            type="textarea"/>
        </el-form-item>
      </el-form>
    </div>
  </modal>
</template>


<script>
import Modal from '@/components/Global/Parts/Modal'
import prefectures from '@/config/Prefectures'

export default {
  components: {
    Modal
  },
  data() {
    return {
      formData: {
        size: '',
        prefectures: '',
        address: '',
        description: ''
      },
      prefectures
    }
  },
  methods: {
    doCancel() {
      this.$emit('cancel')
    },
    doSubmit() {
      this.$emit('submit', this.formData)
    }
  }
}
</script>

<style lang="scss" scoped>
.size {
  width: 80px;
  display: flex;
  align-items: flex-end;
  font-size: 18px;
}
</style>

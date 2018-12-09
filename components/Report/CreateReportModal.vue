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
            <el-input v-model="formData.size"/>cm
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
        <el-form-item label="画像">
          <img 
            v-show="uploadedImage" 
            :src="uploadedImage" >
          <input 
            type="file" 
            @change="onFileChange">
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
      uploadFile: null,
      uploadedImage: '',
      prefectures
    }
  },
  methods: {
    doCancel() {
      this.$emit('cancel')
    },
    doSubmit() {
      this.$emit('submit', this.formData)
    },
    async onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files
      this.uploadFile = files[0]
      let formData = new FormData()
      formData.append('image_filename', this.uploadFile)
      const s = await this.$axios.post('/api/report/upload', formData)
      console.log(s)
      this.createImage(files[0])
    },
    // アップロードした画像を表示
    createImage(file) {
      let reader = new FileReader()
      reader.onload = e => {
        this.uploadedImage = e.target.result
      }
      reader.readAsDataURL(file)
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

img {
  width: 100%;
}
</style>

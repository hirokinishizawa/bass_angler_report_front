<template>
  <aside class="selection-modal">
    <div 
      :style="bodyStyle" 
      class="selection-modal__body">
      <header class="selection-modal__header">
        <slot name="modal-header">
          <span class="header__title">{{ title }}</span>
          <span 
            class="header__close" 
            @click="doCancel">×</span>
        </slot>
      </header>
      <form 
        class="selection-modal__content" 
        @submit.prevent="doSubmit">
        <slot name="modal-content"/>
      </form>
      <template v-if="hasFooter">
        <footer class="selection-modal__footer">
          <slot name="modal-footer">
            <el-button 
              type="primary" 
              @click="doSubmit">{{ submitText }}</el-button>
          </slot>
        </footer>
      </template>
    </div>
    <div 
      class="selection-modal__cover" 
      @click="doCancel" />
  </aside>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '840px'
    },
    title: {
      type: String,
      default: '以下を入力してください' // 一応汎用的な文言を載せておく
    },
    submitText: {
      type: String,
      default: '決定'
    },
    hasFooter: {
      type: Boolean,
      default: true
    },
    isUploading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bodyStyle() {
      return {
        width: this.width,
        minWidth: this.minWidth
      }
    }
  },
  methods: {
    doCancel() {
      this.$emit('cancel')
    },
    doSubmit() {
      this.$emit('submit')
    }
  }
}
</script>

<style lang="scss" scoped>
.selection-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;

  .selection-modal__body {
    position: relative;
    z-index: 10000;
    background: white;
    border: 1px solid lightgray;
    box-shadow: 0 0.125rem 0.25rem 0 rgba(black, 0.12),
      0 0 6px 0 rgba(0, 0, 0, 0.04);
    border-radius: 0.125rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
  }

  .selection-modal__cover {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(black, 0.2);
  }

  .selection-modal__header {
    width: 100%;
    height: 3.375rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px #e7e9ed;
    background-color: lightgray;

    .header__title {
      font-family: HiraKakuProN-W6;
      font-size: 1rem;
      color: darkgray;
      letter-spacing: 0;
      line-height: 1rem;
    }

    .header__close {
      cursor: pointer;
    }
  }

  .selection-modal__content {
    flex: 1;
    padding: 2.5rem 1rem 1rem;
    max-height: 60vh;
    overflow-y: auto;
  }

  .selection-modal__footer {
    padding: 1rem;
    width: 100%;
    height: 4.375rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    .button + .button {
      margin-left: 0.5rem;
    }
  }
}
</style>

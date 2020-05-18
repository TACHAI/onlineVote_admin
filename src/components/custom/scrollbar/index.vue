<template>
  <el-scrollbar :wrap-class="cls" view-class="my-scroll-view" class="my-scroll-container">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  name: 'Scrollbar',
  props: {
    data: {
      type: [Array, Object, String],
      default() {
        return []
      }
    },
    direction: {
      type: String,
      default: 'y'
    }
  },
  data() {
    return {
    }
  },
  computed: {
    cls() {
      if (this.direction.toLowerCase() === 'Y') {
        return 'my-scroll-wrapper-x'
      } else {
        return 'my-scroll-wrapper-y'
      }
    }
  },
  watch: {
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .my-scroll-container .el-scrollbar__view.my-scroll-view {
    min-height: 100%;
  }
  .my-scroll-container {
    height: 100%;
  }
  .my-scroll-wrapper-y {
    overflow-x: hidden;
    height: 100%;
  }
  .my-scroll-wrapper-x {
    overflow-y: hidden;
    width: 100%;
  }
</style>

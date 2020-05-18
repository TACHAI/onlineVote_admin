export default {
  methods: {
    _globalLoading(text) {
      const loading = this.$loading({
        lock: true,
        text: text || '正在提交',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      this.$store.dispatch('utils/setLoading', loading)
    }
  }
}

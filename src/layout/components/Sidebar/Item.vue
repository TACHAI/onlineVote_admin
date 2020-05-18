<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      let _icon = icon || 'dashboard'
      _icon = _icon + ' svg-icon'
      vnodes.push(<i class={_icon}></i>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style lang="scss" scope>
 .svg-icon {
    width: 1em!important;
    height: 1em;
    vertical-align: -0.15em;
    overflow: hidden;
    font-size: 1em;
    display: inline-block;
 }
</style>

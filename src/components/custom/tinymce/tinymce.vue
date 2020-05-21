<template>
  <editor v-model="myValue" :init="options" :disabled="disabled" :api-key="apiKey" />
</template>

<script>
// import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/plugins/advlist' // 高级列表(一栏列表)
import 'tinymce/plugins/anchor' // 锚点
import 'tinymce/plugins/autolink' // 自动连接
// import 'tinymce/plugins/autoresize' // 编辑器大小自适应
import 'tinymce/plugins/autosave' // 自动存稿
// import 'tinymce/plugins/bbcode' // BBCode的输入输出功能
import 'tinymce/plugins/code' // 源代码
import 'tinymce/plugins/charmap' // 特殊字符
import 'tinymce/plugins/codesample' // 代码示例插件
import 'tinymce/plugins/colorpicker' // 颜色选择
import 'tinymce/plugins/contextmenu' // 右键菜单
import 'tinymce/plugins/directionality' // 文字方向
import 'tinymce/plugins/emoticons' // 表情插件
import 'tinymce/plugins/emoticons/js/emojis'
import 'tinymce/plugins/fullscreen' // 全屏
import 'tinymce/plugins/help' // 帮助组
import 'tinymce/plugins/hr' // 水平分割线
import 'tinymce/plugins/image' // 插入编辑图片
import 'tinymce/plugins/importcss' // 在菜单“格式”项中加入自定义的样式，该插件支持高级配置参数
import 'tinymce/plugins/insertdatetime' // 插入时间
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists' // 列表
import 'tinymce/plugins/media' // 媒体图像
import 'tinymce/plugins/nonbreaking' // 插入不间断空格
import 'tinymce/plugins/noneditable' // 不可编辑元素
import 'tinymce/plugins/pagebreak' // 分页符
import 'tinymce/plugins/paste' // 粘贴插件
import 'tinymce/plugins/preview' // 预览
import 'tinymce/plugins/print'
// import 'tinymce/plugins/quickbars' // 快速工具栏
import 'tinymce/plugins/save' // 保存
import 'tinymce/plugins/searchreplace' // 查找替换
import 'tinymce/plugins/spellchecker' // 拼写检察
import 'tinymce/plugins/table' // 表格
import 'tinymce/plugins/template' // 模板
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/toc' // 目录生成器
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount' // 字数统计
import 'tinymce/plugins/bdmap/plugin.min.js' // 百度地图
import 'tinymce/plugins/indent2em/plugin.min.js' // 首行缩进
import 'tinymce/plugins/lineheight/plugin.min.js' // 行高
import 'tinymce/plugins/axupimgs/plugin.min.js' // 多图上传

import axios from 'axios'
import { getToken } from '../../../utils/auth'

export default {
  components: {
    Editor
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    apiKey: {
      type: String,
      default: 'sdaqmazereqem861n4uaysygqucac1dajacyf3igpqg32azi'
    },
    plugins: {
      type: [String, Array],
      default:
        'lists advlist anchor autolink autosave code charmap codesample colorpicker directionality emoticons fullscreen help hr image imagetools importcss insertdatetime link media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker table template textcolor textpattern toc visualblocks visualchars wordcount bdmap indent2em lineheight axupimgs'
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo | formatselect | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | lineheight | indent2em | ltr rtl | forecolor backcolor | textcolor | table tabledelete | bullist numlist outdent indent | textpattern | image imagetools axupimgs | media | link | emoticons | charmap | codesample | bdmap | insertdatetime | hr | nonbreaking | pagebreak | visualblocks | visualchars | removeformat | toc | anchor | paste | code | searchreplace | template | fullscreen | preview | print | save | restoredraft | wordcount | help'
    },
    autoFocus: {
      type: Boolean,
      default: false
    },
    imagesUploadBasePath: {
      type: String,
      default: ''
    },
    setup: {
      type: Function,
      default() {
        return function(editor) {}
      }
    },
    initInstanceCallback: {
      type: Function,
      default() {
        return function(editor) {}
      }
    },
    placeholder: {
      type: String,
      default: '说点什么吧...'
    },
    height: {
      type: Number,
      default: 600
    },
    minHeight: {
      type: Number,
      default: 450
    },
    fontsizeFormats: {
      type: String,
      default: '12px 13px 14px 15px 16px 17px 18px 19px 20px 24px 36px 48px'
    },
    fontFormats: {
      type: String,
      default: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;'
    }
  },
  data() {
    return {
      options: {
        base_url: '/tinymce/',
        language_url: '/tinymce/tinymce_languages/langs/zh_CN.js', // 语言包
        language: 'zh_CN', // 语言
        skin_url: '/tinymce/skins/ui/oxide', // 皮肤样式路径
        content_css: '/tinymce/skins/content/default/content.min.css', // 内容样式路径
        auto_focus: this.auto_focus, // 自动获取焦点
        cache_suffix: '?v=5', // 缓存请求后缀
        toolbar_mode: 'wrap',
        image_caption: true,
        image_advtab: true,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        inline: false, // 内联模式
        hidden_input: false,
        // readonly: true, // 只读模式
        height: this.height, // 编辑器高度
        min_height: this.min_height,
        fontsize_formats: this.fontsize_formats,
        font_formats: this.font_formats,
        importcss_append: true,
        branding: true, // 右下角技术支持显示隐藏
        contextmenu: 'bold italic underline anchor undo redo copy', // 上下文右键菜单
        contextmenu_never_use_native: true, // 禁止浏览器默认右键菜单
        elementpath: true, // 是否显示底栏元素路径
        menubar: 'file edit insert view format table tools help',
        // quickbars_insert_toolbar: 'quickimage quicktable quickmedia', // （[插入]快捷工具栏）
        quickbars_selection_toolbar: 'bold italic | forecolor backcolor | quicklink h2 h3 blockquote', // （[选择]快捷工具栏）
        placeholder: this.placeholder,
        images_reuse_filename: true,
        toolbar: this.toolbar, // 工具条
        plugins: this.plugins, // 插件
        images_upload_base_path: this.images_upload_base_path,
        // 初始化前函数
        setup: this.setup,
        // 初始化成功函数
        init_instance_callback: this.init_instance_callback,
        // 图片上传函数
        images_upload_handler: (blobInfo, success, fail) => {
          const formData = new FormData()
          formData.append('file', blobInfo.blob())
          axios({
            url: process.env.VUE_APP_BASE_API + '/api/upload/uploadImage',
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': this.$store.getters.token || getToken()
            },
            method: 'POST',
            data: formData
          }).then(res => {
            const result = res.data
            if (result.status === 200) {
              success(process.env.VUE_APP_BASE_API + result.link)
            } else {
              fail(result.msg || '上传失败')
            }
          }).catch(error => {
            fail(error.msg || '上传失败')
          })
        },
        // 文件上传
        file_picker_callback: (callback, value, meta) => {
          let url = process.env.VUE_APP_BASE_API + '/api/upload/uploadFile'
          let filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4'
          switch (meta.filetype) {
            case 'image':
              filetype = '.jpg, .jpeg, .png, .gif'
              url = process.env.VUE_APP_BASE_API + '/api/upload/uploadImage'
              break
            case 'media':
              filetype = '.mp3, .mp4'
              url = process.env.VUE_APP_BASE_API + '/api/upload/uploadVideo'
              break
            case 'file':
            default:
          }
          const input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', filetype)
          input.click()
          input.addEventListener('change', () => {
            const file = input.files[0]
            const ext = file.name.substring(file.name.lastIndexOf('.') + 1)
            const name = file.name.substring(0, file.name.lastIndexOf('.'))
            if (!(new RegExp(ext).test(filetype))) return this.$message.error('请上传正确的文件格式')
            const loading = this.$loading({
              lock: true,
              text: '正在上传',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0)'
            })
            const formData = new FormData()
            formData.append('file', file)
            axios({
              url,
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': this.$store.getters.token || getToken()
              },
              method: 'POST',
              data: formData
            }).then(res => {
              loading.close()
              this.$message.success('上传成功')
              const result = res.data
              if (result.status === 200) {
                switch (meta.filetype) {
                  case 'image':
                    callback(process.env.VUE_APP_BASE_API + result.link, { alt: name })
                    break
                  case 'media':
                    callback(process.env.VUE_APP_BASE_API + result.link)
                    break
                  default:
                    callback(process.env.VUE_APP_BASE_API + result.link, { text: name })
                    break
                }
              }
            }).catch(() => {
              loading.close()
              this.$message.error('上传失败')
            })
          })
        }
      },
      myValue: ''
    }
  },
  created() {
    this.myValue = this.text
  },
  methods: {
    clear() {
      this.myValue = ''
      console.log(this.myValue)
    },
    getContent() {
      return this.myValue
    }
  }
}
</script>

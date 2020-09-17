<template>
  <div class="dict-edit-page">
    <el-page-header :content="$route.params.dictId === 'default' ? '新增字典':'修改字典'" style="padding: 10px 20px 20px;" @back="$router.go(-1)"/>
    <el-form v-if="!loading" ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
     <el-form-item style="display: none" prop="id">
       <el-input v-model="form.id" size="small"/>
     </el-form-item>
      <el-form-item label="字典名称" prop="name">
        <el-input v-model="form.name" size="small" placeholder="字典名称"/>
      </el-form-item>
<!--      <el-form-item label="字典值" prop="value">-->
<!--        <el-input v-model="form.value" size="small" placeholder="字典值"/>-->
<!--      </el-form-item>-->
      <el-form-item label="字典类型名称" prop="typeName">
        <el-input disabled v-model="form.typeName" size="small" placeholder="字典类型名称"/>
      </el-form-item>
      <el-form-item label="字典类型值" prop="type" >
        <el-input disabled v-model="form.type" size="small" placeholder="字典类型值"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {dictAdd,dictEdit,selectById} from '@/api/dict.js'
  export default {
      name: "DictEdit",
      data(){
        return {
          form:{
            id: '',
            name: '',
            type: 1,
            typeName: '类型'
          },
          rules:{
            id:[],
            name:[{required:true,message: '请填写字典名称'}],
            // value:[{required:true,message: '请填写字典值名称'}],
            type:[{required:true,message: '请填写字典类型值'}],
            typeName:[{required:true,message: '请填写字典类型名称'}],
          },
          loading: true
        }
      },
      async created(){
        const {dictId}=this.$route.params
        if(dictId==='default'){
          this.loading=false
        }else {
          try {
            const result = await selectById(dictId)
            const {id,name,typeName,type,value}=result.data
            this.form.id=id
            this.form.name=name
            this.form.typeName=typeName
            this.form.type=type
            this.form.value=value
          }catch (e) {
            console.log(e)
          }finally {
            this.loading=false
          }
        }
      },
      methods:{
        onSubmit() {
          this.$refs.form.validate(async valid => {
            if (!valid) return false
            let request, data
            if (this.form.id) {
              request = dictEdit
              data = Object.assign(this.form, {})
            } else {
              request = dictAdd
              const {id, ...reset} = this.form
              data = reset
            }
            this._globalLoading()
            const result = await request(data)
            this.$message.success(result.msg || '成功')
            this.$router.go(-1)
          })
        }
      }
    }
</script>

<style scoped>

</style>

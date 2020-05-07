<template>
  <d2-container>
    <template slot="header">标签管理</template>
    <el-form :model="label_info" ref="label_info" label-width="100px" class="demo-label_info">
      <el-form-item label="响应标签">
        <el-select
          v-model="response_label_value"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="选择或直接添加响应标签">

          <el-option
            v-for="item in response_label_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="禁止修改标签">
        <el-select
          v-model="denied_label_value"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="选择或直接添加禁止修改标签">
          <el-option
            v-for="item in denied_label_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="不响应的label">
        <el-select
          v-model="not_response_label_value"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="选择或直接添加不响应标签">
          <el-option
            v-for="item in not_response_label_options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :selected=true>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="仓库锁">
        <el-select
          v-model="label_lock_value"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="选择或直接添加仓库锁">
          <el-option
            v-for="item in label_lock_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="pr标签锁">
        <el-select
          v-model="pr_label_lock_value"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="选择或直接添加pr标签锁">
          <el-option
            v-for="item in pr_label_lock_options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('label_info')">更新</el-button>
      </el-form-item>
    </el-form>
  </d2-container>
</template>

<script>
  import { getLabel } from '@api/butter.cicd.get_label'
  import { setLabel } from '@api/butter.cicd.set_label'
  export default {
    data() {
      return {
        label_info:{
          'response_label_value':[],
          'denied_label_value':[],
        },
        response_label_value:[],
        response_label_options:[],
        denied_label_value:[],
        denied_label_options:[],
        not_response_label_options:[],
        not_response_label_value:[],
        label_lock_options:[],
        label_lock_value:[],
        pr_label_lock_value:[],
        pr_label_lock_options:[],
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            setLabel({
              response_label_value:this.response_label_value,
              denied_label_value:this.denied_label_value,
              not_response_label_value:this.not_response_label_value,
              label_lock_value:this.label_lock_value,
              pr_label_lock_value:this.pr_label_lock_value
            })
            .then(res => {
              console.log(JSON.stringify(res))
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.get_label_info()
            })
            .catch(err => {
              console.log(JSON.stringify(err))
              console.log('err', err)
              return false;
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      get_label_info() {
        getLabel()
        .then(res => {
          if(res.hasOwnProperty("response_label_options")){
            this.response_label_options = res.response_label_options
          }
          if(res.hasOwnProperty("response_label_value")){
            this.response_label_value = res.response_label_value
          }
          if(res.hasOwnProperty("denied_label_value")){
            this.denied_label_value = res.denied_label_value
          }
          if(res.hasOwnProperty("denied_label_options")){
            this.denied_label_options = res.denied_label_options
          }
          if(res.hasOwnProperty("not_response_label_options")){
            this.not_response_label_options = res.not_response_label_options
          }
          if(res.hasOwnProperty("not_response_label_value")){
            this.not_response_label_value = res.not_response_label_value
          }
          if(res.hasOwnProperty("label_lock_options")){
            this.label_lock_options = res.label_lock_options
          }
          if(res.hasOwnProperty("label_lock_value")){
            this.label_lock_value = res.label_lock_value
          }
          if(res.hasOwnProperty("pr_label_lock_options")){
            this.pr_label_lock_options = res.pr_label_lock_options
          }
          if(res.hasOwnProperty("pr_label_lock_value")){
            this.pr_label_lock_value = res.pr_label_lock_value
          }

        })
        .catch(err => {
          console.log(JSON.stringify(err))
          console.log('err', err)
          return false;
        })
      }
    },
    mounted(){
      this.get_label_info()
    }
  }
</script>


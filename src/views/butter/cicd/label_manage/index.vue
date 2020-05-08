<template>
  <d2-container>
    <template slot="header">标签管理</template>
    <el-form :model="label_info" ref="label_info" label-width="100px" class="demo-label_info" >
      <el-form-item label="监听仓库">
        <el-col :span="12">
          <el-select
            v-model="monitor_github_repo_value"
            multiple
            v-loading="loading"
            filterable
            style="width: 400px"
            placeholder="选择或直接添加响应标签">

            <el-option
              v-for="item in monitor_github_repo_options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disable"
              :span="8">
            </el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="响应标签">
        <el-select
          v-model="response_label_value"
          multiple
          filterable
          allow-create
          style="width: 400px"
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
          style="width: 400px"
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
          style="width: 400px"
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
          style="width: 400px"
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
          style="width: 400px"
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
    <div class="tip" v-if="monitor_github_organization_show">
      <p>目前您可以选择如下组织所拥有的代码仓库：</p>
        <blockquote>
          <p v-for="item in monitor_github_organization" :key="item.value" :data-value="item.value" >
            <el-link :underline="false" :href="get_github_organization_url(item)" type="primary"><d2-icon name="github"/>&nbsp;{{item}}</el-link>
          </p>
        </blockquote>
        超出此范围的将不再支持
    </div>
  </d2-container>
</template>
<style>
  body {
    margin: 0;
  }
  .tip {
    padding: 8px 16px;
    background-color: #ecf8ff;
    border-radius: 4px;
    border-left: 5px solid #50bfff;
    margin: 20px 0;
}
</style>
<script>
  import { getLabel } from '@api/butter.cicd.get_label'
  import { setLabel } from '@api/butter.cicd.set_label'
  export default {
    data() {
      return {
        loading: false,
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
        monitor_github_repo_value:[],
        monitor_github_repo_options:[],
        monitor_github_organization:'',
        monitor_github_organization_show:false
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '提交数据中..',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            setLabel({
              response_label_value:this.response_label_value,
              denied_label_value:this.denied_label_value,
              not_response_label_value:this.not_response_label_value,
              label_lock_value:this.label_lock_value,
              pr_label_lock_value:this.pr_label_lock_value,
              monitor_github_repo_value:this.monitor_github_repo_value,
              confirm:false
            })
            .then(res => {
              if (res.confirm){
                this.$confirm(res.msg)
                  .then(_ => {
                    setLabel({
                      response_label_value:this.response_label_value,
                      denied_label_value:this.denied_label_value,
                      not_response_label_value:this.not_response_label_value,
                      label_lock_value:this.label_lock_value,
                      pr_label_lock_value:this.pr_label_lock_value,
                      monitor_github_repo_value:this.monitor_github_repo_value,
                      confirm:true
                    }).then(res => {
                      loading.close();
                      this.get_label_info()
                      this.$message({
                        message: res.msg,
                        type: 'success'
                      })
                    }).catch(err => {
                      console.log(JSON.stringify(err))
                      console.log('err', err)
                      loading.close();
                    })
                  }).catch(err =>{
                    loading.close();
                })
              }else{

                loading.close();
                this.get_label_info()
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
              }
            })
            .catch(err => {
              console.log(JSON.stringify(err))
              console.log('err', err)
              loading.close();
              return false;
            })

          } else {
            console.log('error submit!!');
            loading.close();
            return false;
          }
        });
      },
      get_label_info() {
        const loading = this.$loading({
          lock: true,
          text: '刷新GitHub仓库信息中，请稍后..',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
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
          if(res.hasOwnProperty("monitor_github_repo_options")){
            this.monitor_github_repo_options = res.monitor_github_repo_options
          }
          if(res.hasOwnProperty("monitor_github_repo_value")){
            this.monitor_github_repo_value = res.monitor_github_repo_value
          }
          this.monitor_github_organization_show = true;
          this.monitor_github_organization = res.monitor_github_organization
          loading.close();
        })
        .catch(err => {
          console.log(JSON.stringify(err))
          console.log('err', err)
          loading.close();
          return false;
        })

      },
      get_github_organization_url(name){
        return "https://github.com/"+name
      }
    },
    mounted(){
      this.get_label_info()
    }
  }
</script>


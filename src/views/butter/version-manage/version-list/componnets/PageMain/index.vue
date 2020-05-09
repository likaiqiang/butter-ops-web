<template>
  <div>
    <d2-crud
      ref="d2Crud"
      :columns="columns"
      :data="currentTableData"
      :rowHandle="rowHandle"
      edit-title="我的修改"
      :edit-template="editTemplate"
      :form-options="formOptions"
      @dialog-open="handleDialogOpen"
      @row-edit="handleRowEdit"
      @dialog-cancel="handleDialogCancel"
      :options="options">
      </d2-crud>
  </div>
</template>

<script>
import Vue from 'vue'
import D2Crud from '@d2-projects/d2-crud'
import state from './tag/state'
import { setUser } from '@api/butter.user.edituser'
Vue.use(D2Crud)
export default {
  components: {
    state
  },
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    }
  },
  data () {
    return {
      currentTableData: [],
      multipleSelection: [],
      columns: [
        {
          title: '模版ID',
          key: 'id',
          width: '70'
        },
        {
          title: '模版名',
          key: 'username',
          width: '200'
        },
        {
          title: '关联项目',
          key: 'is_active'
        },
        {
          title: '最新版本号',
          key: 'last_login'
        },

      ],
      rowHandle: {
        columnHeader: '管理',
        width: '200',
        edit: {
          icon: 'el-icon-edit',
          text: '编辑',
          size: 'small'
        }
      },
      editTemplate: {
        id: {
          title: '用户ID',
          value: '',
          component:{
            disabled:true
          }

        },
        username: {
          title: '用户名',
          value: '',
          component:{
            disabled:true
          }

        },
        role: {
          title: '角色',
          value: '',
          component: {
            name: 'el-select',
            options: this.GLOBAL.USER_ROLE
          }
        },
        is_active: {
          title: '用户状态',
          value: '',
          component: {
            name: 'el-switch',
            options: [
              {
                'label':'正常',
                'value':true
              },
              {
                'label':'冻结',
                'value':false
              },
            ]
          }
        }
      },
      formOptions: {
        labelWidth: '80px',
        labelPosition: 'left',
        saveLoading: false
      },
      options: {
        stripe: true
      }
    }
  },
  watch: {
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    handleDialogOpen ({ mode, row }) {
      // this.$message({
      //   message: '打开模态框，模式为：' + mode,
      //   type: 'success'
      // })
    },
    handleRowEdit ({ index, row }, done) {
      this.formOptions.saveLoading = true
      setUser({
        ...row
      })
        .then(res => {
          this.formOptions.saveLoading = false
          console.log(JSON.stringify(res))
          this.$message({
            message: res.msg,
            type: 'success'
          })
        })
        .catch(err => {
          console.log(JSON.stringify(err))
          console.log('err', err)
          return false;
        })
      setTimeout(() => {
        // done可以传入一个对象来修改提交的某个字段
        done()
        this.formOptions.saveLoading = false
      }, 300)
    },
    handleDialogCancel (done) {
      done()
    }
  }
}
</script>

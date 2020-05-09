<template>
  <el-form
    :inline="true"
    :model="form"
    :rules="rules"
    ref="form"
    size="mini"
    style="margin-bottom: -18px;">

    <el-form-item label="状态" prop="type">
      <el-select
        v-model="form.type"
        placeholder="状态选择"
        style="width: 100px;">
        <el-option label="正常" value="1"/>
        <el-option label="冻结" value="0"/>
      </el-select>
    </el-form-item>

    <el-form-item label="用户" prop="username">
      <el-input
        v-model="form.username"
        placeholder="用户"
        style="width: 100px;"/>
    </el-form-item>

    <el-form-item label="角色" prop="role">
      <el-select
        v-model="form.role"
        placeholder="用户身份"
        style="width: 100px;">
        <div v-for="user_role in user_roles">
          <el-option :label="user_role.name" :value="user_role.value"/>
        </div>
      </el-select>
    </el-form-item>


    <el-form-item>
      <el-button
        type="primary"
        @click="handleFormSubmit">
        <d2-icon name="search"/>
        查询
      </el-button>
    </el-form-item>

    <el-form-item>
      <el-button
        @click="handleFormReset">
        <d2-icon name="refresh"/>
        重置
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  data () {
    return {
      form: {
        type: '',
        username: '',
        role: '',
      },
      rules: {
        type: [ { required: false, message: '请选择一个状态', trigger: 'change' } ],
        username: [ { required: false, message: '请输入用户', trigger: 'change' } ]
      }
    }
  },
  computed:{
    user_roles() {
      return this.GLOBAL.USER_ROLE
    }
  },
  methods: {
    handleFormSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        } else {
          this.$notify.error({
            title: '错误',
            message: '表单校验失败'
          })
          return false
        }
      })
    },
    handleFormReset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

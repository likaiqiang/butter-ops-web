<template>
  <div style="cursor: pointer">
    <div v-for="user_role in user_roles">
      <el-tag size="small"   :type="user_role.css_tag_color" v-if="role === user_role.value" >{{user_role.name}}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      require: true
    }
  },
  computed: {
    role () {
      return this.value
    },
    user_roles() {
      return this.GLOBAL.USER_ROLE
    }
  },
  methods: {
  }
}
</script>

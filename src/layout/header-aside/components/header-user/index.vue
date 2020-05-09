<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">{{info.name ? `你好 ${info.name}` : name}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="editUserProfile">
        <d2-icon name="user-circle" class="d2-mr-5"/>
        修改资料
      </el-dropdown-item>
      <el-dropdown-item @click.native="getVersion">
        <d2-icon name="info-circle" class="d2-mr-5" />
        版本信息
      </el-dropdown-item>
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5"/>
        注销
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import util from '@/libs/util.js'
import { getVersion } from '@api/butter.doc.get_version'
export default {
  data() {
    return {
      name:'未登录'
    }
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  mounted(){
    if(util.cookies.get('username')||util.cookies.get('name')){
      this.name = util.cookies.get('username')||util.cookies.get('name')
    }
  }
  ,
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    editUserProfile () {
      this.$router.push({name:'user_list'})
    }
    ,
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    getVersion(){
      getVersion()
        .then(res => {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: '<p>前端版本：'+this.$version+'</p><br><p>后端版本：'+res.version+'</p>',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(JSON.stringify(err))
          console.log('err', err)
          return false;
        })
    }
  }
}
</script>

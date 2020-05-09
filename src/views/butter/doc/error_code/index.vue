<template>
  <d2-container-frame :src="url"/>
</template>
<script>
  import util from '@/libs/util'
  export default {
    name: 'doc_code',
    data() {
      return {
        url: ''
      };
    },
    methods: {
      get_label_info() {
        let token = util.cookies.get('token')
        console.log(token)
        this.url = "/api/v1/doc/code?token="+token
      },
    },
    mounted(){
      this.get_label_info()
    }
  }
</script>

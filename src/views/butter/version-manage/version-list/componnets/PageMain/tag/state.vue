<template>
  <div style="cursor: pointer">
    <d2-icon v-if="state === true"
              name="check-circle"
              style="font-size: 20px; line-height: 32px; color: #67C23A;"
              slot="active"/>
    <d2-icon v-else
        name="times-circle"
        style="font-size: 20px; line-height: 32px; color: #F56C6C;"
        slot="inactive"/>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      require: true
    }
  },
  computed: {
    state () {
      return this.value
    }
  },
  methods: {
  }
}
</script>


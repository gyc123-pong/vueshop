<template>
  <header class="simple-header">
    <i v-if="!isback" class="nbicon nbfanhui" @click="goBack"></i>
    <i v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
    <div class="simple-header-name">{{ name }}</div>
    <i class="nbicon nbmore"></i>
  </header>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  props:{
    name: {
      type: String,
      default: '',
    },
    back: {
      type:String,
      default: ''
    },
    noback: {
      type: Boolean,
      default: false
    }
  },
  emits:['callback'],

  setup(props, ctx){
    const router = useRouter()
    const isback = ref(props.noback)
    const goBack = () => {
      if(!props.back){
        router.go(-1)
      }else{
        router.push({path: props.back})
      }
    ctx.emit('callback')
    console.log('ctx', ctx)
    }
    return{
      goBack,
      isback
    }
  }

}
</script>

<style lang="less" scoped>
  @import '../common/style/mixin';
  .simple-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .simple-header-name {
      font-size: 14px;
    }
  }
</style>
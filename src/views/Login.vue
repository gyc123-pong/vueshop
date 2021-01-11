<template>
  <div class="login">
    <s-header :name="type == 'login' ? '登录' : '注册'" :back="'/home'"></s-header>
    <img class="logo" src="//s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png" alt="">
    <div v-if="type === 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="username"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="verify"
        >
          <template #button>
            <vue-img-verify ref="verifyRef" />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button round block color="#1baeae" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>


    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="username1"
          name="username"
          label="手机号"
          placeholder="手机号"
          :rules="[{ required: true, message: '请输入手机号' }]"
        />
        <van-field
          v-model="password1"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="verify"
        >
          <template #button>
            <vue-img-verify ref="verifyRef" />
          </template>
        </van-field>
        <div style="margin: 16px;">
          <div class="link-register" @click="toggle('login')">已有登录账号</div>
          <van-button round block color="#1baeae" native-type="submit">注册</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref } from 'vue';
import sHeader from '../components/SimpleHeader';
import vueImgVerify from '../components/vueImgVerify';
import { setLocal } from '../common/js/util';
import { login, register  } from '../api/user';        
import md5 from 'js-md5';
import { Toast } from 'vant';
export default {
  components:{
    sHeader,
    vueImgVerify
  },
  setup(){
    const verifyRef = ref(null)
    console.log('res', verifyRef)
    const state = reactive({
      username: '',
      password: '',
      imgCode: '',
      type: 'login',
      username1: '',
      password1: '',
      verify: '',
    })
    const toggle = (v) => {
      state.type = v;
      state.verify = ''
    }
    const onSubmit = async ( values ) => {
      // console.log('values', values, md5(values.password))
      // state.imgCode = verifyRef.value.imgCode || ''
      // console.log('verifyRef', verifyRef.value.imgCode)
      // state.imgCode = verifyRef.value.imgCode || ''
      if(state.type === 'login'){
        const res = await login({
            loginName: values.username,
            passwordMd5: md5(values.password)
          })
        console.log('data',res)
        if(res.data === null){
          Toast.fail('登录失败')
          return
        }else{
          setLocal('token', res.data)
          window.location.href = '/'
        }
      }else{
        await register({
          loginName: values.username1,
          password: values.password1
        })
        Toast.success('注冊成功')
        state.type = 'login'
      }
    }
    return{
      ...toRefs(state),
      onSubmit,
      toggle
    }
}
}
</script>

<style lang='less'>
    .login {
    .logo {
      width: 120px;
      height: 120px;
      display: block;
      margin: 80px auto 20px;
    }
    .link-register{
      margin: 20px 10px;
      color: #1989fa;
    }
  }
</style>
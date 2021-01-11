<template>
  <div class="user-box">
  <s-header :name="'我的'"/>
    <div class="user-info">
      <div class="info">
        <img src="//s.yezgea02.com/1604040746310/aaaddd.png"/>
        <div class="user-desc">
          <span>昵称：{{user.nickName}}</span>
          <span>登录名：{{user.loginName}}</span>
          <span class="name">个性签名：{{ user.introduceSign }}</span>
        </div>
      </div>
      <ul class="user-list">
      <li class="van-hairline--bottom" @click="goTo('/order')">
        <span>我的订单</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('/setting')">
        <span>账号管理</span>
        <van-icon name="arrow" />
      </li>
      <li class="van-hairline--bottom" @click="goTo('/address', { from: 'mine' })">
        <span>地址管理</span>
        <van-icon name="arrow" />
      </li>
      <li @click="goTo('/about')">
        <span>关于我们</span>
        <van-icon name="arrow" />
      </li>
    </ul>    
    </div>
  <nav-bar/>
  </div>
</template>

<script>
import sHeader from '../components/SimpleHeader';
import navBar from '../components/Navbar';
import { reactive, onMounted, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { getUserInfo } from '../api/user';
export default {
  components:{
    sHeader,
    navBar
  },
  setup(){
    const router = useRouter()
    const state = reactive({
      user: {}
    })
    onMounted( async () => {
      const res = await getUserInfo()
      if(res.resultCode === 200){
        state.user = res.data
      }
    })
    const goBack = () => {
      router.go(-1)
    }
    const goTo = (r , query) => {
      console.log(r, query)
      router.push({ path: r , query:query || '' })
    }
    return{
      ...toRefs(state),
      goBack,
      goTo
    }
  }
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';
.user-box {
    .user-header {
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
      .user-name {
        font-size: 14px;
      }
    }
    .user-info {
      width: 94%;
      margin: 10px;
      height: 115px;
      background: linear-gradient(90deg, @primary, #51c7c7);
      box-shadow: 0 2px 5px #269090;
      border-radius: 6px;
      margin-top: 50px;
      .info {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
        padding: 25px 20px;
        .boxSizing();
        img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-top: 4px;
        }
        .user-desc {
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          line-height: 20px;
          font-size: 14px;
          color: #fff;
          span {
            color: #fff;
            font-size: 14px;
            padding: 2px 0;
          }
        }
        .account-setting {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 13px;
          color: #fff;
          .van-icon-setting-o {
            font-size: 16px;
            vertical-align: -3px;
            margin-right: 4px;
          }
        }
      }
    }
    .user-list {
      padding: 0 20px;
      margin-top: 20px;
      li {
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        .van-icon-arrow {
          margin-top: 13px;
        }
      }
    }
  }
</style>
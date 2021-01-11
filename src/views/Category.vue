<template>
  <div calss="categray">
    <div class="header">
      <i class="nbicon nbfanhui" @click="$router.back()"></i>
      <div class="header-search">
        <i class="nbicon nbSearch"></i>
        <router-link
          tag="span"
          class="search-title"
          to="./product-list?from=category"
          >全场50元起步</router-link
        >
      </div>
    </div>
    <div class="kindbox">
      <div class="left">
        <van-sidebar v-model="activeKey" @change="onChange">
          <van-sidebar-item v-for="item of categoryData" :key="item.categoryId" :title="item.categoryName"  @click="selectMenu(item.categoryId)"/>
        </van-sidebar>
      </div>
      <div class="right">
        <van-grid :border="false">
          <van-grid-item
            icon="photo-o"
            v-for="(item, index) of brandlist"
            :key="index"
            :text="item"
            @click="tolist(item)"
          />
        </van-grid>
      </div>
    </div>
    <NavBar />
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { getCategotyDate } from "../api/category";
import NavBar from "../components/Navbar";
export default {
  components: {
    NavBar,
    
  },
  setup() {
    const state = reactive({
      categoryData: [],
      currentIndex: 1
    });
    const selectMenu = (index) => {
      state.currentIndex = index
    }
    onMounted(async () => {
      const res = await getCategotyDate();
      console.log("res", res);
      state.categoryData = res.data
    });
    return {
      ...toRefs(state),
      selectMenu,
    };
  },
};
</script>

<style lang="css" scoped>
.header {
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 50px;
  background: #efefef;
  display: flex;
  padding: 0 15px;
  box-sizing: border-box;
  color: #656771;
  line-height: 50px;
  font-size: 15px;
  z-index: 10000;
}
.header-search {
  width: 80%;
  height: 20px;
  line-height: 20px;
  margin: 10px 20px;
  padding: 5px 0;
  color: #232326;
  background: #f7f7f7;
  border-radius: 20px;
  
}
.nbSearch {
  padding: 0 10px 0 20px;
  font-size: 17px;
}
.search-title {
  font-size: 12px;
  color: #666;
  line-height: 21px;
}
.kindbox{
  display: flex;
  margin-top: 50px;
}
</style>
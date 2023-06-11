<template>
  <el-container style="height: 100%">
    <el-header style="background-color:#FFDD55">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#FFDD55"
        text-color="#fff"
        active-text-color="#FFDD55"
      >
        <div style="display: flex">
          <!-- replace:页面切换时会留下历史记录 -->
         
          <router-link :to="index" >
<el-menu-item>主界面</el-menu-item>
            </router-link>

          <router-link :to="food_contrast" >
            
              <el-menu-item>食物营养成分对比</el-menu-item>
         
            
          </router-link>
          <router-link :to="food_power" >
           
              <el-menu-item>食物营养成分查询</el-menu-item>
         
            
          </router-link>
        </div>
      </el-menu>
    </el-header>
    <el-container>
      <el-main style="background-color: #00BBFF">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      tabPosition: "left",
      activeIndex: "1",
      index: { path: "/search_food",meta: { keepAlive: true } },
      food_contrast: { path: "/food_contrast",meta: { keepAlive: true } },
      food_power: { path: "/food_power",meta: { keepAlive: true } }
    };
  }
};
</script>
<style lang="stylus" scoped>
.el-header, .el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 100px;
}

// 点击时去掉文字的下划线
.router-link-active {
  text-decoration: none;
}

// 去掉原有链接文字下划线
a {
  text-decoration: none;
}

.el-menu-demo {
  height: 40px;
  float: left;
}

.el-menu-item:hover {
  font-size: 26px;
  border-radius: 12px;
}

// 导航栏的间距
.el-menu-item {
  padding: 0 22px;
  font-size: 22px;
  height: 60px;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 150px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
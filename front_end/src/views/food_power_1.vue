<template v-for="(style,index) of style_list" :key="index">
  <div class="content">
    <div class="title_name">营养成分查询</div>
    <div class="c" v-for="style of style_list" :key="style.nurition_style_id">
      <div class="name">{{style.nurition_style_name}}</div>
      <div class="item">
        <div v-for="(nutrition,index) of nutritions" v-bind:key="index">
          <div class="value" v-if="style.nurition_style_id==nutrition.nutrition_style_id">
            <router-link :to="{path:'/food_power/nutrition_details',query: {food_nutrition: nutrition.nutrition_name}}"
              style="color: black;text-decoration-line: none;font-weight:150px">{{nutrition.nutrition_name}}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverUrl } from "../config.ts";

export default {
  name: "search_power",
  data() {
    return {
      nutritions: [],
      style_list: []
    };
  },
  mounted: function () {
    this.show_nutrition();
    this.show_style();
  },
  methods: {
    show_nutrition: function () {
      this.axios.get(serverUrl + "/api/food/nutrition_list").then(res => {
        console.log(res);
        this.nutritions = res.data.data[0];
      });
    },
    show_style: function () {
      this.axios.get(serverUrl + "/api/food/nutrition_style_list").then(res => {
        console.log(res);
        this.style_list = res.data.data[0];
      });
    },
    nutrition_details: function () {
      console.log();
    }
  }
};
</script>

<style scoped>
.content {
  background-color: #00BBFF;
}

.title_name {
  color: #ffffff;
  font-size: 40px;
}

.c {
  background-color: #ffffff;
  width: 1100px;
  margin-right: auto;
  margin-left: auto;
  line-height: 50px;
  margin-bottom: 30px;
  color: #FF3333;
}

.c .name {
  float: left;
  width: 150px;
  font-size: 20px;
  font-weight: 800;
}

.c .item {
  display: flex;
  border: 1px solid #abcdef;
  border-bottom: 0px;
  border-top: 0px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.c .item .value {
  width: 300px;
  margin-left: 10px;
  margin-top: 5px;
}
</style>
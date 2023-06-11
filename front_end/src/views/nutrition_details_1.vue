<template>
  <div>
    <div id="myChart" style="width: 1100px;height:500px;" class="haha"></div>
  </div>
</template>

<script>
import { serverUrl } from "../config.ts";
//引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
//引入柱状图
require("echarts/lib/chart/bar");
//引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  data() {
    return {};
  },
  mounted: function() {
    this.drawLine(this.$route.query.food_nutrition);
  },
  methods: {
    drawLine(query) {
      //初始化 ECharts 实例
      let myChart = echarts.init(document.getElementById("myChart"));
      this.axios
        .get(serverUrl + "/api/food/nutrition_details", {
          params: { food_nutrition: query }
        })
        .then(res => {
          let arr = res.data.data[0];
          var name = [];
          var nutrition = [];
          for (let item of arr) {
            name.push(item["food_name"]);
            nutrition.push(item["food_nutrition"]);
          }
          this.food_name = name;
          this.food_nutrition = nutrition;
          // 绘制图表
          myChart.setOption({
            title: { text: query + "含量 Top 10 的食物" },
            tooltip: {},
            xAxis: {
              data: this.food_name,
              axisLabel: {
                rotate: -25 //角度倾斜
              }
            },
            yAxis: {},
            series: [
              {
                name: "",
                type: "bar",
                data: this.food_nutrition,
                itemStyle: {
                  normal: {
                    label: {
                      show: true, //开启显示
                      position: "top", //在上方显示
                      textStyle: {
                        //数值样式
                        color: "black",
                        fontSize: 16
                      }
                    },
                    color: function(params) {
                      var colorList = [
                        "#c23531",
                        "#2f4554",
                        "#61a0a8",
                        "#d48265",
                        "#91c7ae",
                        "#749f83",
                        "#ca8622"
                      ];
                      var index;
                      if (params.dataIndex >= colorList.length) {
                        index = params.dataIndex - colorList.length;
                        return colorList[index];
                      }
                      return colorList[params.dataIndex];
                    }
                  }
                }
              }
            ]
          });
        });
    }
  }
};
</script>

<style scoped>
.haha {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  margin-top: 110px;
  line-height: 45px;
}
</style>
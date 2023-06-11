<template>
  <div class="content">
  
    <div class="s2-1" style="font-size: 35px;text-align: center;color: #ffffff;">营养成分列表</div>
    <div class="s2-2">
      <div class="style">
        <div
          class="style-title"
          style="background-color: #999999;color: #ffffff;font-size: 18px"
        >基本营养</div>
        <div>
          <div
            v-for="(basic_natrition_name,index) in basic_name"
            :key="basic_natrition_name"
            class="line"
          >
            <div class="left">{{basic_natrition_name}}</div>
            <div class="right">{{basic_value[index]}}毫克</div>
          </div>
        </div>

        <div class="style-title" style="background-color: #FF9901;color: #ffffff;font-size: 18px">脂类</div>
        <div>
          <div v-for="(lipid,index) in lipid_name" :key="lipid" class="line">
            <div class="left">{{lipid}}</div>
            <div class="right">{{lipid_value[index]}}毫克</div>
          </div>
        </div>

        <div
          class="style-title"
          style="background-color: #333333;color: #ffffff;font-size: 18px"
        >矿物质</div>
        <div>
          <div v-for="(mineral,index) in mineral_name" :key="mineral" class="line">
            <div class="left">{{mineral}}</div>
            <div class="right">{{mineral_value[index]}}毫克</div>
          </div>
        </div>

        <div
          class="style-title"
          style="background-color: #01CC01;color: #ffffff;font-size: 18px"
        >维生素</div>
        <div>
          <div v-for="(vitamin,index) in vitamin_name" :key="vitamin" class="line">
            <div class="left">{{vitamin}}</div>
            <div class="right">{{vitamin_value[index]}}毫克</div>
          </div>
        </div>

        <div
          class="style-title"
          style="background-color: #FF3366;color: #ffffff;font-size: 18px"
        >氨基酸</div>
        <div>
          <div v-for="(amino_acid,index) in amino_acid_name" :key="amino_acid" class="line">
            <div class="left">{{amino_acid}}</div>
            <div class="right">{{amino_acid_value[index]}}毫克</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverUrl } from "../config.ts";
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入饼图
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  data() {
    return {
      food_id: this.food_id,
      basic_name: [],
      basic_value: [],

      lipid_name: [],
      lipid_value: [],

      mineral_name: [],
      mineral_value: [],

      vitamin_name: [],
      vitamin_value: [],

      amino_acid_name: [],
      amino_acid_value: []
    };
  },
  /* 实例创建后立即被调用；传递参数 */
  created() {
    this.food_id = this.$route.query.food_id;
  },
  /* 异步执行：await 后的函数返回结果后再执行绘图代码 */
  async mounted() {
    await this.get_food_data(this.$route.query.food_id);
    await this.get_top_data(this.$route.query.food_id);
    await this.get_base_data(this.$route.query.food_id);
    await this.get_scale(this.$route.query.food_id);
    this.drawLine();
  },
  methods: {
    get_top_data(food_id) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(serverUrl + "/api/food/main_nutrition", {
            params: { food_id: food_id }
          })
          .then(res => {
            let arr = res.data.data[0];
            var top_name = [];
            var top_value = [];
            for (let i1 in arr[0]) {
              top_name.push(i1);
              top_value.push(arr[0][i1]);
            }
            this.top_name = top_name;
            this.top_value = top_value;
            // 绘制主要营养图表
            let topChart = echarts.init(document.getElementById("myChart0"));
            topChart.setOption({
              title: {
                text: "主要营养（毫克）"
              },
              tooltip: {},
              xAxis: {},
              yAxis: {
                data: this.top_name
              },
              series: [
                {
                  name: "主要营养",
                  type: "bar",
                  data: this.top_value,
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
                          "#99ff33",
                          "#2f4554",
                          "#61a0a8",
                          "#d48265",
                          "#91c7ae",
                          "#749f83",
                          "#ca8622"
                        ];
                        var index;
                        //若柱体数量大于定义的颜色数量，颜色循环
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

            resolve();
          })
          .catch(error => reject(error));
      });
    },
    get_base_data(food_id) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(serverUrl + "/api/food/food_detailed", {
            params: { food_id: food_id }
          })
          .then(res => {
            let arr = res.data.data[0];
            var basic_nutrition_name = [];
            var basic_nutrition_value = [];
            for (let item of arr) {
              for (let i1 in item["style_first"]) {
                basic_nutrition_name.push(i1);
                basic_nutrition_value.push(item["style_first"][i1]);
              }
            }
            this.basic_name1 = basic_nutrition_name;
            this.basic_value1 = basic_nutrition_value;
            //绘制基本营养图表
            let topChart = echarts.init(document.getElementById("myChart1"));
            topChart.setOption({
              title: {
                text: "基本营养（毫克）"
              },
              tooltip: {},
              xAxis: {
                data: this.basic_name1
              },
              yAxis: {},
              series: [
                {
                  name: "基本营养",
                  type: "bar",
                  data: this.basic_value1,
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
                          "#99ff33",
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

            resolve();
          })
          .catch(error => reject(error));
      });
    },
    get_food_data(food_id) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(serverUrl + "/api/food/food_detailed", {
            params: { food_id: food_id }
          })
          .then(res => {
            let arr = res.data.data[0];
            var basic_nutrition_name = [];
            var basic_nutrition_value = [];

            var lipid_name = [];
            var lipid_value = [];

            var mineral_name = [];
            var mineral_value = [];

            var vitamin_name = [];
            var vitamin_value = [];

            var amino_acid_name = [];
            var amino_acid_value = [];
            for (let item of arr) {
              for (let i1 in item["style_first"]) {
                basic_nutrition_name.push(i1);
                basic_nutrition_value.push(item["style_first"][i1]);
              }
              for (let i2 in item["style_second"]) {
                lipid_name.push(i2);
                lipid_value.push(item["style_second"][i2]);
              }
              for (let i3 in item["style_third"]) {
                mineral_name.push(i3);
                mineral_value.push(item["style_third"][i3]);
              }
              for (let i4 in item["style_fourth"]) {
                vitamin_name.push(i4);
                vitamin_value.push(item["style_fourth"][i4]);
              }
              for (let i5 in item["style_fifth"]) {
                amino_acid_name.push(i5);
                amino_acid_value.push(item["style_fifth"][i5]);
              }
            }
            this.basic_name = basic_nutrition_name;
            this.basic_value = basic_nutrition_value;

            this.lipid_name = lipid_name;
            this.lipid_value = lipid_value;

            this.mineral_name = mineral_name;
            this.mineral_value = mineral_value;

            this.vitamin_name = vitamin_name;
            this.vitamin_value = vitamin_value;

            this.amino_acid_name = amino_acid_name;
            this.amino_acid_value = amino_acid_value;

            resolve({ basic_nutrition_name, basic_nutrition_value });
          })
          .catch(error => reject(error));
      });
    },
    get_scale(food_id) {
      return new Promise((resolve, reject) => {
        this.axios
          .get(serverUrl + "/api/food/main_nutrition", {
            params: { food_id: food_id }
          })
          .then(res => {
            let arr = res.data.data[0];
            var scale_value_name = [];
            var style_scale = [];
            for (let i in arr[2]) {
              scale_value_name.push({
                name: i,
                value: arr[2][i]
              });
            }
            for (let i2 in arr[3]) {
              style_scale.push({
                name: i2,
                value: arr[3][i2]
              });
            }
            this.scale_value_name = scale_value_name;
            this.style_scale = style_scale;
            //绘制主要营养图表
            let pieChart1 = echarts.init(document.getElementById("myChart6"));
            let pieChart2 = echarts.init(document.getElementById("myChart7"));

            pieChart1.setOption({
              title: {
                text: "各种营养成分含量分布",
                left: "center"
              },
              tooltip: {
                trigger: "item",
                formatter: "各种营养成分含量分布 <br/>{b} : {c} ({d}%)"
              },
              series: [
                {
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: this.scale_value_name,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                  }
                }
              ]
            });

            pieChart2.setOption({
              title: {
                text: "各类营养成分含量分布",
                left: "center"
              },
              tooltip: {
                trigger: "item",
                formatter: "各类营养成分含量分布 <br/>{b} : {c} ({d}%)"
              },
              series: [
                {
                  type: "pie",
                  radius: "55%",
                  center: ["50%", "60%"],
                  data: this.style_scale,
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                  }
                }
              ]
            });

            resolve();
          })
          .catch(error => reject(error));
      });
    },
    drawLine() {
      // console.log(this.get_food_data())
      //初始化 ECharts 实例
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      let myChart3 = echarts.init(document.getElementById("myChart3"));
      let myChart4 = echarts.init(document.getElementById("myChart4"));
      let myChart5 = echarts.init(document.getElementById("myChart5"));

      myChart2.setOption({
        title: {
          text: "脂类（毫克）"
        },
        tooltip: {},
        xAxis: {
          data: this.lipid_name
        },
        yAxis: {},
        series: [
          {
            name: "脂类",
            type: "bar",
            data: this.lipid_value,
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

      myChart3.setOption({
        title: {
          text: "矿物质（毫克）"
        },
        tooltip: {},
        xAxis: {
          data: this.mineral_name
        },
        yAxis: {},
        series: [
          {
            name: "矿物质",
            type: "bar",
            data: this.mineral_value,
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

      myChart4.setOption({
        title: {
          text: "维生素（毫克）"
        },
        tooltip: {},
        xAxis: {
          data: this.vitamin_name,
          axisLabel: {
            rotate: -22 //角度倾斜
          }
        },
        yAxis: {},
        series: [
          {
            name: "维生素",
            type: "bar",
            data: this.vitamin_value,
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

      myChart5.setOption({
        title: {
          text: "氨基酸（毫克）"
        },
        tooltip: {},
        xAxis: {
          data: this.amino_acid_name
        },
        yAxis: {},
        series: [
          {
            name: "氨基酸",
            type: "bar",
            data: this.amino_acid_value,
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
    }
  }
};
</script>

<style scoped>
.content {
  background: #00DDAA;
  margin-top: 20px;
  line-height: 50px;
}

.s2-2 {
  display: flex;
  margin-top: 20px;
}

.s2-3 {
  display: inline-block;
  margin-top: 0px;
  margin-bottom: 220px;
  height: 10px;
  line-height: 30px;
  width: 1100px;
}

.s2-2 .style {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  margin-bottom: 20px;
  line-height: 45px;
}

.line {
  display: flex;
  width: 1100px;
}

.line .left,
.line .right {
  border: 1px solid #ccc;
  border-left: 0px;
  border-right: 0px;
  flex: 1;
  line-height: 45px;
  text-align: center;
}

</style>
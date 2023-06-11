<template>
  <div class="content">
    <div class="s2-1" style="font-size: 25px;text-align: center;color : #ffffff;">基本营养含量对比图</div>
    <div class="s2-2">
      <div class="style">
        <div id="myChart1" style="width:1100px;height:450px;"></div>
      </div>
    </div>

    <div class="s2-1" style="font-size: 25px;text-align: center;color: #ffffff;">脂类含量对比图</div>
    <div class="s2-2">
      <div class="style">
        <div id="myChart2" style="width: 1100px;height:450px;"></div>
      </div>
    </div>

    <div class="s2-1" style="font-size: 25px;text-align: center;color: #ffffff;">矿物质含量对比图</div>
    <div class="s2-2">
      <div class="style">
        <div id="myChart3" style="width: 1100px;height:450px;"></div>
      </div>
    </div>

    <div class="s2-1" style="font-size: 25px;text-align: center;color: #ffffff;">维生素含量对比图</div>
    <div class="s2-2">
      <div class="style">
        <div id="myChart4" style="width: 1100px;height:450px;"></div>
      </div>
    </div>

    <div class="s2-1" style="font-size: 25px;text-align: center;color: #ffffff;">氨基酸含量对比图</div>
    <div class="s2-2">
      <div class="style">
        <div id="myChart5" style="width: 1100px;height:450px;"></div>
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
// 引入折线图
require("echarts/lib/chart/line");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  data() {
    return {
      food_id: this.food_id
    };
  },

  created() {
    this.food_id = this.$route.query.food_id;
  },
  async mounted() {
    await this.get_food_data(this.$route.query.food_id);
    this.drawLine();
  },
  methods: {
    get_food_data(food_id) {
      /* resolve reject:将 Promise 中函数要传递的值，作为参数传给 then 和 catch 中的函数 */
      return new Promise((resolve, reject) => {
        this.axios
          .get(serverUrl + "/api/food/food_detailed", {
            params: { food_id: food_id }
          })
          .then(res => {
            let arr1 = res.data.data[0];
            var data1 = arr1[0];
            var data2 = arr1[1];
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

            // 对比的数据
            var basic_nutrition_value2 = [];

            var lipid_value2 = [];

            var mineral_value2 = [];

            var vitamin_value2 = [];

            var amino_acid_value2 = [];

            for (let i1 in data1["style_first"]) {
              basic_nutrition_name.push(i1);
              basic_nutrition_value.push(data1["style_first"][i1]);
            }

            for (let i2 in data1["style_second"]) {
              lipid_name.push(i2);
              lipid_value.push(data1["style_second"][i2]);
            }

            for (let i3 in data1["style_third"]) {
              mineral_name.push(i3);
              mineral_value.push(data1["style_third"][i3]);
            }

            for (let i4 in data1["style_fourth"]) {
              vitamin_name.push(i4);
              vitamin_value.push(data1["style_fourth"][i4]);
            }

            for (let i5 in data1["style_fifth"]) {
              amino_acid_name.push(i5);
              amino_acid_value.push(data1["style_fifth"][i5]);
            }

            // 对比的数据
            for (let i11 in data2["style_first"]) {
              basic_nutrition_value2.push(data2["style_first"][i11]);
            }

            for (let i22 in data2["style_second"]) {
              lipid_value2.push(data2["style_second"][i22]);
            }

            for (let i33 in data2["style_third"]) {
              mineral_value2.push(data2["style_third"][i33]);
            }

            for (let i44 in data2["style_fourth"]) {
              vitamin_value2.push(data2["style_fourth"][i44]);
            }

            for (let i55 in data2["style_fifth"]) {
              amino_acid_value2.push(data2["style_fifth"][i55]);
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

            // 对比的数据
            this.basic_value2 = basic_nutrition_value2;
            this.lipid_value2 = lipid_value2;
            this.mineral_value2 = mineral_value2;
            this.vitamin_value2 = vitamin_value2;
            this.amino_acid_value2 = amino_acid_value2;
            console.log(lipid_value);
            console.log(lipid_value2);

            resolve({});
          })
          .catch(error => reject(error));
      });
    },
    drawLine() {
      let myChart1 = echarts.init(document.getElementById("myChart1"));
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      let myChart3 = echarts.init(document.getElementById("myChart3"));
      let myChart4 = echarts.init(document.getElementById("myChart4"));
      let myChart5 = echarts.init(document.getElementById("myChart5"));
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "基本营养"
        },
        tooltip: {},
        xAxis: {
          data: this.basic_name,
          axisLabel: {}
        },
        yAxis: {},
        series: [
          {
            name: "基本营养",
            type: "line",
            data: this.basic_value,
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
                }
              }
            }
          },
          {
            type: "line",
            data: this.basic_value2,
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
                }
              }
            }
          }
        ]
      });

      myChart2.setOption({
        title: {
          text: "脂类"
        },
        tooltip: {},
        xAxis: {
          data: this.lipid_name
        },
        yAxis: {},
        series: [
          {
            type: "line",
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
                }
              }
            }
          },
          {
            type: "line",
            data: this.lipid_value2,
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
                }
              }
            }
          }
        ]
      });

      myChart3.setOption({
        title: {
          text: "矿物质"
        },
        tooltip: {},
        xAxis: {
          data: this.mineral_name
        },
        yAxis: {},
        series: [
          {
            type: "line",
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
                }
              }
            }
          },
          {
            type: "line",
            data: this.mineral_value2,
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
                }
              }
            }
          }
        ]
      });

      myChart4.setOption({
        title: {
          text: "维生素"
        },
        tooltip: {},
        xAxis: {
          data: this.vitamin_name,
          axisLabel: {
            rotate: -22
          }
        },
        yAxis: {},
        series: [
          {
            type: "line",
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
                }
              }
            }
          },
          {
            type: "line",
            data: this.vitamin_value2,
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
                }
              }
            }
          }
        ]
      });

      myChart5.setOption({
        title: {
          text: "氨基酸"
        },
        tooltip: {},
        xAxis: {
          data: this.amino_acid_name
        },
        yAxis: {},
        series: [
          {
            name: "氨基酸",
            type: "line",
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
                }
              }
            }
          },
          {
            name: "氨基酸",
            type: "line",
            data: this.amino_acid_value2,
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
  background: #00BBFF;
  margin-top: 20px;
}

.s2-2 {
  display: flex;
  margin-bottom: 0px;
}

.s2-1 {
  line-height: 80px;
}

.s2-2 .style {
  display: inline-block;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  margin-bottom: 10px;
}

.line {
  display: flex;
  width: 1100px;
}

.line .left,
.line .right {
  border: 1px solid #ccc;
  flex: 1;
}

</style>
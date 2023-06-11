<template>
  <div style="background-color: #00BBFF">
    <div style="font-size: 2.8rem;color: white;">食物营养成分查询</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-input
        v-model="form.food_name" @keyup.esc.native="clearInput" @keyup.enter.native="onSubmit" @blur="onSubmit" 
        placeholder="请输入您要查询的食物名称，如：荔枝，点击右侧按钮进行查询"
        style="width:780px;"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        circle
        style="margin-left: 18px;"
        @click="onSubmit"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        style="margin-left: 18px;"
        @click="clearInput" v-if="form.food_name"
      ></el-button>
    </el-form>
    <ul class="show_result">
      <div style="background-color: #00BBFF" class="aaa">搜索结果</div>
      <div style="line-height: 45px;list-style: none;" class="food-item">
        <div style="float: left;line-height: 45px">编号</div>
        <div>食物名称</div>
      </div>
      <div v-for="(item,index) of resdata" :key="index" style="list-style: none">
        <div style="margin-bottom: 0px;line-height: 45px" class="food-item">
          <div style="float: left;">{{item.id}}</div>
          <div>
            <a
              :href="transmit(item.id )"
              style="color: black;text-decoration-line: none"
            >{{ item.food_name }}</a>
          </div>
        </div>
      </div>
    </ul>
    <el-button type="danger" @click="clearResult" style="line-height: 30px;font-size:20px" v-if=" resdata.length !== 0  ">清空查询结果</el-button>
    <el-button type="danger" @click="clearAll" style="line-height: 30px;font-size:20px" v-if="form.food_name || resdata.length !== 0 ">清空全部</el-button>
  </div>
</template>

<script>
import { serverUrl } from "../config.ts";
/* 用 qs 传参发送 axios 请求 */
/* 将 url 中的参数转为对象，将对象转为 url 参数形式 */
import qs from "qs";

export default {
  data() {
    return {
      input: "",
      form: {
        food_name: ""
      },
      resdata: []
    };
  },
  methods: {
    clearInput(){
      let isConfirm = window.confirm('是否清空搜索框?')
      if(isConfirm){
        this.form.food_name = ''
      }
    },
    clearResult(){
      let isConfirm = window.confirm('是否清空查询结果?')
      if(isConfirm){
        this.resdata = []
      }
    },
    clearAll(){
      if(this.form.food_name){
        if(this.resdata.length !== 0){
          let isConfirm = window.confirm('是否清空搜索框以及查询结果?')
        if(isConfirm){
        this.form.food_name = ''
        this.resdata.length = 0
      }
        }
        else{
         this.clearInput()
        }
      }
      else{
        if(this.resdata.length !== 0){
          this.clearResult()
        }    
      }
    },
    
    onSubmit() {
      /* qs.stringify() 将对象序列化成 URL 的形式 */
      this.axios
        .post(serverUrl + "/api/food/food_list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code === 0) {
            alert(res.data.data[0]);
            this.form.food_name = ''
          }
          if (res.data.code === 1) {
            this.resdata = res.data.data[0];
          }
        })
        
      ;
    },

    transmit(id) {
      return "#/search_food/result?food_id=" + id;
    }
  }
};
</script>

<style scoped>
.show_result .aaa {
  color: white;
  line-height: 80px;
  font-size: 30px;
  height: 80px;
  margin-top: 80px;
}
.show_result .food-item {
  margin: 0 auto;
  padding: 0 15px;
  width: 1100px;
  display: flex;
  background-color: white;
  border-bottom: 2px solid #dee2e6;
  font-size: 18px;
}
.food-item{
  border-radius: .625rem;
}

.show_result .food-item div {
  width: 50%;
}
</style>
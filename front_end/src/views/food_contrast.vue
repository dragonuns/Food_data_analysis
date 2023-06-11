<template>
  <div style="background-color: #00BBFF">
    <div style="font-size: 2.5rem;color: white">食物营养成分对比</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-input 
      v-model="form.food_name" @keyup.esc.native="clearInput" @keyup.enter.native="onSubmit" @blur="onSubmit" 
       placeholder="请输入您要对比的食物，如：大米 小米，点击右侧按钮进行对比" 
       style="width:780px;" class=".el-input__inner"
       ></el-input>
      <el-button type="primary" icon="el-icon-search" circle style="margin-left: 18px;" @click="onSubmit" ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
        style="margin-left: 18px;"
        @click="clearInput" v-if="form.food_name"
      ></el-button>
    </el-form>
    <ul class="show_result">
      <div style="background-color: #00BBFF;color: white" class="ttt">食物搜索结果</div>
      <div style="line-height: 45px;list-style: none;" class="food-item">
        <div style="float: left;line-height: 45px">编号</div>
        <div>食物名称</div>
      </div>
      <div v-for="(item,index) of resdata" :key="index" style="list-style: none">
        <div style="margin-bottom: 5px;line-height: 45px" class="food-item">
          <div>{{ item.id }}</div>
          <div>{{ item.food_name }}</div>
          <el-button :label="item.id" @click="addContrast(item)" style="height:39px;margin-left:35px;margin-top:3px">
            加入对比</el-button>
        </div>
      </div>
    </ul>
    <el-button type="danger" @click="clearResult" style="line-height: 30px;font-size:20px" v-if="resdata.length !== 0">清空查询结果</el-button>

    <ul class="show_contrast">
      <div style="background-color: #00BBFF;color: white" class="kkk">等待对比的食物</div>
      <div style="line-height: 45px;list-style: none;" class="food-item">
        <div style="float: left;line-height: 45px">编号</div>
        <div>食物名称</div>
      </div>
      <div v-for="(item,index) of select" :key="index" style="list-style: none">
        <div style="margin-bottom: 5px;line-height: 45px" class="food-item">
          <div>{{ item.id }}</div>
          <div>{{ item.food_name }}</div>
          <el-checkbox :checked="item.checked" @change="check(item)"></el-checkbox>
        </div>
      </div>
      <el-button type="success" @click="onContrast" style="line-height: 30px;font-size:20px" v-if="select.length !== 0">开始对比</el-button>
      <el-button type="danger" @click="clearContrast" style="line-height: 30px;font-size:20px" v-if="select.length !== 0">清空对比</el-button>
      <el-button type="danger" @click="clearAll" style="line-height: 30px;font-size:20px" v-if="select.length !== 0 || resdata.length !== 0 || form.food_name">清空全部</el-button>
    </ul>
  </div>
</template>

<script>
import { serverUrl } from "../config.ts";
import qs from "qs";

export default {
  data() {
    return {
      input: "",
      form: {
        food_name: ""
      },
      resdata: [],
      select: []
    };
  },
  
  methods: {
    clearResult(){
      let isConfirm = window.confirm('是否确认清空查询结果?(tip:对比也会被清空!!!)')
      if(isConfirm){
        this.resdata = []
        this.select = []
      }
    },
    clearInput () {
      let isConfirm = window.confirm('是否清空搜索框?')
      if(isConfirm){
        this.form.food_name = ''

      }
    },
    clearAll(){
      if(this.form.food_name){
        if(this.resdata.length !== 0){
          if( this.select.length !== 0){
            let isConfirm = window.confirm('是否清空全部?')
            if(isConfirm){
              this.form.food_name = ''
              this.resdata.length = 0
              this.select.length = 0
      }
          }
          else {
            let isConfirm = window.confirm('是否清空搜索框以及查询结果?')
            if(isConfirm){
              this.form.food_name = ''
              this.resdata.length = 0
      }
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
    }},
    check(item) {
      item.checked = !item.checked;
    },
    onSubmit() {
      this.axios
        .post(serverUrl + "/api/food/food_list", qs.stringify(this.form))
        .then(res => {
          if (res.data.code === 0) {
            alert(res.data.data[0]);
          }
          if (res.data.code === 1) {
            this.resdata = res.data.data[0];
          }
        });
    },
    clearContrast() {
      if(  this.select  == [] ){
      return
      } 
      else{
        if(window.confirm('是否确认清空对比?')){
        this.select = [];
      }       
    }},
    addContrast(item) {
      if (this.select.length >= 2) {
        alert("每次对比只能选择两种食物！");
        return;
      }
      this.select.push(item);
      this.select.forEach(v => {
        v.checked = true;
      });
     
    },
    onContrast() {
      var select_id = "";
      this.select.forEach(v => {
        if (v.checked) {
          if (select_id.length > 0) {
            select_id += ",";
          }
          select_id += v.id;
        }
      });
      console.log(select_id);
      this.$router.push({ path: "/food_contrast/result?food_id=" + select_id });
    }
  }
};
</script>

<style scoped>
.show_result .ttt {
  color: white;
  line-height: 80px;
  font-size: 30px;
  height: 80px;
  margin-top: 80px;
}

.show_contrast .kkk {
  color: white;
  line-height: 80px;
  font-size: 30px;
  height: 80px;
  margin-top: 20px;
}

.show_result .food-item {
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  border-bottom: 1px solid #ffffff;
  margin: 0 auto;
  padding: 0 10px;
  width: 1100px;
  font-size: 18px;
  border-radius: .625rem
 
}

.show_result .food-item div {
  width: 40%;
}

.show_contrast .food-item {
  margin: 0 auto;
  padding: 0 10px;
  width: 1100px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  border-bottom: 1px solid #ffffff;
  font-size: 18px;
  border-radius: .625rem
}

.show_contrast .food-item div {
  width: 40%;
}
.el-input__inner{
  border-radius: 10px !important;
}
</style>
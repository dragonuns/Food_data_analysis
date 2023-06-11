# import itertools
# from itertools import chain

import re

# 存储操作方法的容器，将功能模块化
from flask import Blueprint
import pandas as pd
import control
from model import db, engine

# 创建蓝图
food_info = Blueprint("foodInfo", __name__)


"""
function：查询食物信息列表, methods=["post"]
interface=/api/food/food_list
name=food_name info=食物名称 type=string

"""


@food_info.route("/api/food/food_list", methods=["post"])
def get_food_list():
    food_list = []
    food_name = control.post_str('food_name')
    print(food_name)
    # 开启数据库中的游标功能，得到一个游标对象
    cursor = db.cursor()
    if ' ' or ',' or '，' in food_name:
        name1 = re.split(r'[,，\s^]', food_name)[0]
        name2 = re.split(r'[,，\s^]', food_name)[-1]
        cursor.execute(
            "SELECT * FROM `foodinfo` WHERE `食物名称` LIKE '%{}%' OR `食物名称` LIKE '%{}%'".format(name1, name2))
    else:
        cursor.execute(
            "SELECT id,食物名称 from foodinfo WHERE `食物名称` LIKE '%{}%'".format(food_name))
    # 查询返回的全部结果
    result = cursor.fetchall()
    if len(result) == 0:
        return control.fail("您的输入有误或搜索的食物未录入，请重新输入！")
    else:
        for i in result:
            dictionary = {
                'id': i[0],
                'food_name': i[1]
            }
            food_list.append(dictionary)
        return control.success(food_list)


"""
function：营养详细信息, methods=["get"]
interface=/api/food/nutrition_details
name=food_nutrition info=食物营养名称 type=string
"""


@food_info.route("/api/food/nutrition_details", methods=["get"])
def get_nutrition_details():
    food_nutrition = control.get_str('food_nutrition')
    print(food_nutrition)
    cursor = db.cursor()
    cursor.execute(
        f"SELECT 食物名称,{food_nutrition} from foodinfo WHERE '{food_nutrition}' = '{food_nutrition}' ORDER BY {food_nutrition} DESC limit 10")
    result = cursor.fetchall()
    print(result)
    food_list = []
    for i in result:
        dictionary = {
            'food_name': i[0],
            'food_nutrition': i[1]
        }
        food_list.append(dictionary)
    return control.success(food_list)


"""
function：获取营养名称, methods=["get"]
interface=/api/food/nutrition_list
"""


@food_info.route("/api/food/nutrition_list", methods=["get"])
def get_food_info():
    cursor = db.cursor()
    cursor.execute(
        "SELECT * FROM  nutritions_name order by nurition_style_id asc ")
    result = cursor.fetchall()
    columns_list = []
    for i in result:
        dict = {
            "id": i[0],
            "nutrition_name": i[1],
            "nutrition_style_id": i[2]
        }
        columns_list.append(dict)
    return control.success(columns_list)


"""
function：获取营养类别, methods=["get"]
interface=/api/food/nutrition_style_list
"""


@food_info.route("/api/food/nutrition_style_list", methods=["get"])
def get_style_list():
    cursor = db.cursor()
    cursor.execute(
        "SELECT * FROM  style order by nurition_style_id asc")
    result = cursor.fetchall()
    columns_list = []
    for i in result:
        dict = {
            "nurition_style_id": i[0],
            "nurition_style_name": i[1],
        }
        columns_list.append(dict)
    return control.success(columns_list)


"""
function：获取食物详细信息, methods=["get"]
interface=/api/food/food_detailed
name=food_id info=食物id type=int
"""


@food_info.route("/api/food/food_detailed", methods=["get"])
def get_food_detailed():
    food_id = control.get_str("food_id")
    cursor = db.cursor()

    if ',' in food_id:
        id1 = re.split(r'[,^]', food_id)[0]
        id2 = re.split(r'[,^]', food_id)[-1]
        print(id1)
        print(id2)
        cursor.execute(
            "SELECT * FROM foodinfo WHERE id ='{}' or id='{}'".format(id1,id2))
    else:
        cursor.execute(
            f"SELECT * FROM foodinfo WHERE id = {food_id}")
    result = cursor.fetchall()
    food_list = []
    for i in result:
        dictionary = {
            'name': i[1],
            'style_first': {
                '能量': i[2],
                '蛋白质': i[3],
                '脂肪': i[4],
                '碳水化合物': i[5],
                '粗纤维': i[6]
            },
            'style_second': {
                '单不饱和脂肪酸': i[7],
                '多不饱和脂肪酸': i[8],
                '胡萝卜素': i[9],
                '叶黄素类': i[10],
            },
            'style_third': {
                '钙': i[11],
                '镁': i[12],
                '钠': i[13],
                '钾': i[14],
                '磷': i[15],
                '硫': i[16],
                '氯': i[17],
                '铁': i[18],
                '锌': i[19],
                '硒': i[20],
                '铜': i[21],
                '锰': i[22]
            },
            "style_fourth": {
                '维生素A': i[23],
                '维生素C': i[24],
                '维生素E': i[25],
                '维生素B1': i[26],
                '维生素B2': i[27],
                '维生素B3': i[28],
                '维生素B4': i[29],
                '维生素B5': i[30],
                '维生素B6': i[31],
                '维生素B9': i[32],
                '维生素B12': i[33],
                '维生素B14': i[34]
            },
            "style_fifth": {
                '亮氨酸': i[35],
                '蛋氨酸': i[36],
                '苏氨酸': i[37],
                '赖氨酸': i[38],
                '色氨酸': i[39],
                '缬氨酸': i[40],
                '组氨酸': i[41],
                '异亮氨酸': i[41]
            },
            "nutrition_percent": {

            }
        }
        food_list.append(dictionary)
    return control.success(food_list)


"""
function：营养百分比, methods=["get"]
interface=/api/food/main_nutrition
name=food_id info=食物id type=int
"""


@food_info.route("/api/food/main_nutrition", methods=["get"])
def get_main_nutrition():
    food_id = control.get_int("food_id")
    sql = "select * from foodinfo WHERE id ={};".format(food_id)
    cursor = db.cursor()
    cursor.execute(sql)
    name = ['蛋白质', '脂肪', '碳水化合物', '粗纤维', '单不饱和脂肪酸', '多不饱和脂肪酸', '胡萝卜素', '叶黄素类', '钙', '镁', '钠', '钾', '磷','硫', '氯', '铁', '锌', '硒', '铜', '锰', '维生素A', '维生素C', '维生素E', '维生素B1','维生素B2', '维生素B3', '维生素B4','维生素B5', '维生素B6', '维生素B9', '维生素B12', '维生素B14', '亮氨酸', '蛋氨酸', '苏氨酸', '赖氨酸', '色氨酸', '缬氨酸', '组氨酸', '异亮氨酸']
    result = cursor.fetchall()
    result1 = list(list(result)[0])
    result2 = result1[3:]
    result3 = result2.copy()
    result2.sort(reverse=True)
    percent = []
    # 百分比
    for j in result2[:10]:
        percent.append(j / sum(result2))
    percent.append(1 - sum(percent))

    li = []
    for i in result2[:10]:
        li.append(name[result3.index(i)])
    dictionary1 = dict(zip(li[:3], result2[:3]))
    dictionary2 = dict(zip(li, result2))
    li.append('其他')
    dictionary3 = dict(zip(li, percent))

    food = pd.read_sql(sql, engine)
    base_nutrition = food[['能量（千卡）', '蛋白质（毫克）', '脂肪（毫克）', '碳水化合物（毫克）', '粗纤维（毫克）']]
    lipid = food[['单不饱和脂肪酸（毫克）', '多不饱和脂肪酸（毫克）', '胡萝卜素（毫克）', '叶黄素类（毫克）']]
    mineral = food[['钙（毫克）', '镁（毫克）', '钠（毫克）', '钾（毫克）', '磷（毫克）',
                    '硫（毫克）', '氯（毫克）', '铁（毫克）', '锌（毫克）', '硒（毫克）', '铜（毫克）', '锰（毫克）']]
    amino_acid = food[['亮氨酸（毫克）', '蛋氨酸（毫克）', '苏氨酸（毫克）', '赖氨酸（毫克）', '色氨酸（毫克）', '缬氨酸（毫克）', '组氨酸（毫克）', '异亮氨酸（毫克）']]

    vitamin = food[['维生素A（毫克）', '维生素C（毫克）', '维生素E（毫克）', '维生素B1（硫胺素）（毫克）',
                    '维生素B2（核黄素）（毫克）', '维生素B3（烟酸）（毫克）', '维生素B4（胆碱）（毫克）',
                    '维生素B5（泛酸）（毫克）', '维生素B6（毫克）', '维生素B9（叶酸）（毫克）', '维生素B12（毫克）', '维生素B14（甜菜碱）（毫克）']]

    # 总数
    base_nutrition_total = base_nutrition.values.sum()
    lipid_total = lipid.values.sum()
    mineral_total = mineral.values.sum()
    vitamin_total = vitamin.values.sum()
    amino_acid_total = amino_acid.values.sum()
    total = base_nutrition_total + lipid_total + mineral_total + vitamin_total + amino_acid_total

    # 比例
    base_nutrition_scale = base_nutrition_total / total
    lipid_scale = lipid_total / total
    mineral_scale = mineral_total / total
    vitamin_scale = vitamin_total / total
    amino_acid__scale = amino_acid_total / total

    scale_dict = {
        "基本营养": base_nutrition_scale,
        "脂类": lipid_scale,
        "矿物质": mineral_scale,
        "维生素": vitamin_scale,
        "氨基酸": amino_acid__scale

    }

    data = [
        dictionary1,
        dictionary2,
        dictionary3,
        scale_dict
    ]

    return control.success(data)

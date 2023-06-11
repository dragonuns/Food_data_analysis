# -*- coding: utf-8 -*-

# Define your item pipelines here
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html
# 管道文件，处理爬到的 Item 信息
import json


# 将数据写入 json 文件
class FoodwakePipeline(object):
    def __init__(self):
        # 打开文件
        self.file = open('foodinfo.json', 'w', encoding='utf-8')

    # 处理数据
    def process_item(self, item, spider):
        # 读取 item 中的数据
        line = json.dumps(dict(item), ensure_ascii=False) + "\n"
        # 写入文件
        self.file.write(line)
        # 返回 item
        return item

    def open_spider(self, spider):
        pass

    def close_spider(self, spider):
        pass

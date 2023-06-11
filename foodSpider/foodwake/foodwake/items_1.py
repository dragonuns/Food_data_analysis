# -*- coding: utf-8 -*-

# Define here the models for your scraped items
# See documentation in:看文档
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class FoodwakespiderItem(scrapy.Item):
    # 食物名称
    name = scrapy.Field()
    # 食物营养成分
    info = scrapy.Field()
    # 食物链接
    # url = scrapy.Field()
    # 食物别名
    # nickname = scrapy.Field()

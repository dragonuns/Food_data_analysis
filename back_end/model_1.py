from flask import Flask
import pymysql

# SQLAlchemy：Python 下的一款 ORM 框架，建立在数据库 API 之上，使用关系对象映射进行数据库操作
# 把关系数据库的表结构映射到对象上，将对象转换成 SQL，然后使用数据 API 执行 SQL 并获取执行结果

from sqlalchemy import create_engine
import config

# 创建一个 flask 实例
manager = Flask(__name__)

# 数据库连接
db = pymysql.connect(host="localhost", user=config.username,password=config.password, db=config.db_name)
engine = create_engine('mysql+pymysql://root:123456@127.0.0.1:3306/38_food')

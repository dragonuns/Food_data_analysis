# 处理跨域请求
from flask_cors import CORS
from api import food
from model import manager
# 允许用户跨源发出 Cookie 或经过身份验证的请求
CORS(manager, supports_credentials=True)
manager.register_blueprint(food.food_info)

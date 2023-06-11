from flask import *


def success(*data):
    code = 1
    msg = "ok"
    data = data
    return jsonify({'code': code, 'msg': msg, 'data': data})


def fail(*data):
    code = 0
    msg = "fail"
    data = data
    return jsonify({'code': code, 'msg': msg, 'data': data})


# POST获取数据
def post_int(para: str) -> int:
    get_para = request.form.get(para, type=int)
    return get_para


def post_str(para: str) -> str:
    get_para = request.form.get(para, type=str)
    return get_para


# GET获取数据
def get_int(para: str) -> int:
    get_para = request.args.get(para, type=int)
    return get_para


def get_str(para: str) -> str:
    get_para = request.args.get(para, type=str)
    return get_para

from manager import manager
from flask_script import Manager, Shell

# 注册一个 manager 实例，将 flask 实例对象传入（命令行可传入参数）
flaskScript = Manager(manager)


def make_shell_context():
    return dict(app=manager)


flaskScript.add_command("shell", Shell(make_context=make_shell_context))


@flaskScript.command
def deploy():
    pass


if __name__ == '__main__':
    flaskScript.run()
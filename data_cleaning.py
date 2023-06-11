# 1.删除空格、多余的字符

file = open('foodinfo.csv', 'r').readlines()
fileout = open('foodinfo_new.csv', 'w')
for line in file:
        fileout.write(line.replace(' ', ''))

fileout.close()


# 2.重命名属性（列）

import pandas as pd

csv_file = 'foodinfo.csv'
csv_data = pd.read_csv(csv_file, encoding='gbk')
csv_data = pd.DataFrame(csv_data)
csv_data.rename(columns={'name':'食物名称'}, inplace=True)
csv_data.to_csv('foodinfo_new.csv')


# 3.删除属性（列）

import pandas as pd

csv_file = 'foodinfo.csv'
csv_data = pd.read_csv(csv_file, encoding='gbk')
csv_data = pd.DataFrame(csv_data)
csv_data.drop(['Hello'], axis=1, inplace=True)
csv_data.to_csv('foodinfo_new.csv')


# 4.删除行

import pandas as pd

csv_file = 'foodinfo.csv'
csv_data = pd.read_csv(csv_file, encoding='gbk')
csv_new = csv_data.drop([322, 892, 895])
csv_new.to_csv('foodinfo_new.csv')


# 5.去除重复项

import pandas as pd

csv_file = 'foodinfo.csv'
csv_data = pd.read_csv(csv_file, encoding='gbk')
csv_data = pd.DataFrame(csv_data)
is_Duplicate_item = csv_data.duplicated()

if is_Duplicate_item is True:
    print(is_Duplicate_item)
else:
    print("···没有重复项···")


# 6.缺失值处理

import pandas as pd

df = pd.read_csv('foodinfo.csv', encoding='gbk')
df_new = df.fillna(0)
df_new.to_csv('foodinfo_new.csv')

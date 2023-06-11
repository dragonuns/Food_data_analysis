import json
import os

if __name__ == '__main__':
    with open("foodinfo.json", "r", encoding="utf-8") as f:
        text = f.readlines()
        nowindex = 2
        keysindex = {'name': 1}
        outvalue = {}
        if os.path.exists("tmp.csv"):
            os.remove("tmp.csv")
        if os.path.exists("foodinfo.csv"):
            os.remove("foodinfo.csv")
        for each in text:
            jsontext = json.loads(each)
            jsontext_info = eval(jsontext['info'])
            outvalue.clear()
            outvalue[1] = jsontext['name']
            for key_valuestr in jsontext_info:
                key_value = dict(key_valuestr)
                for key, value in key_value.items():
                    if key not in keysindex:
                        keysindex[key] = nowindex
                        nowindex += 1
                    tmpflag = False
                    for char in value:
                        if char >= '0' and char <= '9':
                            tmpflag = True
                            break
                    if tmpflag == True:
                        outvalue[keysindex[key]] = value
            with open("tmp.csv", "a+", encoding="utf-8") as f:
                flag = False
                for i in range(1, len(keysindex)):
                    if i in outvalue:
                        if flag == True:
                            f.write(", ")
                        f.write(outvalue[i])
                    else:
                        if flag == True:
                            f.write(", ")
                        f.write(" ")
                    flag = True
                f.write('\n')
            nowindex += 1
        with open("foodinfo.csv", "a+", encoding="utf-8") as f:
            flag = False
            for i in keysindex.keys():
                if flag == True:
                    f.write(", ")
                f.write(i)
                flag = True
            f.write('\n')
        with open("foodinfo.csv", "a+", encoding="utf-8") as f1:
            with open("tmp.csv", "r", encoding="utf-8") as f2:
                tmp = f2.readlines()
                for i in tmp:
                    f1.write(i)
        os.remove("tmp.csv")

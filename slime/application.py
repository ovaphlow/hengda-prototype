#!/usr/bin/env python

DATA_00 = 'PLCR:@01WD0010804A2FCB2FCB2FCB0102C9C88120427E26*'


def dispatcher(data):
    print('dispatcher')
    t = {}
    if data[0:5] != 'PLCR:' and data[0:5] != 'PLCS:':
        print('协议错误')
        return
    t['protocol'] = data[0:5]
    if data[5:8] != '@01':
        print('起始符错误')
        return
    t['header'] = data[5:8]
    t['op'] = data[8:10]
    t['action'] = data[10:14]
    print(t)


if __name__ == '__main__':
    print('程序启动')
    dispatcher(DATA_00)

// ==UserScript==
// @name         同传助手
// @namespace    http://tampermonkey.net/
// @version      7.1.1
// @description  同传助手
// @author       烟锁池塘柳
// @license      MIT License
// @include      /https?:\/\/live\.bilibili\.com\/\d+\??.*/
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @require      https://cdn.bootcss.com/layer/2.4/layer.js
/*
// @require      https://greasyfork.org/scripts/406141-bilibiliapi-1-4-6/code/BilibiliAPI_146.js
// @require      https://greasyfork.org/scripts/406185-ocrad2-3-2/code/OCRAD232.js
// ==/UserScript==
/*
[github源]
// @require      https://raw.githubusercontent.com/sakamaki-izayoi-LYN/API/master/BilibiliAPI.js
// @require      https://raw.githubusercontent.com/sakamaki-izayoi-LYN/API/master/OCRAD.min.js
[腾讯云源]
// @require      https://js-1258131272.file.myqcloud.com/BilibiliAPI.js
// @require      https://js-1258131272.file.myqcloud.com/OCRAD.min.js
[jsDelivr源]
// @require      https://cdn.jsdelivr.net/gh/sakamaki-izayoi-LYN/API/BilibiliAPI.js
// @require      https://cdn.jsdelivr.net/gh/sakamaki-izayoi-LYN/API/OCRAD.min.js
[GitCDN源]
// @require      https://gitcdn.link/repo/sakamaki-izayoi-LYN/API/master/BilibiliAPI.js
// @require      https://gitcdn.link/repo/sakamaki-izayoi-LYN/API/master/OCRAD.min.js
*/


// var userInfo={
//     userId: '',
//     token:'',
// }


$(document).ready(function () {
    /*
    1 初始化用户信息
    2 初始化页面
    3 绑定事件
    * */

    // myApi.methods.init()
    const data = {
        color: 16777215,
        //为最大输入字数
        fontsize: 25,
        mode: 1,
        msg: '(=・ω・=)',
        //应该是时间戳
        rnd: myApi.methods.datetime(new Date()),
        roomid: 4345131,
        bubble: 0,
        csrf_token: 'a499d8f497180d0cb02d5adc9fc2364f',
        csrf: 'a499d8f497180d0cb02d5adc9fc2364f'
    }
    const url = 'https://api.live.bilibili.com/msg/send'
    const method = 'POST'
    myApi.xhr.ajax({url, method, data})
    console.log(data)
    setTimeout(()=>{
        //绑定回车回调
        myApi.methods.inputEnter()
    },500)

})

let myApi = {
    //保存用户信息token等
    data: {
        //用户输入的内容
        text:'',
        csrf_token: 'a499d8f497180d0cb02d5adc9fc2364f',
        csrf: 'a499d8f497180d0cb02d5adc9fc2364f'
    },
    //一些功能函数放这里
    methods: {
        //给输入框绑定回车事件
        inputEnter(){
            let textarea=$(".chat-input.border-box")
            console.log(textarea)
            if (textarea.length==0){
                var time=setInterval(()=>{
                    textarea=$(".chat-input.border-box")
                    if (textarea.length==1){

                        textarea.on("input",function(event){
                            myApi.data.text=$(this).val()
                            console.log($(this).val())
                        })
                        $(textarea[0]).keydown(function (event) {
                            console.log("按键")
                            if (event.keyCode=='13'){
                                console.log("回车")
                                $(textarea[0]).val("更改")
                                console.log(myApi.data.text)
                            }

                        })
                        const btn=$(".bl-button.live-skin-highlight-button-bg.bl-button--primary.bl-button--small")
                        btn.click(function () {
                            console.log("---")
                            console.log(myApi.data.text)
                        })
                        clearInterval(time)
                        // console.log("拿到，清除定时")
                    }
                },500)
                // console.log("没拿到开启循环")
            }else {
                textarea.keydown(function(event){
                    console.log(event)
                    if (event.keycode===13){
                        console.log("发送消息")
                    }
                })
                console.log("绑定")

            }



            console.log("调用绑定函数")
        },
        //回车的回调
        keydownEnter(event,handel){
            console.log(event)
            console.log("绑定成功")
        },
        //初始化,将脚本的基本配置存在localstroge里
        init() {
            const token = myApi.data.csrf_token

            const tk = myApi.methods.getLocalStroge('bili_jct')
            //有则保存在data
            if (tk) {
                myApi.data.csrf = tk
                myApi.data.csrf_token = tk
            } else {
                console.log("请登录")
            }


        },
        //判断localstroe里是否有某个数据
        //有则返回值，无则返回false
        getLocalStroge(str) {
            const result = localStorage.getItem(str)
            if (result) {
                return result
            } else
                return false
        },
        //获取当前时间戳，去掉后3位
        datetime(date) {
            let result = new Date(date).getTime();
            return parseInt(result / 1000);
        },
    },
    //请求相关
    xhr: {
        //    发送请求需传3个参数url，type，data
        ajax({url, method, data}) {
            $.ajax({
                url,
                method,
                data,
                /* {
                 coin_type: 'metal',
                 master_uid: uid,
                 platform: 'android',
                 csrf_token: Info.token,
                 csrf: Info.token
             }*/

                success: function (result) {
                    // p.resolve(result);
                    console.log(result)
                },
                error: function () {
                    // p.reject();
                    console.log("脚本失败")
                },
                crossDomain: true,
                dataType: 'json',
                xhrFields: {
                    withCredentials: true,
                },
            });
        }
    }


}


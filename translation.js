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


$(function () {
    const data={
        color:16777215,
        fontsize:25,
        mode:1,
        msg:'(=・ω・=)',
        //应该是时间戳
        rnd:myApi.methods.datetime(new Date()),
        roomid:4345131,
        bubble:0,
        csrf_token: 'a499d8f497180d0cb02d5adc9fc2364f',
        csrf: 'a499d8f497180d0cb02d5adc9fc2364f'
    }
    const url='https://api.live.bilibili.com/msg/send'
    const method='POST'
    myApi.xhr.ajax(url,method,data)
    console.log(data)
})

let myApi={
    data:{

    },
    methods:{
        //获取当前时间戳
        datetime (date) {
            let result = new Date(date).getTime();
            return parseInt(result/1000);
        },
    },
    xhr:{
    //    发送请求需传3个参数url，type，data
        ajax(url,method,data){
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


import axios from './axios';



export function weChatConfig() {
    const url = window.location.href;
    axios.post('/wechat/account/getJsapiConfig', {url: url}).then((data) => {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.data.data.appId, // 必填，公众号的唯一标识
            timestamp: data.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.data.data.nonceStr, // 必填，生成签名的随机串
            signature: data.data.data.signature,// 必填，签名，见[附录1](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E6.AD.A5.E9.AA.A4.E4.BA.8C.EF.BC.9A.E5.BC.95.E5.85.A5JS.E6.96.87.E4.BB.B6)
            jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见[附录2](http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E6.AD.A5.E9.AA.A4.E4.BA.8C.EF.BC.9A.E5.BC.95.E5.85.A5JS.E6.96.87.E4.BB.B6)
        });

    }).catch((error) => {
        console.log('获取config失败：', error)
    })
}
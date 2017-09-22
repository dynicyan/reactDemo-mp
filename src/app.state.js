import Util from './helpers/util';
import local from './helpers/locallStorage';
import axios from './config/axios';
import { weChatConfig } from './config/wechatService';


class AppState {
    constructor() {
        this.userId = '';
        this.phoneNum = ''
    }
    webpSupport = false
    appVersion = '1.0.0'
    async initConfig() {
        this.webpSupport = await Util.checkWebp()
    }

    //设置openid
    getOpenId() {
        // if(local.getItem('openid') == null) {
        //     return;
        // }else {
        // 判断url中有没有openId
        if(Util.getQueryString('openid') != null){
            const openid = Util.getQueryString('openid')
            // 兼容新老设备 新版 openid   老版 openId
            local.setItem('openid', openid)
            local.setItem('openId', openid)

            //}
        }

    }

    // getUserInfo() {
    //     var serf = this;
    //     axios.post('/wechat/account/memberInfoByOpenid', {openid: local.getItem('openid')}).then(function (data) {
    //         //存储用户信息
    //         const userData = data.data.data
    //         // self.userId = userData.vipUsersId;
    //         // self.phoneNum = userData.phoneNumber;

    //         serf.setLocalUser(userData);

    //         // if(Object.prototype.toString.call(cb)=== '[object Function]'){
    //         //     cb(data);
    //         // }

    //         //微信config
    //         weChatConfig();
    //     }).catch((error)=>{
    //         console.log('获取用户信息：'+error)
    //     })
    // }

    // 存储用户基本信息
    setLocalUser(data) {
        local.setItem('loginName', data.phoneNumber);//用户手机号
        local.setItem('userType', data.userType);// 用户类型  0 成员   1  普通会员；
        local.setItem('userId', data.vipUsersId);// 用户id
        local.setItem('strNickName', data.vipUsersName);// 用户名
        local.setItem('headPortrait', data.headPortrait);//用户头像
    }


}

export default new AppState()
import {browserHistory} from 'react-router';
import localStorage from './locallStorage';

class Util {
    constructor() {
        Date.prototype.Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份   
                "d+": this.getDate(), //日   
                "h+": this.getHours(), //小时   
                "m+": this.getMinutes(), //分   
                "s+": this.getSeconds(), //秒   
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
                "S": this.getMilliseconds() //毫秒   
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }
    }
   getThreeMonth(){
    	  var now = new Date();
    	  var nowMonth = now.getMonth()+1; // 当前月
    	  var nowYear = now.getFullYear(); // 当前年
    	  var _d=new Array;
		  for(var i=0;i<3;i++){
			  _d[i]=new Object();
			  if(nowMonth-i<=0){
				  _d[i].year=nowYear-1;
				  if(i==1){
					  _d[i].show=(nowYear-1)+"-"+(12); 
					  _d[i].month=12;
				  }else if(i==2){
					  _d[i].show=(nowYear-1)+"-"+(11);
					  _d[i].month=11;
				  }
			  }else{
				  _d[i].show=nowYear+"-"+((nowMonth-i)<10?"0"+(nowMonth-i):(nowMonth-i));
				  _d[i].year=nowYear;
				  _d[i].month=nowMonth-i;
			  }
			  
			  //第一天 以及最后一天
			  _d[i].firstDay="01 00:00:00";
			  var dd=new Date(_d[i].year,_d[i].month,0);
			  _d[i].lastDay=dd.getDate()+" 23:59:59";
			  
		  }
		   var firstday = _d[2].show+"-"+_d[0].firstDay;
		   var lastDay = _d[0].show+"-"+_d[2].lastDay;
		  _d.splice(0, 0,{show:"全部",type:"all",firstday:firstday,lastday:lastDay}); 
		  console.log(_d);
		  return _d;
      }
    checkWebp() {
        return new Promise(function (resolve, reject) {
            if (localStorage.getItem('webpSupport') == true) {
                resolve(true)
            } else if (localStorage.getItem('webpSupport') == false) {
                resolve(false)
            } else {
                try {
                    let bool = (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
                    localStorage.setItem('webpSupport', bool)
                    resolve(bool)
                } catch (err) {
                    try{
                        localStorage.setItem('webpSupport', false)
                    } catch(err){

                    }

                    resolve(false)
                }
            }
        })
    }

    CalculatGUID() {
        let guid = ""
        for (let i = 1; i <= 32; i++) {
            let n = Math.floor(Math.random() * 16.0).toString(16)
            guid += n
            if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) {
                guid += "-"
            }
        }
        return guid
    }

    getQueryStringByName(name) {
        let result = location.hash.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"))
        if (result == null || result.length < 1) {
            return ""
        }
        return result[1]
    }

    setLocalStorageInfo(Key, value = {}) {
        if (typeof value == 'object') {
            value = JSON.stringify(value)
        }
        localStorage.setItem(Key, value)
    }

    getLocalStorageInfo(Key) {
        return localStorage.getItem(Key)
    }

    setSessionStorageInfo(Key, value = {}) {
        if (typeof value == 'object') {
            value = JSON.stringify(value)
        }
        window.sessionStorage.setItem(Key, value)
    }

    getSessionStorageInfo(Key) {
        return window.sessionStorage.getItem(Key)
    }

    needLogin() {
        return !!localStorage.getItem('password') && window.sessionStorage.getItem('isLocked') != 'false'
    }

    getCurrPath() {
        return browserHistory.getCurrentLocation().pathname.replace(/^\//, '')
    }

    //获取url search参数
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }
}
export default new Util()
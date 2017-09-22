class WeaChatService {

    constructor() {

    }

    setContent(shareObj){
        const wxdata = {
            'title'     : decodeURIComponent(shareObj.title),
            'desc'      : decodeURIComponent(shareObj.desc),
            'link'      : decodeURIComponent(shareObj.link),
            'imgUrl'    : decodeURIComponent(shareObj.img)
        };
        const wxdataFriend = {
            'title'     : decodeURIComponent(shareObj.title),
            'desc'      : decodeURIComponent(shareObj.desc),
            'link'      : decodeURIComponent(shareObj.link),
            'imgUrl'    : decodeURIComponent(shareObj.img),
            'type'      : decodeURIComponent(shareObj.type || 'link'), // 分享类型,music、video或link，不填默认为link
            'dataUrl'   : decodeURIComponent(shareObj.dataUrl || ''), // 如果type是music或video，则要提供数据链接，默认为空
        };
        const wxdataTimeline = {
            'title'     : decodeURIComponent(shareObj.desc),
            'link'      : decodeURIComponent(shareObj.link),
            'imgUrl'    : decodeURIComponent(shareObj.img)
        };
        wx.ready(function(){
            window.wx.onMenuShareAppMessage(wxdataFriend); //分享给朋友
            window.wx.onMenuShareTimeline(wxdataTimeline); //分享到朋友圈
            window.wx.onMenuShareQQ(wxdata);               //分享到QQ
            window.wx.onMenuShareWeibo(wxdata);            //分享到微博
            window.wx.onMenuShareQZone(wxdata);            //分享到QQ空间
        });
    }
}

export default WeaChatService();
const AV = require('/libs/AV.js')
const eventBus = new require('/libs/EventBus.js')()

AV.init({ 
 appId: 'DSqT0JstxADMYEIqhTM9CVkk-gzGzoHsz', 
 appKey: 'qAKWeP1wdTyVUgjAkzvjEsHW', 
})

//app.js
App({
  onLaunch: function () {
    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  eventBus: eventBus,
  pageInitData: {}
})
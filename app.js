const AV = require('/libs/AV.js')
const EventBus = require('/libs/EventBus.js')
const eventBus = new EventBus()

AV.init({ 
 appId: 'DSqT0JstxADMYEIqhTM9CVkk-gzGzoHsz', 
 appKey: 'qAKWeP1wdTyVUgjAkzvjEsHW', 
})

//app.js
App({
  onLaunch () {
    this.getUserInfo(userInfo => console.log(userInfo))
  },
  getUserInfo (callback) {
    let that = this
    if (this.globalData.userInfo) {
      callback && callback(this.globalData.userInfo)
    } else {
      wx.login({
        success () {
          wx.getUserInfo({
            success (res) {
              that.globalData.userInfo = res.userInfo
              callback && callback(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {},
  pageInitData: {},
  eventBus: eventBus
})
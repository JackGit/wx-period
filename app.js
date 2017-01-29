import AV from '/libs/AV.js'
import EventBus from '/libs/EventBus.js'
import UserAPI from '/api/user.js'
import TemperatureAPI from '/api/temperature.js'

const eventBus = new EventBus()

AV.init({
 appId: 'DSqT0JstxADMYEIqhTM9CVkk-gzGzoHsz',
 appKey: 'qAKWeP1wdTyVUgjAkzvjEsHW',
})

//app.js
App({
  onLaunch () {
    this.getUserInfo(userInfo => console.log(userInfo))

    /*UserAPI.checkUserExistence(openid, user => {
      if (user) {
        // exists
      } else {
        // new user
        UserAPI.createUser(request, response => {

        }, error => {

        })
      }
    }, () => {
      // error
    })*/
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

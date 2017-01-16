var app = getApp()
Page({
  tapMore () {
    wx.navigateTo({url: '../month/month'})
  },
  tapAdd () {
    wx.navigateTo({url: '../edit/edit'})
  }
})

import AV from '../../libs/AV.js'
import Waves from '../../libs/Waves.js'
import { addTemperature, getMonthData } from '../../api/temperature.js'

const app = getApp()
const pageInitData = app.pageInitData
const eventBus = app.eventBus
const windowWidth = wx.getSystemInfoSync().windowWidth
const windowHeight = wx.getSystemInfoSync().windowHeight
const canvasHeight = windowHeight / 3 * 2
const today = new Date()

let wave = null

Page({
  data: {
    loaded: false,
    todayRecord: null,
    todayDateString: today.getFullYear() + '年' + (today.getMonth() + 1) +　'月' + today.getDate() + '日',
    canvasHeight: canvasHeight
  },
  onLoad () {
    eventBus.on('today-record-change', this.setTodayRecord.bind(this))
  },
  onUnload () {
    wave.destroy()
    wave = null
  },
  onReady () {
    this.loginAndFetchData().then(() => this.drawWaves())
  },
  onShow () {
    this.drawWaves()
    wave && wave.start()
  },
  onHide () {
    wave && wave.stop()
  },
  loginAndFetchData () {
    return AV.Promise.resolve(AV.User.current()).then(user => {
      return user ? (
        user.isAuthenticated().then(authed => authed ? user : null)
      ) : null
    }).then(user => {
      return user ? user : AV.User.loginWithWeapp()
    }).then(user => {
      return getMonthData({ year: today.getFullYear(), month: today.getMonth() }).then(records => {
        let todayRecord = records[records.length - 1]
        this.setTodayRecord(todayRecord.id.indexOf('temp') === -1 ? todayRecord : null)
        this.setData({loaded: true})
      })
    }).catch(error => {
      console.error(error.message)
      wx.showToast({
        title: '获取数据失败',
        icon: 'cancel',
        duration: 2000
      })
    })
  },
  setTodayRecord (record) {
    this.setData({
      todayRecord: record || false
    })
  },
  drawWaves () {
    let ctx = wx.createCanvasContext('waveCanvas')
    let color
    //let grd = ctx.createLinearGradient(0, 0, 0, canvasHeight)
    let inPeriod = this.data.todayRecord ? this.data.todayRecord.inPeriod : false
    let waveLength = inPeriod ? windowWidth * 2 : windowWidth * 20
    let waveHeight = inPeriod ? 40 : 5
    let speed = inPeriod ? .3 : .1
    let waves = null

    if (inPeriod) {
      //grd.addColorStop(0, '#f9bec3')
      //grd.addColorStop(1, '#ee4e5b')
      color = '#ee4e5b'
    } else {
      //grd.addColorStop(0, '#b7ecfe')
      //grd.addColorStop(1, '#56abfe')
      color = '#56abfe'
    }

    waves = [{
      x: Math.random() * windowWidth,
      y: 70,
      color: color,
      opacity: .8,
      speed: speed - .1,
      length: waveLength,
      height: waveHeight
    }, {
      x: Math.random() * windowWidth,
      y: 100,
      color: color,
      opacity: .8,
      speed: speed,
      length: waveLength,
      height: waveHeight
    }]

    if (wave) {
      wave.setWaves(waves)
    } else {
      wave = new Waves(ctx, {
        width: windowWidth,
        height: canvasHeight,
        autoStart: true,
        waves: waves
      })
    }
  },
  toTodayDetail (redirect) {
    let url = '../details/details?year=' + today.getFullYear() + '&month=' + today.getMonth() + '&date=' + today.getDate()
    if (redirect) {
      wx.redirectTo({ url })
    } else {
      wx.navigateTo({ url })
    }
  },
  tapTodayRecord () {
    this.toTodayDetail()
  },
  tapAddBtn () {
    eventBus.once('temperature-editor:confirm:index', temperature => {
      addTemperature({
          temperature,
          inPeriod: false,
          note: '',
          date: new Date(today.getFullYear(), today.getMonth(), today.getDate())
      }).then(record => {
          this.setTodayRecord(record)
          this.toTodayDetail(true)
      }).catch(
          () => wx.showToast({
              title: '添加失败',
              icon: 'cancel',
              duration: 2000
          })
      )
    })
    pageInitData['temperature-editor'] = {}
    wx.navigateTo({url: '../temperature-editor/temperature-editor?sourcePage=index'})
  }
})

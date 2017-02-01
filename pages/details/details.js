import { addTemperature, getMonthData, updateTemperature } from '../../api/temperature.js'
import { temperatureRecordsToBarData } from '../../utils/util.js'

const app = getApp()
const pageInitData = app.pageInitData
const eventBus = getApp().eventBus
const now = new Date()
let temperatureRecords = []
let monthOffset = 0

Page({
    data: {
        currentRecord: null,
        barInfo: {
            data: [],
            selected: '',
            barWidth: 8,
            barColor: '#fff',
            labelColor: '#cfe5fc'
        },
        showPrevButton: true,
        showNextButton: false
    },
    onLoad () {
        eventBus.on('temperature-change', this.handleTemperatureChange.bind(this))
        eventBus.on('note-change', this.handleNoteChange.bind(this))
    },
    onReady () {
        this.getMonthData()
    },
    onUnload () {
        eventBus.off('temperature-change')
    },
    getMonthData () {
        wx.showToast({
            title: 'loading',
            icon: 'loading'
        })
        getMonthData({ year: now.getFullYear(), month: now.getMonth() + monthOffset }).then(this.initData).then(() => {
            wx.hideToast()
        })
    },
    initData (records) {
        console.log('month data', records)
        let currentRecord
        temperatureRecords = records

        if (monthOffset === 0) {
            currentRecord = temperatureRecords.filter(r => r.date - new Date(now.getFullYear(), now.getMonth(), now.getDate()) === 0)[0]
        } else {
            currentRecord = temperatureRecords[0]
        }
        
        this.setData({
            currentRecord: currentRecord
        })
        this.syncBarInfo()
        this.syncMonthSelectorButtons()
    },
    handleTemperatureChange (value) {
        updateTemperature({
            id: this.data.currentRecord.id,
            temperature: value
        }).then(() => {
            temperatureRecords.filter(r => r.id === this.data.currentRecord.id)[0].temperature = value
            this.setData({
                'currentRecord.temperature': value
            })
            this.syncBarInfo()
        }).catch(
            () => wx.showToast({
                title: '更新失败',
                icon: 'cancel',
                duration: 2000
            })
        )
    },
    handleNoteChange (value) {
        updateTemperature({
            id: this.data.currentRecord.id,
            note: value
        }).then(() => {
            temperatureRecords.filter(r => r.id === this.data.currentRecord.id)[0].note = value
            this.setData({
                'currentRecord.note': value
            })
        }).catch(
            () => wx.showToast({
                title: '更新失败',
                icon: 'cancel',
                duration: 2000
            })
        )
    },
    handleChangePeriod (e) {
        let value = e.detail.value

        updateTemperature({
            id: this.data.currentRecord.id,
            inPeriod: value
        }).then(() => {
            temperatureRecords.filter(r => r.id === this.data.currentRecord.id)[0].inPeriod = value
            this.setData({
                'currentRecord.inPeriod': value
            })
        }).catch(
            () => wx.showToast({
                title: '更新失败',
                icon: 'cancel',
                duration: 2000
            })
        )
    },
    tapNext () {
        if (!this.data.showNextButton) {
            return
        }
        monthOffset++
        this.getMonthData()
    },
    tapPrev () {
        if (!this.data.showPrevButton) {
            return
        }
        monthOffset--
        this.getMonthData()
    },
    handleTapBar (e) {
        let id = e.currentTarget.dataset.id
        
        if (id === this.data.currentRecord.id) {
            return
        } else {
            this.setData({
                currentRecord: temperatureRecords.filter(r => r.id === id)[0],
                'barInfo.selected': id
            })
        }
    },
    editTemperature () {
        pageInitData['temperature-editor'] = {}
        wx.navigateTo({ url: '../temperature-editor/temperature-editor' })
    },
    editNote () {
        pageInitData['note-editor'] = { note: this.data.currentRecord.note }
        wx.navigateTo({url: '../note-editor/note-editor'})
    },
    addData () {
        let index = -1

        for (let i = 0; i < temperatureRecords.length; i++) {
            if (temperatureRecords[i].id === this.data.currentRecord.id) {
                index = i
                break
            }
        }

        addTemperature({
            temperature: 36.7,
            inPeriod: false,
            note: '',
            date: this.data.currentRecord.date
        }).then((temperature) => {
            temperatureRecords.splice(index, 1, temperature)
            
            this.setData({
                currentRecord: temperature
            })
            this.syncBarInfo()
            this.editTemperature()
        })
    },
    deleteData () {
        wx.showActionSheet({
            itemList: ['确认删除'],
            itemColor: '#ee4e5b',
            success (response) {
                if (response.tapIndex === 0) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 1000
                    })
                }
            }
        })
    },
    syncBarInfo () {
         this.setData({
             'barInfo.data': temperatureRecordsToBarData(temperatureRecords),
             'barInfo.selected': this.data.currentRecord.id
         })
    },
    syncMonthSelectorButtons () {
        this.setData({
            showPrevButton: true,
            showNextButton: monthOffset === 0 ? false : true
        })
    }
})
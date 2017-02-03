import { addTemperature, getMonthData, updateTemperature, deleteTemperature } from '../../api/temperature.js'
import { temperatureRecordsToBarData, createTempRecord, findIndexById } from '../../utils/util.js'

const app = getApp()
const pageInitData = app.pageInitData
const eventBus = getApp().eventBus
const now = new Date()
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
let temperatureRecords = []
let monthOffset = 0
let initDate = null

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
    onLoad (options) {
        if (options.year) { // target date in url
            initDate = new Date(options.year, options.month, options.date)
        } else {
            initDate = today
        }
        monthOffset = 0
        eventBus.on('temperature-change', this.handleTemperatureChange.bind(this))
        eventBus.on('note-change', this.handleNoteChange.bind(this))
    },
    onReady () {
        console.log('ready')
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
        getMonthData({
            year: initDate.getFullYear(),
            month: initDate.getMonth() + monthOffset
        }).then(this.initData).then(() => {
            wx.hideToast()
        })
    },
    initData (records) {
        let currentRecord
        temperatureRecords = records

        if (monthOffset === 0) { // default as init date
            currentRecord = temperatureRecords.filter(r => r.date - initDate === 0)[0]
        } else { // default the 1st record of target month
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
            this.syncTodayRecord()
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
            this.syncTodayRecord()
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
        let index = findIndexById(temperatureRecords, this.data.currentRecord.id)

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
        let id = this.data.currentRecord.id
        let that = this
        wx.showActionSheet({
            itemList: ['确认删除'],
            itemColor: '#ee4e5b',
            success (response) {
                if (response.tapIndex === 0) {
                    deleteTemperature(id).then(() => {
                        let tempRecord = createTempRecord(null, that.data.currentRecord.date)
                        let index = findIndexById(temperatureRecords, id)

                        temperatureRecords.splice(index, 1, tempRecord)
                        that.setData({
                            currentRecord: tempRecord
                        })
                        that.syncBarInfo()
                        that.syncTodayRecord()
                    }).catch(e => {
                        console.log('delete error', e)
                        wx.showToast({
                            title: '删除失败',
                            icon: 'cancel',
                            duration: 2000
                        })
                    })
                }
            }
        })
    },
    syncBarInfo () {
         this.setData({
             'barInfo.data': temperatureRecordsToBarData(temperatureRecords),
             'barInfo.selected': this.data.currentRecord ? this.data.currentRecord.id : ''
         })
    },
    syncMonthSelectorButtons () {
        let date = new Date(initDate.getFullYear(), initDate.getMonth() + monthOffset)
        this.setData({
            showPrevButton: true,
            showNextButton: (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth()) ? false : true
        })
    },
    syncTodayRecord () {
        if (this.data.currentRecord.date * 1 === today * 1) {
            eventBus.emit('today-record-change', this.data.currentRecord.id.indexOf('temp') === -1 ? this.data.currentRecord : null)
        } 
    }
})
import { addTemperature, getMonthData } from '../../api/temperature.js'
import { temperatureRecordsToBarData } from '../../utils/util.js'

const app = getApp()
const pageInitData = app.pageInitData
const eventBus = getApp().eventBus
const now = new Date()

Page({
    data: {
        temperatureRecords: [],
        currentRecord: null,
        barInfo: {
            data: [],
            selected: '',
            barWidth: 20,
            barColor: '#fff',
            labelColor: '#cfe5fc'
        },
        showPrevButton: true,
        showNextButton: true
    },
    onLoad () {
        eventBus.on('temperature-change', this.handleTemperatureChange.bind(this))
        eventBus.on('note-change', this.handleNoteChange.bind(this))
    },
    onReady () {
        getMonthData({ year: now.getFullYear(), month: now.getMonth() }).then(this.setTemperatureData)
    },
    onUnload () {
        eventBus.off('temperature-change')
    },
    setTemperatureData (temperatureRecords) {
        this.setData({
            temperatureRecords,
            currentRecord: temperatureRecords.filter(
                r => r.date - new Date(now.getFullYear(), now.getMonth(), now.getDate()) === 0
            )[0],
            'barInfo.data': temperatureRecordsToBarData(temperatureRecords)
        })
    },
    handleTemperatureChange (value) {
        this.setData({ 'currentRecord.temperature': value })
    },
    handleNoteChange (value) {
        this.setData({ 'currentRecord.note': value })
    },
    handleChangePeriod (e) {
        this.setData({ 'currentRecord.inPeriod': e.detail.value })
    },
    tapNext () {

    },
    tapPrev () {
        
    },
    handleTapBar (e) {
        let id = e.currentTarget.dataset.id
        if (id === this.data.currentRecord.id) {
            return
        } else {
            this.setData({
                currentRecord: this.data.temperatureRecords.filter(r => r.id === id)[0],
                'barInfo.selected': id
            })
        }
    },
    editTemperature () {
        pageInitData['temperature-editor'] = { temperature: this.data.currentRecord.temperature }
        wx.navigateTo({ url: '../temperature-editor/temperature-editor' })
    },
    editNote () {
        pageInitData['note-editor'] = { note: this.data.currentRecord.note }
        wx.navigateTo({url: '../note-editor/note-editor'})
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
})
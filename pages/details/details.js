const app = getApp()
const pageInitData = app.pageInitData
const eventBus = getApp().eventBus
let barData = []

for (let i = 0; i < 31; i++) {
    barData.push({
        label: i,
        value: i > 20 ? 0 : Math.random() * 102
    })
}

Page({
    data: {
        currentRecord: {
            date: new Date(),
            temperature: 36.7,
            inPeriod: true,
            note: '这里是很关于今天的很长长很长的常常的一个说明，也可以是描述，或者note. but we dont end here'
        },
        barInfo: {
            data: barData,
            barWidth: 20,
            barColor: '#cfe5fc',
            labelColor: '#cfe5fc'
        }
    },
    onLoad () {
        eventBus.on('temperature-change', this.handleTemperatureChange.bind(this))
        eventBus.on('note-change', this.handleNoteChange.bind(this))
    },
    onUnload () {
        eventBus.off('temperature-change')
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
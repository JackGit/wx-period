const app = getApp()
const pageInitData = app.pageInitData
const eventBus = app.eventBus

Page({
    data: {
        note: ''
    },
    onLoad () {
        this.initPageData()
    },
    initPageData () {
        let note = pageInitData['note-editor'].note
        this.setData({
            note: note
        })
        delete pageInitData['note-editor']
    },
    handleInput (e) {
        this.setData({
            note: e.detail.value
        })
    },
    tapOK () {
        eventBus.emit('note-change', this.data.note)
        wx.navigateBack()
    }
})
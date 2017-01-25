const app = getApp()
const eventBus = app.eventBus
const pageInitData = app.pageInitData

Page({
    data: {
        keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C'],
        displayValue: ''
    },
    onLoad () {
        this.initPageData()
    },
    initPageData () {
        let value = pageInitData['temperature-editor'].temperature
        this.setData({
            displayValue: value + ''
        })
        delete pageInitData['temperature-editor']
    },
    tapKey (e) {
        let value = e.currentTarget.dataset.num
        let inputValues = this.data.displayValue.split('')
        
        if (value === 'C') {
            inputValues = []
        } else if (value === '.') {
            if (inputValues.length === 0) {
                inputValues.push('0')
                inputValues.push(value)
            }
            if (inputValues.indexOf('.') === -1) {
                inputValues.push(value)
            }
        } else if (value === '0' && inputValues.length === 1 && inputValues[0] === '0') {
            // do nothing
        } else {
            if (inputValues.length === 1 && inputValues[0] === '0') {
                inputValues = [value]
            } else {
                inputValues.push(value)
            }
        }

        this.setData({
            displayValue: inputValues.join('')
        })
    },
    tapOK () {
        eventBus.emit('temperature-change', this.data.displayValue * 1)
        wx.navigateBack()
    }
})
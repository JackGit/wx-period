const app = getApp()
const eventBus = app.eventBus
const pageInitData = app.pageInitData
let sourcePage = ''

Page({
    data: {
        keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C'],
        displayValue: '',
        activeKey: ''
    },
    onLoad (options) {
        sourcePage = options.sourcePage ? options.sourcePage : ''
        console.log('sourcePage', sourcePage)
        this.initPageData()
    },
    initPageData () {
        let value = pageInitData['temperature-editor'].temperature
        this.setData({
            displayValue: value ? value + '' : ''
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
            displayValue: inputValues.join(''),
            activeKey: value
        })
        setTimeout(() => {
            this.setData({
                activeKey: ''
            })
        }, 100)
    },
    tapOK () {
        let t = this.data.displayValue * 1
        if (t < 36 || t > 40) {
            wx.showModal({
                title: '异常体温',
                content: '请确认温度输入正确',
                success ({ confirm }) {
                    confirm && _confirm()
                }
            })
        } else {
            _confirm()
        }

        function _confirm () {
            //eventBus.emit('temperature-change', t)
            //wx.navigateBack()

            eventBus.emit('temperature-editor:confirm:' + sourcePage, t)
        }
    }
})
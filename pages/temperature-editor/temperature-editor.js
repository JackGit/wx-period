let inputValues = []

Page({
    data: {
        keys: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C'],
        displayValue: ''
    },
    tapKey (e) {
        let value = e.currentTarget.dataset.num
        
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
    tapConfirm () {
        
    }
})
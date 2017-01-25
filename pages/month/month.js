let barData = []
for (let i = 0; i < 31; i++) {
    barData.push({
        label: i,
        value: i > 20 ? 0 : Math.random() * 102
    })
}

Page({
    data: {
        barInfo: {
            data: barData,
            barWidth: 20,
            barColor: '#cfe5fc',
            labelColor: '#cfe5fc'
        },
        scrollLeft: 0,
        clicked: '',
        records: [{
            id: 1,
            temperature: 36.6,
            date: '2016-12-22',
            period: false
        }, {
            id: 2,
            temperature: 36.7,
            date: '2016-12-23',
            period: false
        }, {
            id: 3,
            temperature: '无数据',
            date: '2016-12-24',
            period: false
        }, {
            id: 4,
            temperature: 36.7,
            date: '2016-12-25',
            period: false
        }]
    },
    tapRecord (e) {
        this.setData({clicked: e.currentTarget.dataset.recordId})
        wx.navigateTo({url: '../edit/edit?recordId=' + e.currentTarget.dataset.recordId})
    },
    tapEdit () {
        wx.navigateTo({url: '../input/input'})
    },
    tapDelete () {
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
    tapNext () {

    },
    tapPrev () {
        
    }
})
Page({
    data: {
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

    }
})
Page({
    onLoad (options) {
        wx.showToast({
            title: options.recordId,
            icon: 'loading',
            duration: 1000
        })
    }
})
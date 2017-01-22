Page({
  onReady: function () {
    this.position = {
      x: 150,
      y: 150,
      vx: 2,
      vy: 2
    }

    this.drawBall()
    this.interval = setInterval(this.drawBall, 40)
  },
  drawBall: function () {
    var p = this.position
    p.x += p.vx
    p.y += p.vy
    if (p.x >= 300) {
      p.vx = -2
    }
    if (p.x <= 7) {
      p.vx = 2
    }
    if (p.y >= 300) {
      p.vy = -2
    }
    if (p.y <= 7) {
      p.vy = 2
    }

    var context = wx.createCanvasContext('canvas')

    function ball(x, y ,color) {
      context.beginPath(0)
      context.arc(x, y, 20, 0, Math.PI * 2)
      context.setFillStyle(color)
      context.setStrokeStyle('rgba(1,1,1,0)')
      context.fill()
      context.stroke()
      // context.draw()
    }

    ball(p.x, 150, 'red')
    ball(150, p.y, 'yellow')
    ball(300 - p.x, 150, 'red')
    ball(150, 300 - p.y, 'yellow')
    ball(p.x, p.y, 'red')
    ball(300 - p.x, 300 - p.y, 'yellow')
    ball(p.x, 300 - p.y, 'red')
    ball(300 - p.x, p.y,  'yellow')

    /*wx.drawCanvas({
      canvasId: 'canvas',
      actions: context.getActions()
    })*/
    context.draw()
    
  },
  onUnload: function () {
    clearInterval(this.interval)
  }
})

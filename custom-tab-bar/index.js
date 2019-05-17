Component({
  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#7a7e83",
    selectedColor: "#ff6700",
    list: [{
      "pagePath": "/pages/index/index",
      "text": "首页",
      "iconPath": "/images/fir.png",
      "selectedIconPath": "/images/fir_f.png",
    },
    {
      "pagePath": "/pages/self/self",
      "text": "我的",
      "iconPath": "/images/my.png",
      "selectedIconPath": "/images/my_f.png"
    }]
  },
  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached() { },
    moved() { },
    detached() { },
  },
  properties:{},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({ url })
    }
  }
})
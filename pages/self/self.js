const rq = require('../../utils/request.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    func: [],
    allFunc:
      [ 
        { name: '参与活动汇总', icon: '/images/part.png', id: 0 },
        { name: '组织活动汇总', icon: '/images/org.png', id: 1 },
        { name: '指导活动汇总', icon: '/images/org.png', id: 2 },
        { name: '角色申请', icon: '/images/apply.png', id: 3 },
        { name: '发布活动', icon: '/images/apply.png', id: 4 },
        { name: '资质审核', icon: '/images/apply.png', id: 5 },
        { name: '活动审核', icon: '/images/part.png', id: 6 }
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var temp=[]
    var id = wx.getStorageSync("id")
    //普通用户
    if (id == 0) {
      temp.push(this.data.allFunc[3])
      temp.push(this.data.allFunc[0])
    }
    else if (id == 1) {
      temp.push(this.data.allFunc[3])
      temp.push(this.data.allFunc[1])
      temp.push(this.data.allFunc[2])
    }
    else if (id == 2) {
      temp.push(this.data.allFunc[4])
      temp.push(this.data.allFunc[0])
      temp.push(this.data.allFunc[1])
    }
    else if(id==3){
      temp.push(this.data.allFunc[5])
      temp.push(this.data.allFunc[6])
    }
    this.setData({
      func:temp
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.slideright(this, 'slide', -400, 1);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.slideright(this, 'slide', 400, 0);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  show: function (e) {
    var to = e.currentTarget.id
    console.log(to)
    switch(to){
      case '0':
        wx.navigateTo({
         url: '../collect/collect?type=part'
        }); break;
      case '1':
        wx.navigateTo({
          url: '../collect/collect?type=org'
        }); break;
      case '2':
        wx.navigateTo({
          url: '../collect/collect?type=dir'
        }); break;
      case '3':
        wx.navigateTo({
          url: '../publish/publish'
        }); break;
      case '4':
        wx.navigateTo({
          // url: '../review/review'
          url: '../publish/publish'
        }); break;
      case '5':
        wx.navigateTo({
          url: '../audit/audit'
        }); break;
    }

  }
})
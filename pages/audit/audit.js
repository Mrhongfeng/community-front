// pages/collect/collect.js
const rq = require('../../utils/request.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    cout: 0,
    affairsList: [],
    acTitle: '',
    acStart_time: '',
    acEnd_time: '',
    acLocation: '',
    acOrg:'',
    acThreshold:'',
    acBonus:'',
    acContent:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.cout == 0) {
      this.loadaffairs();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    app.slideup(this, 'slider', 20, 1);
    setTimeout(function () {
      app.fadelong(that, 'up', 1)
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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
  //自定义
  loadaffairs: function (e) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    this.setData({
      affairsList: [],
    });
    var that = this;
    var formatDa = rq.requestFormat(JSON.stringify(this.data))
    //活动审核申请路径
    var url = app.globalData.domain + '/community/verifylist'
    rq.requestBase(url, formatDa, this.successFunc)
  },
  successFunc: function (e) {
    var old = this.data.affairsList;
    var that = this
    wx.hideToast();
    this.setData({
      'affairsList': old.concat(e.data)
    })
    that.setData({
      cout: e.data.length,
    })
    wx.setStorageSync('questionCout', e.data.length)
    //console.log(that.data.cout);
    let _resmsg = '-- 没有数据啦 (*・ω・) --';
    that.setData({
      resmsg: _resmsg
    })
  },
  showDetail: function (e) {
    var that = this
    console.log(e)
    this.setData({
      isShow: true,
      current: e.currentTarget.id
    })
    var url = app.globalData.domain + '/community/detail/' + e.currentTarget.id
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          acTitle: res.data.acTitle,
          acStart_time: res.data.acstartTime,
          acEnd_time: res.data.acendTime,
          acLocation: res.data.acLocation,
          acOrg: res.data.acOrg,
          acThreshold: res.data.acThreshold,
          acBonus: res.data.acBonus,
          acContent: res.data.acContent,
          acCredit: res.data.accredit
        })
      }
    })
  },
  hide: function () {
    this.setData({
      isShow: false
    })
  },
  tap: function (e) {
    console.log(e)
    if (e.target.id == 'tap') {
      this.hide();
    }
  },
  agree: function () {
    var that = this
    wx.showModal({
      title: '确认通过该活动的申请？',
      content: '注意：审核结果将无法撤销',
      success: function (res) {
        if (res.confirm) {
          var url = app.globalData.domain + '/community/permit/' + that.data.current;
          wx.request({
            url: url,
            method: 'POST',
            success: function (res) {
              console.log('审核通过')
              that.hide()
              that.loadaffairs();
            }
          })
        }
      }
    })
  },
  disagree: function () {
    var that = this
    wx.showModal({
      title: '确认不通过该活动的申请？',
      content: '注意：审核结果将无法撤销',
      success: function (res) {
        if (res.confirm) {
          that.hide()
        }
        else {

        }
      }
    })
  }  
})
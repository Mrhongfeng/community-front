// pages/collect/collect.js
const rq = require('../../utils/request.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    affairsList: [
      { name: '活动1', id: 0 },
      { name: '活动2', id: 1 },
      { name: '活动3', id: 2 },
      { name: '活动4', id: 3 },
      { name: '活动5', id: 4 },
      { name: '活动6', id: 5 },
      { name: '活动7', id: 6 },
      { name: '活动8', id: 7 }
    ],
    acTitle: '活动1',
    acStart_time: '2019/05/01',
    acEnd_time: '2019/05/04',
    acLocation: '上海市杨浦区军工路516号校门口',
    acOrg:'社区',
    acThreshold:'100',
    acBonus:'1',
    acContent:'一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十'
  },
  //自定义
  showDetail: function () {
    this.setData({
      isShow:true
    });
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
          that.hide()
        }
        else {

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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  }
})
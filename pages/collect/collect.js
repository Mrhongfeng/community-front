// pages/collect/collect.js
const rq = require('../../utils/request.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    affairsList:[
      { name: '活动1', id: 0 },
      { name: '活动2', id: 1 },
      { name: '活动3', id: 2 },
      { name: '活动4', id: 3 },
      { name: '活动5', id: 4 },
      { name: '活动6', id: 5 },
      { name: '活动7', id: 6 },
      { name: '活动8', id: 7 }
    ]
  },
  //自定义
  up: function(){
    console.log("up");
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type=='part') {
      this.setData({
        type:'我参加的活动'
      })
    }
    else if (options.type == 'org'){
      this.setData({
        type: '我组织的活动'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that=this
    app.slideup(this, 'slider',20,1);
    setTimeout(function(){
      app.fadelong(that,'up',1)
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
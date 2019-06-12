// pages/collect/collect.js
const rq = require('../../utils/request.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cout: 0,
    isShow: false,
    affairsList: [],
    acTitle: '',
    acstartTime: '',
    acendTime: '',
    acLocation: '',
    acOrg: '',
    acThreshold: '',
    acBonus: '',
    acContent: '',
    id: 0
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
    else {
      this.setData({
        type: '我指导的活动'
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
    if (this.data.cout == 0) {
      this.loadaffairs();
    }
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
  hide: function () {
    this.setData({
      isShow: false
    })
  },
  tap: function (e) {
    if (e.target.id == 'tap') {
      this.hide();
    }
  },
  /* 加载活动 */
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
    var formatDa = rq.requestFormat(JSON.stringify(this.data.id))//传送当前用户的openid
    var url = app.globalData.domain + '/community/list'
    rq.requestBase(url, formatDa, this.successFunc)
  },
  //详情浏览
  showDetail: function (e) {
    var that=this
    console.log(e)
    var url = app.globalData.domain + '/community/detail/' + e.currentTarget.id;
    this.setData({
      isShow: true,
    })
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          acTitle: res.data.acTitle,
          acContent: res.data.acContent,
          acLocation: res.data.acLocation,
          acOrg: res.data.acOrg,
          acstartTime: res.data.acstartTime,
          acendTime: res.data.acendTime,
          acBonus: res.data.acBonus,
          accredit: res.data.accredit
        })
      }
    })
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
})
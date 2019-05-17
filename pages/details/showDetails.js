// pages/details/showDetails.js

const rq = require('../../utils/request.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    accontent:"",
    valiid:"",
    navicateData:{
    name: null,//活动名
    tchCount: null,//报名教师数
    stuCount: null,//报名学员数
    stuAllCount: null,//学员上限
    tchAllCount: null,//导师上限（看着办，你的组员们觉得就一个好了
    orgType: null,//活动类别
    limit: null,//积分门槛
    reward: null,//积分奖励
    resume: null,//活动简介
    location: null,//活动地点
    stuStartSignTime: null,//报名开始
    stuEndSignTime: null,//报名结束
    startPartTime: null,//活动开始
    endPartTime: null,//活动结束
    /** 以下看着办，你的组员们不想做这么复杂 */
    tchStartSignTime: null,//抢单开始
    tchEndSignTime: null,//抢单结束
    },
    current: 0,
    tab: [],
    sign: [
      { name: 1, flag: 0 },
      { name: 2, flag: 1 },
      { name: 3, flag: 1 },
      { name: 4, flag: 0 },
      { name: 5, flag: 0 },
      { name: 6, flag: 1 },
      { name: 7, flag: 0 },
      { name: 8, flag: 0 },
      { name: 9, flag: 1 },
      { name: 10, flag: 1 },
      { name: 11, flag: 0 },
      { name: 12, flag: 0 },
      { name: 13, flag: 1 },
      { name: 14, flag: 0 },
    ]
  },
  /*自定义函数 */
  //tab栏
  show: function(e){
    this.setData({
      current: e.currentTarget.dataset.index,
    });
  },
  compensate: function(e){
    var that = this
    wx.showModal({
      title: '确定为该学员进行补签？',
      content: '注意：补签结果将无法撤销',
      success: function (res) {
        if (res.confirm) {
          var ind = e.currentTarget.dataset.index
          var s="sign["+ind+"].flag"
          that.setData({
            [s]: 1
          })
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
    var that = this;
    console.log(options);
    this.setData({
      tab: [
        '活动详情',
        '具体安排',
        '参与须知',
        '签到情况'
      ],
    })
    var url = app.globalData.domain + '/community/detail/' + options.id;
    //console.log(url)
    wx.request({
      url: url,
      method: 'GET',
      success:function(res){
        console.log(res);
        that.setData({
          accontent : res.data.accontent
        })
      }

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

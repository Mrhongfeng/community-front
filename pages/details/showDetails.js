// pages/details/showDetails.js

const rq = require('../../utils/request.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    valiid:"",
      name: null,//活动名
      tchCount: null,//报名教师数
      stuCount: null,//报名学员数
      stuAllCount: null,//学员上限
      orgType: null,//活动类别
      limit: null,//积分门槛
      reward: null,//积分奖励
      resume: null,//活动简介
      location: null,//活动地点
      start: null,//活动开始
      end: null,//活动结束
    current: 0,
    buttonType: "",
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
    //活动参与按钮
    if(options.current!=0) {
      this.setData({
        buttonType: '活动已截止'
      })
    }
    else {
      if(options.user==0)
        this.setData({
          buttonType: '我要报名'
        })
      else if(options.user==1)
        this.setData({
          buttonType: '我要抢单'
        })
    }
    //活动显示tab栏
    if(options.user!=1){
      this.setData({
        tab: [
          '活动详情',
          '具体安排',
          '参与须知',
        ],
      })
    }
    else {
      this.setData({
        tab: [
          '活动详情',
          '具体安排',
          '参与须知',
          '签到情况'
        ],
      })
    } 
    var url = app.globalData.domain + '/community/detail/' + options.id;
    wx.request({
      url: url,
      method: 'GET',
      success:function(res){
        console.log(res);
        that.setData({
          name : res.data.acTitle,
          resume : res.data.acContent,
          location : res.data.acLocation,
          orgType : res.data.acOrg,
          start : res.data.acstartTime,
          end : res.data.acendTime,
          reward : res.data.acBonus,
          stuAllCount: res.data.acThreshold,
          limit: res.data.accredit
        })
      }
    })
    var url = app.globalData.domain + '/community/wxuseractivity/usercount/' + options.id;
    wx.request({
      url: url,
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          stuCount: res.data
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

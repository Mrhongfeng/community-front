// pages/login/login.js

import Key from '../../utils/key.js';
import WXBaseStore from '../../utils/getOpenid.js';
var fun_md5 = require('../../utils/md5.js');
var fun_base64 = require('../../utils/base64.js');
var util = require('../../utils/util.js');
const rq = require('../../utils/request.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let value = wx.getStorageSync(Key.storageKey.userinfo)
    if (!value) {
      that.setData({
        showPreLayer: true
      })
    } else {
      app.globalData.openid = value.openid;
      //that.init()
    }

    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
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
    let that = this
    let openid = wx.getStorageSync(Key.storageKey.openid)
    if (openid) {
      //检查openid是否为空（因为有时出现有openid获取到为undefined的情况）
      if (!openid) {
        wx.clearStorageSync()
        wx.showToast({
          title: 'openid获取失败，请退出微信后再进入重试',
          icon: 'none',
          duration: 60000
        })
        // 执行缓存清理
        wx.clearStorageSync()
        return;
      }
      //that.init()
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

  gototabbar:function(res){

    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function (e) {
    let that = this
    let userInfo = e.detail.userInfo
    console.info('获取用户信息', e, userInfo)
    //拒绝授权的情况
    if (!userInfo) {
      return
    }
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000
    })
    WXBaseStore.getOpenid().then(data => {
      console.log("1")
      console.log(data)
      if (!data.userInfo.openId) {
        wx.showToast({
          title: 'openid获取失败，请退出微信后再进入重试',
          icon: 'none',
          duration: 60000
        })
        return;
      };

      //userInfo.openid = data.userIndo.openId;
      //关闭蒙层

      wx.reLaunch({
        url: '../index/index',
      })


    })
  }

})
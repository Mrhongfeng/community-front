//app.js
import Key from './utils/key.js';

App({
  onLaunch: function () {
    wx.request({
      url: 'http://localhost:8080/auth',
      data: {
        userName: 'admin',
        password: 'admin',
        system: 'affair'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.randomKey != '' && res.data.randomKey != null && res.data.randomKey.length == 6) {
          wx.setStorage({
            key: 'randomKey',
            data: res.data.randomKey,
          })
          wx.setStorage({
            key: 'token',
            data: res.data.token,
          })
          wx.setStorage({
            key: 'userName',
            data: '123',
          })

          wx.showToast({
            title: '加载成功',
            icon: 'success',
            duration: 2000,
          })
        } else {

          wx.showToast({
            title: '加载失败',
            icon: 'none',
            duration: 2000
          })

        }
      }
    })

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.setStorageSync("id",2)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    appid: null,
    openid: null,
    cout: '',
    // domain: 'http://10.40.94.138:8080',
    domain: 'http://localhost:8080',
    localStorage: {
      style: {},
      usage: {
        history: []
      }
    },
    onShow: function () {
      wx.showShareMenu()
      console.info('onShow');
    },
  },
  fade: function (that, param, opacity) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },
  fadelong: function (that, param, opacity) {
    var animation = wx.createAnimation({
      duration: 2500,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //滑动渐入渐出
  slideup: function (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //向右滑动渐入渐出
  slideright: function (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  }
})
import Config from './config.js';
import Key from './key.js';

const app = getApp()

const WXBaseStore = {
  /**
   * 获取openid
   */
  getOpenid: () => {
    //console.info('getOpenid', app.globalData.appid)
    //step1: 获取code相关信息：调用wx.login
    return new Promise(function (resolve, reject) {
      wx.login({
        success: function (res) {
          var code = res.code;//登录凭证
          console.info('wx.login response', res)
          console.log(res)
          console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })

          if (code) {
            //2、调用获取用户信息接口
            wx.getUserInfo({
              success: function (res) {
                console.log(res)
                console.log({ encryptedData: res.encryptedData, iv: res.iv, code: code })
                //3.请求自己的服务器，解密用户信息 获取unionId等加密信息

                //step2: 获取openid相关信息：调用wx.request
                wx.request({
                  //url: 'https://api.weixin.qq.com/sns/jscode2session',
                  url: app.globalData.domain + '/auth/Wxuser/decodeUserInfo',
                  data: {
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    code: code
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res) {
                    console.info('wx.request response', res)
                    console.log(res.data.userInfo.openId);
                    if (res.data.status == 1) {
                      var userInfo_ = res.data.userInfo;
                      console.log(userInfo_);
                      console.log("解密成功");

                      //本地缓存用户信息
                      wx.setStorageSync('userInfo', userInfo_)
                      wx.setStorageSync('openid', userInfo_.openId)
                      wx.setStorageSync('check', res.data.check)
                    } else {
                      console.log('解密失败')
                    }

                    if (res.data.errcode) {
                      reject('获取openid失败: ' + res.data.errmsg);
                      if (res.data.errcode == 40125) {
                        wx.showModal({
                          title: '提示',
                          content: '请先配置你的小程序secret。',
                        })
                      }
                    }
                    resolve(res.data)
                  },
                  fail: function (msg) {
                    console.info('wx.request fail', msg)
                    wx.showToast({
                      title: '2获取openid失败' + '，fail:' + JSON.stringify(msg),
                      icon: 'none',
                      duration: 5000
                    })
                    reject('获取openid失败：' + JSON.stringify(msg))
                  }
                })
              }
            })
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '获取临时登录凭证失败',
            icon: 'none',
            duration: 5000
          })
          reject('获取临时登录凭证失败')
        }
      })
    })
  },
  /**
   * 获取微信用户基本信息（从本地缓存中）
   */
  getUserInfoCache: () => {
    //console.info('获取微信用户基本信息（从本地缓存中）', Key.storageKey.userinfo)
    let value = wx.getStorageSync(Key.storageKey.userinfo)
    if (value) {
      return value
    } else {
      wx.showToast({
        title: '获取微信用户基本信息失败',
        icon: 'none',
        duration: 5000
      })
    }
  },
};

export default WXBaseStore;
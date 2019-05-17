const rq = require('../../utils/request.js');
var app = getApp()
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    notice_status: false,
    peopleHide: false,
    isAgree: false,
    showTopTips: false,
    TopTips: '',
    noteMaxLen: 200,//备注最多字数
    content: "",
    noteNowLen: 0,//备注当前字数
    types: ["导师", "组织者"],
    typeIndex: "0",
    showInput: false
  },
  //阅读须知
  tapNotice: function (e) {
    console.log(e)
    if (e.target.id == 'notice') {
      this.hideNotice();
    }
  },
  showNotice: function (e) {
    this.setData({
      'notice_status': true
    });
  },
  hideNotice: function (e) {
    this.setData({
      'notice_status': false
    });
  },
  //改变角色类别
  bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  },
  //字数改变触发事件
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      content: value, noteNowLen: len
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({//初始化数据
      src: "",
      isSrc: false,
      ishide: "0",
      autoFocus: true,
      isLoading: false,
      loading: true,
      isdisabled: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideToast()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.slideright(this,'slide',0,1);
    var myInterval = setInterval(getReturn, 500); ////半秒定时查询
    function getReturn() {
      wx.getStorage({
        key: 'user_openid',
        success: function (ress) {
          if (ress.data) {
            clearInterval(myInterval)
            that.setData({
              loading: true
            })
          }
        }
      })
    }
  },

  //上传凭证
  uploadPic: function () {//选择图标
    wx.chooseImage({
      //count: 9,
      sizeType: ['compressed'], //压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isSrc: true,
          src: tempFilePaths
        })
      }
    })
  },
  //删除图片
  clearPic: function () {//删除图片
    that.setData({
      isSrc: false,
      src: ""
    })
  },
  //同意相关条例
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length,
      showInput: !this.data.showInput
    });
  },
  //表单验证
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  //提交表单
  submitForm: function (e) {
    var that = this;
    if (that.data.showInput == false) {
      wx.showModal({
        title: '提示',
        content: '请先阅读《社区活动系统角色申请须知》'
      })
      return;
    }
    var typeIndex = this.data.typeIndex;
    var applytype = 1 + parseInt(typeIndex);
    var applyname = getTypeName(applytype); //获得类型名称
    var content = e.detail.value.content;
    //校验
    if (content == "") {
      this.setData({
        // showTopTips: true,
        TopTips: '申请理由不得为空！'
      });
      app.fade(this,'fade',0.8);
      setTimeout(function () {
        app.fade(that, 'fade', 0);
      }, 1500);
    } 
    else {
      console.log('校验完毕');
      that.setData({
        isLoading: true,
        isdisabled: true
      })
    }
    // setTimeout(function () {
    //   that.setData({
    //     showTopTips: false
    //   });
    // }, 2000);
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

//根据活动类型获取活动类型名称
function getTypeName(applytype) {
  var applyName = "";
  if (applytype == 1) applyName = "活动导师";
  else if (applytype == 2) applyName = "活动组织者";
  return applyName;
}
const rq = require('../../utils/request.js');

var app = getApp()
var that;
var myDate = new Date();
//格式化日期
function formate_data(myDate) {
  let month_add = myDate.getMonth() + 1;
  var formate_result = myDate.getFullYear() + '-'
    + month_add + '-'
    + myDate.getDate()
  return formate_result;
}
Page({
  /**
   * 页面的初始数据
   */
  data: {

    formData:{
      acOrg:"",
      acTitle:"",
      acContent:"",
      acLocation:"",
      acstartTime:"",
      acendTime:"",
      acThreshold:"",
      acBonus:"",
      acState:"0",
      accredit:""
    },
    src:"",
    notice_status: false,
    isAgree: false,
    sdate: formate_data(myDate),
    edate: formate_data(myDate),
    stime: '09:00',
    etime: '09:00',
    showTopTips: false,
    TopTips: '',
    noteMaxLen: 200,//备注最多字数
    noteNowLen: 0,//备注当前字数
    types: ["公益", "游戏", "运动", "旅行", "阅读", "竞赛", "电影", "音乐", "其他"],
    typeIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data)
    that = this;
    that.setData({//初始化数据
      isSrc: false,
      ishide: 0,
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
    app.slideright(this, 'slide', -400, 1);
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
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.slideright(this, 'slide', 400, 0);
  },
  /**
   * 自定义函数
   */
  //限制人数开启
  switch1Change: function (e) {
    if (e.detail.value == false) {
      this.setData({
        peopleHide: false
      })
    } else if (e.detail.value == true) {
      this.setData({
        peopleHide: true
      })
    }
  },
  //限制积分开启
  switch2Change: function (e) {
    if (e.detail.value == false) {
      this.setData({
        creditHide: false
      })
    } else if (e.detail.value == true) {
      this.setData({
        creditHide: true
      })
    }
  },
  bindDateChange1: function (e) {
    this.setData({
      edate: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    this.setData({
      edate: e.detail.value
    })
  },
  //改变时分
  bindTimeChange1: function (e) {
    this.setData({
      stime: e.detail.value
    })
  },
  bindTimeChange2: function (e) {
    this.setData({
      etime: e.detail.value
    })
  },
  //类型
  bindTypeChange: function(e){
    this.setData({
      typeIndex: e.detail.value
    })
  },
  
  //同意相关条例
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length,
      showInput: !this.data.showInput
    });
  },
  tapNotice: function (e) {
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

  //字数改变触发事件
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      content: value, 
      noteNowLen: len
    })
  },

  //活动图片选择
  uploadPic: function (res) {//选择图标
  var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        that.setData({
          isSrc: true,
          src: res.tempFilePaths[0]
        })
        console.log("图片：：" + src);
      }
    })
  },
  //删除图片
  clearPic: function () {//删除图片
    that.setData({
      isSrc: false,
      src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557941134694&di=3f8957456fde40982e5d0efc3643249a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201706%2F06%2F20170606171105_cdj83.png"
    })
  },

  //提交表单
  submitForm: function (e) {
    console.log("图片:" + src);

    console.log(e)
    var that = this;

    if (that.data.showInput == false) {
      wx.showModal({
        title: '提示',
        content: '请先阅读《发起须知》'
      })
      return;
    }
    
    var typeIndex = this.data.typeIndex;
    var acttype = 1 + parseInt(typeIndex);
    var acttypename = getTypeName(acttype); //获得类型名称

    this.setData({
      'formData.acTitle' : e.detail.value.title,
      'formData.acLocation': e.detail.value.location,
      'formData.acOrg': acttypename,
      'formData.acstartTime': that.data.sdate + "-" + that.data.stime,
      'formData.acendTime': that.data.edate + "-" + that.data.etime,
      'formData.acThreshold': e.detail.value.peoplenum == null ? '无上限' : e.detail.value.peoplenum,
      'formData.accredit': e.detail.value.creditnum == null ? '无门槛' : e.detail.value.creditnum,
      'formData.acBonus': e.detail.value.awardnum,
      'formData.acContent': e.detail.value.content,
      //'formData.acPic': that.data.src
    })
    console.log(this.data.formData)

    var url = app.globalData.domain + '/community/add'
    rq.requestPost(url, this.data.formData, this.successFunc)
  },

  successFunc:function(res){
    console.log(res)

    if(res.data.code===200){
      wx.showModal({
        title: '',
        content: '',
      })
    }
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

})

//根据活动类型获取活动类型名称
function getTypeName(acttype) {
  var acttypeName = "";
  if (acttype == 1) acttypeName = "公益";
  else if (acttype == 2) acttypeName = "游戏";
  else if (acttype == 3) acttypeName = "运动";
  else if (acttype == 4) acttypeName = "旅行";
  else if (acttype == 5) acttypeName = "阅读";
  else if (acttype == 6) acttypeName = "竞赛";
  else if (acttype == 7) acttypeName = "电影";
  else if (acttype == 8) acttypeName = "音乐";
  else if (acttype == 9) acttypeName = "其他";
  return acttypeName;
}
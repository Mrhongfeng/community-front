const rq = require('../../utils/request.js');
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
    s : "",
    userInfo: null,
    valida: "",
    cout: 0,
    navigateData: {
      userid: '',
      usertype: '',

    },
    affairsList: [],
    list: "",
    //search文本
    inputShowed: false,//初始不显示
    inputVal: "",//search输入
    //tab标签
    tab: ['进行中','已结束','已报名'],
    current: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function() {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    app.slideright(this, 'slide', -400, 1);
    if(typeof this.getTabBar=='function' && this.getTabBar()){
      this.getTabBar().setData({
        selected: 0
      })
    }
    //app.coolsite360.onShow(this);
    if (this.data.cout == 0) {
      this.loadaffairs();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    app.slideright(this, 'slide', 400, 0);
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function (e) {

    var that = this
    that.setData({
      cout: 0
    })
    wx.reLaunch({
      url: 'index',
    })
    wx.stopPullDownRefresh()
  },


/*以下为自定义点击事件*/
  /*search文本进入编辑态*/
  showInput: function () {
    this.setData({
      inputShowed: true//文本框可输入
    });
  },
  hideInput: function () {
    this.setData({
      inputShowed: false//文本框不可输入
    });
  },
  goSearch: function () {
    this.loadaffairs();//点击搜索，展示活动搜索结果
  },
  getVal: function (e) {
    //获取输入的搜索条件    
    this.setData({
      inputVal : e.detail.value
    });
  },
  /* 加载活动 */
  loadaffairs: function (e) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    })
    //初始显示
    let index=0;
    if(e!=undefined){//发生了点击tab选择栏事件，
      index = e.currentTarget.dataset.index
    }
    this.setData({
      current: index,
      affairsList: [
        // {
        //   name:'哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或',
        //   actid: '100',
        //   imgurl:'../../images/myself_false.png',
        //   start_time: '2019-04-01',
        //   end_time: '2019-04-02',
        // },
      ],
    });
    var that = this;
    var formatDa = rq.requestFormat(JSON.stringify(this.data.s))
    var url = app.globalData.domain + '/community/list'
    rq.requestBase(url,formatDa ,this.successFunc)
  },
  //详情浏览
  showDetail: function(e){
    console.log(e)
    this.setData({
      valida : e.currentTarget.id,
    })
    wx.navigateTo({
      url: '../details/showDetails?id=' + e.currentTarget.id,
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

  onReachBottom: function () {
    var that = this
    that.setData({
      "pagination.current": that.data.pagination.current + 1
    });
  },

  searchClick: function (e) {
    wx.navigateTo({
      url: '../searchDetail/searchDetail',
    })
  },

  onGotUserInfo: function (e) {
    console.log(e)
    console.log(e.detail.userInfo)
    console.log(e.detail.rawData)

  },
  gotToindex: function () {
    var that = this;
    that.setData({
      showPlayer: false
    })
  },
  handlecontact: function (e) {

  },
  confirmEvent: function (e) {

  },


})

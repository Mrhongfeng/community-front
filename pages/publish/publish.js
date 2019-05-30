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
      // aclimitBonus:""
    },

    notice_status: false,
    accounts: ["微信号", "QQ号", "手机号"],
    accountIndex: 0,
    peopleHide: false,
    creditHide: false,
    isAgree: false,
    sdate: formate_data(myDate),
    edate: formate_data(myDate),
    stime: '09:00',
    etime: '09:00',
    address: '点击选择位置',
    longitude: 0, //经度
    latitude: 0,//纬度
    showTopTips: false,
    TopTips: '',
    noteMaxLen: 200,//备注最多字数
    content: "",
    noteNowLen: 0,//备注当前字数
    types: ["公益", "游戏", "运动", "旅行", "阅读", "竞赛", "电影", "音乐", "其他"],
    typeIndex: "0",
    showInput: false,//显示输入真实姓名,
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
    console.log(this.data)
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

  //上传活动图片
  uploadPic: function () {//选择图标
    wx.chooseImage({
      count: 1, // 默认9
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

  //上传活动群二维码
  uploadCodePic: function () {//选择图标
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],//压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isCodeSrc: true,
          codeSrc: tempFilePaths
        })
      }
    })
  },

  //删除活动群二维码
  clearCodePic: function () {
    that.setData({
      isCodeSrc: false,
      codeSrc: ""
    })
  },

  //限制人数
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
  //限制人数
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
  //选择地点
  addressChange: function (e) {
    this.addressChoose(e);
  },
  addressChoose: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.name,
          longitude: res.longitude, //经度
          latitude: res.latitude,//纬度
        })
        if (e.detail && e.detail.value) {
          this.data.address = e.detail.value;
        }
      },
      fail: function (e) {
      },
      complete: function (e) {
      }
    })
  },

  //改变联系方式
  bindAccountChange: function (e) {
    this.setData({
      accountIndex: e.detail.value
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

    var switchHide = e.detail.value.switchHide;
    var peoplenum = e.detail.value.peoplenum;

    //------发布者真实信息------
    var realname = e.detail.value.realname;
    var contactindex = this.data.accountIndex;
    this.setData({
      'formData.acTitle' : e.detail.value.title,
      'formData.acLocation': e.detail.value.location,
      'formData.acOrg': acttypename,
      'formData.acstartTime': that.data.sdate + "/" + that.data.stime,
      'formData.acendTime': that.data.edate + "/" + that.data.etime,
      'formData.acThreshold': e.detail.value.peoplenum,
      // 'formData.aclimitBonus' :
      // 'formData.acBonus':
      'formData.acContent': e.detail.value.content
    })
    console.log(this.data.formData)
    if (contactindex == 0) {
      var contactWay = "微信号";
    } else if (contactindex == 1) {
      var contactWay = "QQ号";
    } else if (contactindex == 2) {
      var contactWay = "手机号";
    }
    var contactValue = e.detail.value.contactValue;
    var wxReg = new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$");
    var qqReg = new RegExp("[1-9][0-9]{4,}");
    var phReg = /^1[34578]\d{9}$/;
    var nameReg = new RegExp("^[\u4e00-\u9fa5]{2,4}$");
    //先进行表单非空验证
    if (this.data.formData.acTitle == ""){
      this.setData({
        showTopTips: true,
        TopTips: '请输入活动名称'
      });
      app.fade(this, 'fade', 0.8);
      setTimeout(function () {
        app.fade(that, 'fade', 0);
      }, 1500);
    } else if (this.data.formData.acLocation == "") {
      this.setData({
        showTopTips: true,
        TopTips: '请输入活动地点'
      });
      app.fade(this, 'fade', 0.8);
      setTimeout(function () {
        app.fade(that, 'fade', 0);
      }, 1500);
    } else if (switchHide == true && peoplenum == "") {
      this.setData({
        showTopTips: true,
        TopTips: '请输入人数'
      });
    } else if (this.data.formData.acContent == "") {
      this.setData({
        showTopTips: true,
        TopTips: '请输入活动内容'
      });
    }else {
      console.log('校验完毕');
      that.setData({
        isLoading: true,
        isdisabled: true
      })
      //向 Events 表中新增一条数据
      wx.getStorage({
        key: 'user_id',
        success: function (ress) {
          var Diary = Bmob.Object.extend("Events");
          var diary = new Diary();
          var me = new Bmob.User();
          me.id = ress.data;
          diary.set("title", title);
          diary.set("endtime", endtime);
          diary.set("acttype", acttype + "");
          diary.set("isShow", 1);
          diary.set("address", address);
          diary.set("longitude", longitude);//经度
          diary.set("latitude", latitude);//纬度\
          if (that.data.peopleHide) { //如果设置了人数
            diary.set("peoplenum", peoplenum);
          } else if (!that.data.peopleHide) {
            diary.set("peoplenum", "-1");
          }
          diary.set("content", content);
          diary.set("publisher", me);
          diary.set("likenum", 0);
          diary.set("commentnum", 0);
          diary.set("liker", []);
          diary.set("joinnumber", 0); //发布后初始加入人数为0
          diary.set("joinArray", []);
          if (that.data.isSrc == true) {
            var name = that.data.src; //上传图片的别名
            var file = new Bmob.File(name, that.data.src);
            file.save();
            diary.set("actpic", file);
          }
          //新增操作
          diary.save(null, {
            success: function (result) {
              //活动扩展表中添加一条记录
              var Diary = Bmob.Object.extend("EventMore");
              var query = new Diary();
              var Events = Bmob.Object.extend("Events");
              var event = new Events();
              event.id = result.id;
              query.set("Status", 0);
              query.set("Statusname", "准备中");
              query.set("event", event);
              //如果上传了群二维码
              if (that.data.isCodeSrc == true) {
                var name = that.data.codeSrc; //上传图片的别名
                var file = new Bmob.File(name, that.data.codeSrc);
                file.save();
                query.set("qrcode", file);
              }
              query.save();

              //再将发布者的信息添加到联系表中
              wx.getStorage({
                key: 'user_id',
                success: function (ress) {
                  var Contacts = Bmob.Object.extend("Contacts");
                  var contact = new Contacts();
                  var Events = Bmob.Object.extend("Events");
                  var event = new Events();
                  event.id = result.id;
                  var me = new Bmob.User();
                  me.id = ress.data;
                  contact.set("publisher", me); //发布人是自己
                  contact.set("currentUser", me); //参加的人也是自己
                  contact.set("event", event);
                  contact.set("realname", realname);
                  contact.set("contactWay", contactWay);
                  contact.set("contactValue", contactValue);
                  contact.save();
                },
              })

              console.log("发布成功,objectId:" + result.id);
              that.setData({
                isLoading: false,
                isdisabled: false,
                eventId: result.id,
              })
              //添加成功，返回成功之后的objectId(注意，返回的属性名字是id,而不是objectId)
              common.dataLoading("发起成功", "success", function () {
                //重置表单
                that.setData({
                  title: '',
                  typeIndex: 0,
                  address: '点击选择位置',
                  longitude: 0, //经度
                  latitude: 0,//纬度
                  data: formate_data(myDate),
                  isHide: true,
                  peoplenum: 0,
                  peopleHide: false,
                  isAgree: false,
                  accountIndex: 0,
                  realname: "",
                  content: "",
                  contactValue: '',
                  noteNowLen: 0,
                  showInput: false,
                  src: "",
                  isSrc: false,
                  codeSrc: "",
                  isCodeSrc: false

                })
              });
            },
            error: function (result, error) {
              //添加失败
              console.log("发布失败=" + error);
              common.dataLoading("发起失败", "loading");
              that.setData({
                isLoading: false,
                isdisabled: false
              })
            }
          })
        },
      })
    }

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

  // title:function(e){
  //   this.setData({
  //     'formData.acTitle': e.detail.value,
  //   })
  //   //console.log(this.data.formData.acTitle)
  // },

  // location:function(e){
  //   this.setData({
  //     'formData.acLocation': e.detail.value,
  //   })
  // },

  //改变活动类别
  // bindTypeChange: function (e) {
  //   this.setData({
  //     'formData.acOrg': e.detail.value
  //   })
  // },

  //改变时间
  // bindDateChange1: function (e) {
  //   this.setData({
  //     'formData.acStartTime': e.detail.value
  //   })
  // },

  bonus:function(e){
    this.setData({
      'formData.acBonus': e.detail.value
    })
  },


})

//根据活动类型获取活动类型名称
function getTypeName(acttype) {
  var acttypeName = "";
  if (acttype == 1) acttypeName = "运动";
  else if (acttype == 2) acttypeName = "游戏";
  else if (acttype == 3) acttypeName = "交友";
  else if (acttype == 4) acttypeName = "旅行";
  else if (acttype == 5) acttypeName = "读书";
  else if (acttype == 6) acttypeName = "竞赛";
  else if (acttype == 7) acttypeName = "电影";
  else if (acttype == 8) acttypeName = "音乐";
  else if (acttype == 9) acttypeName = "其他";
  return acttypeName;
}
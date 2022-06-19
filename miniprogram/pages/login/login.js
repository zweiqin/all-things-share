const db = wx.cloud.database();
const app = getApp();
const config = require("../../config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ids: -1,
    wxnum: '',
    qqnum: '',
    email: '',
    checked: false,
    campus: JSON.parse(config.data).campus,
    sbwx: '......'
  },

  onLoad() {
    if (app.sbwx == undefined) {
      let that = this;
      db.collection('htmltext').where({
        url: -2
      }).get({
        success: function (res) {
          // console.log('执行了', res)
          that.setData({
            sbwx: res.data[0].htmltext
          })
          app.sbwx = res.data[0].htmltext
        }
      })
    } else {
      this.setData({
        sbwx: app.sbwx
      })
    }
  },

  onChange(event) {
    // console.log('执行了onChange', event)
    if (event.detail == true) {
      wx.requestSubscribeMessage({
        tmplIds: ['改为你的', '改为你的'], //这里填入我们生成的模板id
        success(res) {
          // console.log('授权成功', res)
        },
        fail(res) {
          // console.log('接口调用失败', res)
          this.setData({
            checked: false,
          });
          return false;
        }
      })
    }
    this.setData({
      checked: event.detail,
    });
  },

  choose(e) {
    let that = this;
    that.setData({
      ids: e.detail.value
    })
    //下面这种办法无法修改页面数据
    /* this.data.ids = e.detail.value;*/
  },
  wxInput(e) {
    this.data.wxnum = e.detail.value;
  },
  qqInput(e) {
    this.data.qqnum = e.detail.value;
  },
  emInput(e) {
    this.data.email = e.detail.value;
  },
  getUserProfile(e) {
    // console.log("打印e", e);
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        let that = this;
        // console.log("执行了success", res);
        that.setData({
          userInfo: res.userInfo,
        });
        that.check();
      },
      fail: (res) => {
        // console.log("执行了fail", res); //res.errMsg: "getUserProfile:fail auth deny"
        wx.showToast({
          title: '请授权后方可使用',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },
  //校检
  check() {
    let that = this;
    //校检地区
    let ids = that.data.ids;
    let campus = that.data.campus;
    if (ids == -1) {
      wx.showToast({
        title: '请先获取您的地区',
        icon: 'none',
        duration: 2000
      });
    }
    // 检验授权选项
    let event = that.data.checked;
    if (event == false) {
      wx.showToast({
        title: '请授权订单提醒',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    //校检邮箱
    let email = that.data.email;
    if (!(/^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(email))) {
      wx.showToast({
        title: '请输入常用邮箱',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    //校检QQ号
    let qqnum = that.data.qqnum;
    if (qqnum !== '') {
      if (!(/^\s*[.0-9]{5,11}\s*$/.test(qqnum))) {
        wx.showToast({
          title: '请输入正确QQ号',
          icon: 'none',
          duration: 2000
        });
        return false;
      }
    }
    //校检微信号
    let wxnum = that.data.wxnum;
    if (wxnum !== '') {
      if (!(/^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(wxnum))) {
        wx.showToast({
          title: '请输入正确微信号',
          icon: 'none',
          duration: 2000
        });
        return false;
      }
    }

    wx.showLoading({
      title: '正在提交',
    })
    db.collection('user').add({
      data: {
        // phone: that.data.phone,
        campus: that.data.campus[that.data.ids],
        qqnum: that.data.qqnum,
        email: that.data.email,
        wxnum: that.data.wxnum,
        stamp: new Date().getTime(),
        info: that.data.userInfo,
        useful: true,
        parse: 0,
      },
      success: function (res) {
        // console.log(res)
        db.collection('user').doc(res._id).get({
          success: function (res) {
            app.userinfo = res.data;
            app.openid = res.data._openid;
            wx.navigateBack({})
          },
        })
      },
      fail() {
        wx.hideLoading();
        wx.showToast({
          title: '注册失败，请重新提交',
          icon: 'none',
        })
      }
    })
  },
  //获取授权的点击事件
  shouquan() {
    wx.requestSubscribeMessage({
      tmplIds: ['改为你的', '改为你的'], //这里填入我们生成的模板id
      success(res) {
        // console.log('授权成功', res)
      },
      fail(res) {
        // console.log('授权失败', res)
      }
    })
  },
})
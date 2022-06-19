const app = getApp()

Page({
  data: {
    avatarUrl: '../../../images/avator.png',
    userInfo: null,
    logged: false,
    takeSession: false,
    requestResult: '',
    chatRoomEnvId: '改为你的',
    chatRoomCollection: 'chatroom',
    chatRoomGroupId: '',
    chatRoomGroupName: '聊天室',
    // functions for used in chatroom components
    onGetUserProfile: null,
    getOpenID: null,
  },

  onLoad: function (opentions) {
    // 获取用户信息
    // console.log(app)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) { // 已经授权
          if (app.userinfo) {
            // console.log("this指向", this)
            this.setData({
              avatarUrl: app.userinfo.info.avatarUrl,
              userInfo: app.userinfo.info
            })
          }
        }
      }
    })
    // console.log("this指向", this)
    this.setData({
      onGetUserProfile: this.onGetUserProfile,
      getOpenID: this.getOpenID,
      chatRoomGroupId: opentions.id
    })
    wx.getSystemInfo({
      success: res => {
        // console.log('system info', res)
        if (res.safeArea) {
          const {
            top,
            bottom
          } = res.safeArea
          this.setData({
            containerStyle: `padding-top: ${(/ios/i.test(res.system) ? 10 : 20) + top}px; padding-bottom: ${20 + res.windowHeight - bottom}px`,
          })
        }
      },
    })
  },

  getOpenID: async function () {
    if (app.openid) {
      return app.openid
    }
    const {
      result
    } = await wx.cloud.callFunction({
      name: 'login',
    })
    return result.openid
  },

  onGetUserProfile: function (e) {
    let that = this;
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        if (!that.logged && res.userInfo) {
          that.setData({
            logged: true,
            avatarUrl: res.userInfo.avatarUrl,
            userInfo: res.userInfo
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '请授权后方可使用',
          icon: 'none',
          duration: 2000
        });
      }
    })
  },

  onShareAppMessage() {
    return {
      title: '聊天室',
      path: '/pages/detail/room/room',
    }
  },

  go() {
    wx.navigateTo({
      url: '/pages/message/message',
    })
  }
})
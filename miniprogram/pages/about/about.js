// pages/about/about.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmltextReward: '',
    imgs1: [{
      url: 'tao.jpg',
      name: '一生好运',
      id: "0"
    },
    ],
    des: '随着人们节约环保的消费意识的增强，在商品极丰富的社会环境里，共享物品交易市场迅速发展。由于大部分人的消费金额限制、及其节约意识的增强，给予闲置物品共享交易市场巨大的发展空间。然而经过观察发现，当前社会上的共享交易市场缺乏一个可靠实用的共享交易平台。考虑到微信小程序，方便快捷即用即走，速度快，安全性强等的优点，故这里选择它作为交易平台。\n注意：\n本微信小程序只是提供物品交易的平台，不涉及金钱交易！主要服务于社会上的青年人。'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    db.collection('htmltext').where({
      url: -1
    }).get({
      success: function (res) {
        // console.log('执行了', res)
        that.setData({
          htmltextReward: res.data[0].htmltext
        })
      }
    })
    // 在页面中定义插屏广告
    let interstitialAd = null
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: '......'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
      })
    }
  },

  //图片点击事件
  img: function (event) {
    let arr = [];
    arr.push(this.data.htmltextReward)
    wx.previewImage({
      current: 'current', // 当前显示图片的http链接
      urls: arr // 需要预览的图片http链接列表
    })
  },
  onReady: function () {

  },
  //复制
  copy(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy,
      success: res => {
        wx.showToast({
          title: '复制' + e.currentTarget.dataset.name + '成功',
          icon: 'success',
          duration: 1000,
        })
      }
    })
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
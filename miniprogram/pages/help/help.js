var app = getApp();
var db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [{
      title: '小程序会插入广告吗？',
      id: 0,
      des: ['本小程序无广告，但是对于本程序的正常运行，成本支出也是存在的，故不排除后续插入广告的可能', '小程序完全公益，不存在盈利目的，即使后续插入广告，也仅仅是为了本小程序的正常运行，望理解'],
      check: true,
    }, {
      title: '该程序收费吗？',
      id: 1,
      des: ['本程序是完全的公益项目，永久承诺不收取任何中介费，您可以随心所欲的发布自己的闲置物品和购买。如过您觉得本小程序不错，欢迎各位支持打赏作者，请我们喝阔落。'],
      check: false,
    }, {
      title: '该程序是做什么的？',
      id: 2,
      des: ['本程序主要是方便大家发布自己不要了的或想要分享的物品。',
        '如果您是开发者，有兴趣的话可以访问【关于程序】页面，根据说明给自己也部署一个'
      ],
      check: false,
    }, {
      title: '本程序的通知形式？',
      id: 3,
      des: ['对于买家下单时，我们通过微信服务消息通知和邮件发送订单信息给卖家，通知与您联系完成交易', '当交易状态中途取消时，也会通过微信服务信息通知于您', '您也可以在订单详情页面通过买（卖）家留下的联系方式第一时间联系，这样更能提高效率'],
      check: false,
    },
    {
      title: '为什么要留下联系方式？',
      id: 4,
      des: ['本程序交易完全由交易双方沟通。', '除非程序出现问题导致交易故障，平台不参与任何交易'],
      check: false,
    }, {
      title: '小程序发现异常（bug）怎么办？',
      id: 5,
      des: ['点击客服加群反馈，会有专人为您服务。您还可以向作者提出意见或者建议，作者会争取将小程序做得更好！！！希望作者能够打造一个完美的改为你的交易平台。'],
      check: false,
    },
    ]
  },
  onReady() { },

  show(e) {
    var that = this;
    let ite = e.currentTarget.dataset.show;
    let list = that.data.list;
    if (!ite.check) {
      list[ite.id].check = true;
    } else {
      list[ite.id].check = false;
    }
    that.setData({
      list: list
    })
  },
  //跳转页面
  go(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.go
    })
  },
  onLoad() {

  },

})
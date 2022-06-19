var data = {
  env: '改为你的',
  share_title: '改为你的交易平台',
  share_img: '/images/poster.jpg', //可以是网络地址，本地文件路径要填绝对位置
  share_poster: '改为你的',//必须为网络地址
  kefu: {
    qq: '1836832455',
    weixin: '客服微信：改为你的',
    phone: '88888888888'
  },
  //可以是网络地址，本地文件路径要填绝对位置
  bgurl: '改为你的',
  campus: [{
    name: '华北',
    id: 0
  },
  {
    name: '华南',
    id: 1
  },
  {
    name: '华东',
    id: 2
  },
  {
    name: '华中',
    id: 3
  },
  {
    name: '西北',
    id: 4
  },
  {
    name: '西南',
    id: 5
  },
  {
    name: '东北',
    id: 6
  }
  ],
  college: [{
    name: '通用',
    id: -1
  },
  {
    name: '学习用品',
    id: 0
  },
  {
    name: '日用品',
    id: 1
  },
  {
    name: '装饰品',
    id: 2
  },
  {
    name: '衣物',
    id: 3
  },
  {
    name: '运动器材',
    id: 4
  },
  {
    name: '化妆品',
    id: 5
  },
  {
    name: '其他',
    id: 6
  },
  ],
}

function formTime(creatTime) {
  let date = new Date(creatTime),
    Y = date.getFullYear(),
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  if (M < 10) {
    M = '0' + M;
  }
  if (D < 10) {
    D = '0' + D;
  }
  if (H < 10) {
    H = '0' + H;
  }
  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  return Y + '-' + M + '-' + D + ' ' + H + ':' + m + ':' + s;
}
function days() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  if (month < 10) {
    month = '0' + month;
  }
  if (day < 10) {
    day = '0' + day;
  }
  let date = year + "" + month + day;
  return date;
}
module.exports = {
  data: JSON.stringify(data),
  formTime: formTime,
  days: days
}
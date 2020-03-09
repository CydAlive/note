const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1'
let ajaxnum = 0

function request(options) {
  ajaxnum++
  wx.showLoading({
    title: '加载中',
    mask: true
  });

  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      data: options.data,
      success: res => {
        resolve(res.data)
      },
      fail: err => {
        console.log(err);
      },
      complete: () => {
        ajaxnum--
        if(ajaxnum === 0) wx.hideLoading()
      }
    })
  })
}
export default request
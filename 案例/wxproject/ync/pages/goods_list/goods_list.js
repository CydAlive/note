import request from "../../network/request.js";
// pages/goods_list/goods_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        name: '销量',
        isActive: true
      },
      {
        id: 1,
        name: '价格',
        isActive: false
      },
      {
        id: 2,
        name: '排名',
        isActive: false
      }
    ],
    goodsList: []
  },
  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  // 总页数
  totalPages: 1,
  // 获取商品列表数据
  getGoodsList() {
    request({
      url: "/goods/search",
      data: this.QueryParams
    }).then(res => {
      // 获取 总条数
      var res = res.message
      const total = res.total;
      // 计算总页数
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
      this.setData({
        // 拼接了数组
        goodsList: [...this.data.goodsList, ...res.goods]
      })
    })

    // 关闭下拉刷新的窗口 如果没有调用下拉刷新的窗口 直接关闭也不会报错  
    wx.stopPullDownRefresh();

  },
  handTabsCilck(e) {
    let {
      tabs
    } = this.data
    let {
      index
    } = e.detail
    console.log(tabs);
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  // 页面上滑 滚动条触底事件
  onReachBottom() {
    //  1 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // 没有下一页数据
      //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      wx.showToast({
        title: '没有下一页数据'
      });
      console.log('no');

    } else {
      // 还有下一页数据
      //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      this.getGoodsList();
      console.log('yes');
    }
  },
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryParams.pagenum = 1 
    this.getGoodsList()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || "";
    this.QueryParams.query = options.query || "";
    this.getGoodsList();
  }
})
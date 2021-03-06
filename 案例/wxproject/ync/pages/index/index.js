import request from "../../network/request.js";
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    navList: [],
    loopList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList()
    this.getNavList()
    this.getLoopList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  //获取轮播图数据
  getSwiperList() {
    request({
      url:'/home/swiperdata'
    }).then(res => {
      this.setData({
        swiperList: res.message
      })
    })
  },
  //获取顶部导航数据
  getNavList() {
    request({
      url:'/home/catitems'
    }).then(res => {
      console.log(res);
      this.setData({
        navList: res.message
      })
    })
  },
  //获取楼层数据
  getLoopList() {
    request({
      url:'/home/floordata'
    }).then(res => {
      console.log(res);
      this.setData({
          loopList: res.message
      })
    })
  }
})
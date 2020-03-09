// pages/goods_detail/goods_detail.js
import request from "../../network/request.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {goods_id} = options
    this.getGoodsData(goods_id)
  },
  getGoodsData(goods_id) {
    request({
      url: '/goods/detail',
      data: {goods_id}
    }).then(res => {
      this.setData({
        shopData: {
          goods_name: res.message.goods_name,
          goods_price: res.message.goods_price,
          goods_introduce: res.message.goods_introduce,
          pics: res.message.pics,
          goods_id: res.message.goods_id
        }
      })
    })  
  },
  handImage(e) {
    let current = e.currentTarget.dataset.url
    let urls = this.data.shopData.pics.map(v => v.pics_mid)
    console.log(urls);
    wx.previewImage({
      current,
      urls
    });
      
  },
  handgm() {
    let store = wx.getStorageSync('cart') || [];
    var index = store.findIndex(v => v.goods_id === this.data.shopData.goods_id)
    console.log(index);
    if(index === -1){
      this.data.shopData.num = 1
      this.data.shopData.check = true
      store.push(this.data.shopData)
    }else{
      store[index].num++
    }
    console.log(store);
    wx.setStorageSync('cart', store);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    });
      
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

  }
})
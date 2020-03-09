// pages/category/category.js
import request from '../../network/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countData:[],
    leftList:[],
    rightListData:[],
    activeList: 0,
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const countData = wx.getStorageSync("countData");
    if(!countData) {
      this.setCategoryData()
    }else{
      const {data: newdata} = countData
      let leftList = newdata.map(v=> v.cat_name)
      let rightListData = newdata[0].children
      this.setData({
        countData: newdata,
        leftList,
        rightListData
      })
      console.log(this.data.countData);
    }
      
  },
  cilckItem(e) {
    console.log(e.currentTarget.dataset);
    const {index} = e.currentTarget.dataset
    let rightListData = this.data.countData[index].children
    this.setData({
      rightListData,
      activeList: index,
      scrollTop: 0
    })
  },
  setCategoryData() {
    request({
      url:'/categories'
    }).then(res => {
      console.log('setCategoryData被调用了');
      let countData = res.message
      wx.setStorageSync('countData', {time: Date.now(), data: countData});
      let leftList = countData.map(v=> v.cat_name)
      let rightListData = countData[0].children

      this.setData({
        countData,
        leftList,
        rightListData
      })
    })
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
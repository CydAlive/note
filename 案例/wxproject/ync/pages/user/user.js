// pages/user/index.js
Page({
  data: {
    userinfo:{}
  },
  handleGetUserInfo(e) {  
    let userinfo = e.detail.userInfo
    this.setData({
      userinfo 
    })
    wx.setStorageSync("userinfo", userinfo);
  },
  onShow(){
    const userinfo=wx.getStorageSync("userinfo");   
    this.setData({
      userinfo
    });    
  }
})
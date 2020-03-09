// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    total: 0,
    money: 0
  },
  cartChange(cart) {
    let address = wx.getStorageSync("address");
    let total = 0
    let money = 0
    cart.forEach(v => {
        money += v.goods_price * v.num
        total += v.num
    })
    console.log(address);
    this.setData({
      address,
      cart,
      total,
      money
    })
  },
  handlePay() {
    console.log("pay");
  },
  onShow() {
    let cart = wx.getStorageSync("cart") || []
    this.cartChange(cart)
  }
})
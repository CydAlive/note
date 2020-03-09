// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allCheck: false,
    total: 0,
    money: 0
  },
  triggerJoinAddress() {
    wx.getSetting({
      success: (result) => {
        console.log(result);
        let flag = result.authSetting["scope.address"]
        if (flag === false) {
          wx.openSetting();
        }
        wx.chooseAddress({
          success: (result) => {
            console.log(result);
            result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo
            wx.setStorageSync('address', result);
          }
        });
      }
    });
  },
  handelCheckitem(e) {
    let id = e.currentTarget.dataset.id
    let cart = wx.getStorageSync("cart");
    let index = cart.findIndex(v => v.goods_id === id)
    console.log(index);
    cart[index].check = !cart[index].check
    this.cartChange(cart)
    wx.setStorageSync("cart", cart);
  },
  handelCheckAll() {
    let {cart,allCheck} = this.data
    cart.forEach(v => v.check = !allCheck)
    this.cartChange(cart)
    wx.setStorageSync("cart", cart);
  },
  handelChangeNum(e) {
    let {id, status} = e.currentTarget.dataset
    let {cart} = this.data
    console.log(id);
    let index = cart.findIndex(v => v.goods_id === id)
    console.log(index);
    if(cart[index].num === 1 && status === -1){
      wx.showModal({
        content: '是否删除？',
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定')
            cart.splice(index,1)
            this.cartChange(cart)
            wx.setStorageSync('cart', cart);
          }
        }
      })       
    }else{
      cart[index].num += status
      this.cartChange(cart) 
      wx.setStorageSync('cart', cart);   
    }
    
  },
  cartChange(cart) {
    let address = wx.getStorageSync("address");
    let allCheck = true
    let total = 0
    let money = 0
    cart.forEach(v => {
      if (v.check) {
        money += v.goods_price * v.num
        total += v.num
      } else {
        allCheck = false
      }
    })
    allCheck = cart.length ? allCheck : false
    console.log(address);
    this.setData({
      address,
      cart,
      allCheck,
      total,
      money
    })
  },
  handlePay() {
    if(!this.data.address){
      wx.showToast({
        title: '您还没有选择地址',
        icon: 'none'
      });
      return
    }
    if(this.data.total === 0){
      wx.showToast({
        title: '您还没有选择商品',
        icon: 'none'
      });
      return
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    });
  },
  onShow() {
    let cart = wx.getStorageSync("cart") || []
    this.cartChange(cart)
  }
})
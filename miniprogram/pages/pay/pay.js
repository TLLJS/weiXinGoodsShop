// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWX.js'
import { requests } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收货地址信息
    address: {},
    // 用户购物车的数据
    goodsLists: [],
    // 合计价格
    totalPrice: 0,
    // 购物车商品数
    total: 0,
  },
  // 点击支付按钮
  async handelzhifu() {
    try {
      //  判断缓存中是否存在token
      const token = wx.getStorageSync('token');
      if (!token) {
        wx.navigateTo({
          url: '/pages/auth/auth',
        })
      } else {
        // token存在创建订单
        // 准备请求头参数
        const header = { Authorization: token }
        let goodsLists = this.data.goodsLists;
        // 请求体参数
        let goods = goodsLists.map(item => {
          return {
            goods_id: item.goods_id,
            goods_number: item.num,
            goods_price: item.goods_price
          }
        })
        const params = {
          order_price: this.data.totalPrice,
          consignee_addr: this.data.address,
          goods
        }
        console.log(header, params)
        // 根据请求参数发送请求 获取订单编号
        const { data } = await requests({
          url: '/my/orders/create',
          data: params,
          header,
          method: 'POST'
        })
        // console.log(data)
        // 由于缺少账号无法获取订单编号，
        const bianhao = 123456789
        // 根据订单编号，发起预支付请求
        const res = await requests({
          url: '/my/orders/req_unifiedorder',
          header: { Authorization: token },
          data: { order_number: bianhao }
        })
        // console.log(res)
        // 根据返回值发起微信支付请求
        wx.requestPayment({
          timeStamp: '',
          nonceStr: '',
          package: '',
          signType: '',
          paySign: '',
          success: (result) => {
            // console.log(res)
          },
          fail: () => { },
          complete: () => { }
        });
        // 支付成功后，查看订单状态是否支付成功
        const result = await requests({
          url: '/my/orders/chkOrder',
          data: { order_number: bianhao },
          method: 'post',
          header
        })
        // 消息提示框
        wx.showToast({
          title: '支付成功'
          
        });
        // 支付成功后跳到订单页面
        wx.navigateTo({
          url: '/pages/order/order'
        });
        // console.log(result)
      }
      // 支付成功后，删除购物车中已经购买过得商品
     let newCar=wx.getStorageSync('cart');
     newCar= newCar.filter(item=>item.flag!==true);
    //  console.log(newCar)
     wx.setStorageSync('cart',newCar);
    } catch (error) {
      wx.showToast({
        title: '支付失败'
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 打开该页面，获取本地缓存中的地址信息和购物车的信息
    let infoAddress = wx.getStorageSync('address');
    let cartShop = wx.getStorageSync('cart');
    //  过滤出用户选中要购买的商品
    let cartShops = cartShop.filter(item => item.flag === true);
    console.log(cartShops)
    //  计算总价格
    let totalPrice = cartShops.reduce((pre, cur) => {
      return pre + cur.goods_price * cur.num
    }, 0)
    //计算总的商品个数
    let total = cartShops.reduce((pre, cur) => {
      return pre + cur.num
    }, 0)
    this.setData({
      goodsLists: cartShops,
      total,
      totalPrice,
      address: infoAddress
    })
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
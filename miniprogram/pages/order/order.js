// pages/order/order.js
import { requests } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 订单数据
    arrOrder:[],
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
  },
  // 处理子组件传递过来的数据
  handelChanges(e) {
    console.log(e.detail)
    let tabs = this.data.tabs;
    tabs.forEach((element, index) => {
      if (e.detail == index) {
        element.isActive = true
      } else {
        element.isActive = false
      }
    });
    // 点击时发送请求 先获取token
    let token=wx.getStorageSync('token');
    this.getOrders(e.detail+1,token)
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.type)
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
    // 获取所有的页面栈
    let pages = getCurrentPages();
    // 获取当前页面，在pages数组中的最后一个
    let currentPages = pages[pages.length - 1]
    console.log(currentPages.options)
    // 获取当前页面的参数
    const { type } = currentPages.options
    // 修改进入页面时激活的选中项
    let tabs=this.data.tabs;
    tabs.forEach(item=>{
      if(item.id+1===type-0){
        item.isActive=true
      }else{
        item.isActive=false
      }
    })
    this.setData({tabs})
    // 判断缓存中是否存在token值
    let token = wx.getStorageSync('token');
    if (!token) {
     wx.navigateTo({
       url: '/pages/auth/auth',
     });
     return
    }
    // 根据token值和type类型调用type
    this.getOrders(type,token)
  },
  // 获取订单的方法
  async getOrders(type,token) {
    const res = await requests({
      header: {
        Authorization: token
      },
      data: { type }
    })
    let arr=[{
      id:1,
      bianhao:1234567894564123,
      price:9999,
      date:'2019/12/12下午9:35:45'
    },{
      id:2,
      bianhao:1234567894564123,
      price:9999,
      date:'2019/12/12下午9:35:45'
    },{
      id:3,
      bianhao:1234567894564123,
      price:9999,
      date:'2019/12/12下午9:35:45'
    },
    {
      id:4,
      bianhao:1234567894564123,
      price:9999,
      date:'2019/12/12下午9:35:45'
    },
    {
      id:5,
      bianhao:1234567894564123,
      price:9999,
      date:'2019/12/12下午9:35:45'
    },
  ]
    this.setData({arrOrder:arr})
    console.log(res)
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
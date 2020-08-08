// pages/search/search.js
import { requests } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户输入的内容
    value: '',
    // 服务器返回的数据
    listInfo: []
  },
  // 用户输入时触发
  handelinput(e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value.trim()
    })

  },
  // 用户点击取消时
  handeldelete() {
    this.setData({
      value: '',
      listInfo: []
    })
  },
  // 用户输入完毕后，根据输入内容向服务器发送请求
  async blurhandel() {
    const res = await requests({
      url: '/goods/qsearch',
      data: {
        query: this.data.value
      }
    })
    console.log(res.data.message)
    if (res.data.message.length === 0) {
      wx.showToast({
        title: '当前无此商品',
        icon: 'none',
      });
    } 
      this.setData({
        listInfo: res.data.message
      })
    

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
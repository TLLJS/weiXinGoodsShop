// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 收藏的商品数据
    goods_list:[],
    tabs:[
      {
      id:0,
      value:'商品收藏',
      isActive:true
      },
      {
        id:1,
        value:'品牌收藏',
        isActive:false
      },
      {
        id:2,
        value:'店铺收藏',
        isActive:false
      },
      {
        id:3,
        value:'浏览足迹',
        isActive:false
      }
    ]
  },
  handelChanges(e){
    console.log(e.detail)
    let tabs=this.data.tabs;
    tabs.forEach((element,index) => {
      if(e.detail==index){
         element.isActive=true
      }else{
        element.isActive=false
      }
    });
    this.setData({
      tabs
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
    let goods_list=wx.getStorageSync('collectGoods')||[];
    this.setData({goods_list})
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
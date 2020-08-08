// pages/goods_detail/goods_detail.js
import {requests} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
      id:0,
      value:'综合',
      isActive:true
      },
      {
        id:1,
        value:'销量',
        isActive:false
      },
      {
        id:2,
        value:'价格',
        isActive:false
      }
    ],
    // 商品列表
    goods_list:[]
  },
  // 发送给服务器的查询参数
  queryParams:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  // 处理子组件传递过来的数据
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
  // 获取商品列表数据
  getGoodsList(){
    requests({url:'/goods/search',data:this.queryParams}).then(res=>{
      // console.log(res.data)
      // 获取总条数
      const total=res.data.message.total
      // 获取总页数
      this.totalPages=Math.ceil(total/this.queryParams.pagesize)
      let arrs=this.data.goods_list.concat(res.data.message.goods)
      this.setData({
        goods_list:arrs
      })
      // console.log(this.data.goods_list)
      wx.hideLoading();
    }).catch(err=>{
      console.log(err)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryParams.cid=options.cid
    this.getGoodsList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 下拉加载更多数据
    if(this.queryParams.pagenum>=this.totalPages){
      // 消息提示框
      wx.showToast({
        title: '没有更多数据了',
        
      });
    }else{
      this.queryParams.pagenum++;
      this.getGoodsList()
    }
  },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      // 重置数组列表数据
      goods_list:[]
    })
    // 重新设置页码
    this.queryParams.pagenum=1;
    // 重新发送请求
    this.getGoodsList()
    // 手动关闭下拉刷新
    wx.stopPullDownRefresh()
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
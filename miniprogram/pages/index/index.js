// pages/index/index.js
// 引入发送请求的方法
import {requests} from "../../request/index"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    swiperLists:[],
    // 导航栏数据
    navList:[],
    // 楼层详情数据
    floorsList:[]
  },
  //获取轮播图数据
getSswipDate(){
  requests({url:'/home/swiperdata'}).then(res=>{
  // console.log(res)
  this.setData({
    swiperLists:res.data.message
  })
}).catch(err=>{
  console.log(err)
})
},
 //获取楼层数据
 getFloorsDate(){
  requests({url:'/home/floordata'}).then(res=>{
  // console.log(res.data.message)
  this.setData({
    floorsList:res.data.message
  })
}).catch(err=>{
  console.log(err)
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
// 发送异步请求，获取轮播图数据
//  wx.request({
//       url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
//       success:(res)=>{
//         let {data}=res;
//         // 获取失败直接返回
//         if(data.meta.status!=200) return
//         this.setData({
//           swiperLists:data.message
//         })
//       }
//     })
// 自己封装的Promise发送请求
// 调用函数获取轮播图数据
this.getSswipDate()
// 调用函数获取楼层数据
this.getFloorsDate()
// 获取导航栏数据
  const {data}= await requests({url:'/home/catitems'})
// console.log(data)
  if(data.meta.status!==200) return
  this.setData({
    navList:data.message
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
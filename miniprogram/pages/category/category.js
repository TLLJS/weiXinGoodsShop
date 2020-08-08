// pages/category/category.js
import {requests} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧分类列表数据
    leftMenuList:[],
    // 右侧商品数据
    rightContent:[],
    // 返回的所有的数据
    Cates:[],
    // 被点击的左侧分类项
    currentIndex:0,
    // 设置右侧内容滚动条每次点击都从头开始
    scrollTop:0
  },
  // 点击左侧列表，切换右侧内容数据
  changeItems(e){
    // console.log(e.target.dataset.indexs)
    let indexItem=this.data.Cates[e.target.dataset.indexs].children
    this.setData({
      currentIndex:e.target.dataset.indexs,
      rightContent:indexItem,
      scrollTop:0
    })

  },
  // 跳转到商品详情页面
  switchPages(){},
  // 获取分类列表数据
getCategoryDate(){
  requests({url:'/categories'}).then(res=>{
    if(res.data.meta.status!==200) return
    this.setData({
      Cates:res.data.message
    })
    // 把数据存入到本地存储中
    wx.setStorageSync('cates', {time:+new Date(),datas:this.data.Cates});
    // 构造左侧的大菜单数据
    let leftMenuList=this.data.Cates.map(item=>item.cat_name)
    // 构造右侧的商品列表数据
    let rightContent=this.data.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
    // console.log(rightContent)
    // console.log(leftMenuList)
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用分类列表数据函数
    /*
      先判断一下本地存储中有没有旧的数据
      如果没有直接发送请求
      如果有数据并且没有过期，测试用该数据
    */
  //  获取本地存储的数据
   const Cates=wx.getStorageSync("cates");
    if(!Cates){
      this.getCategoryDate();
    }else{
      //有旧的数据，定义过期时间
      if(Date.now()-Cates.time>1000*10){
        // 超过10s重新发送请求
        this.getCategoryDate();
      }else{
        this.setData({
          Cates:Cates.datas
        })
         // 构造左侧的大菜单数据
        let leftMenuList=this.data.Cates.map(item=>item.cat_name)
        // 构造右侧的商品列表数据
        let rightContent=this.data.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    
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
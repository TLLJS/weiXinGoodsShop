// pages/goods_list/goods_list.js
import { requests } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 商品详情的数据
    goodsInfo: {},
    // 控制收藏按钮的颜色
    isActive: false
  },
  // 点击收藏按钮
  collects() {
    let collectGoods = wx.getStorageSync('collectGoods') || [];
    let isActive = !this.data.isActive;
    let id = this.data.goodsInfo.goods_id
    console.log(id)
    // 收藏把商品加入缓存中
    if (isActive) {
      collectGoods.push(this.data.goodsInfo)
      wx.setStorageSync("collectGoods", collectGoods);
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
      });

    } else {
      // 取消收藏时删除缓存中收藏的商品
      const index = collectGoods.findIndex(v => v.goods_id === id);
      collectGoods.splice(index, 1);
      wx.setStorageSync("collectGoods", collectGoods);
      wx.showToast({
        title: '取消收藏',
        icon: 'success',

      });
    }
    this.setData({ isActive })
  },
  // 点击加入购物车
  addCart() {
    // 获取本地缓存中购物车的数据
    let arr = wx.getStorageSync('cart') || [];
    let index = arr.findIndex(item => item.goods_id === this.data.goodsInfo.goods_id);
    //  判断数据是否是第一次加入
    if (index === -1) {
      this.data.goodsInfo.num = 1;
      arr.push(this.data.goodsInfo);
    } else {
      //  不是第一次加入
      arr[index].num++;
    }
    //  将数据保存到本地缓存中
    wx.setStorageSync('cart', arr);
    // 弹框提示用户
    wx.showToast({
      title: '加入购物车成功',
      icon: 'success',
      mask: true
    })

  },
  // 点击轮播图放大图片
  handerimage(e) {
    // 当前点击图片的链接
    // console.log(e.currentTarget.dataset.url)
    let list = this.data.goodsInfo.pics;
    let goods_list = list.map(item => item.pics_mid)
    wx.previewImage({
      urls: goods_list,
      current: e.currentTarget.dataset.url,
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
    // 获取页面栈数组
    const pages= getCurrentPages();
    const pagesCuenr=pages[pages.length-1]
    const options=pagesCuenr.options
     // 获取商品列表页传递过来的商品ID，根据ID值向服务器发送请求，获取商品的详细信息
    console.log(options.goods_id)
    requests({
      url: '/goods/detail',
      data: {
        goods_id: options.goods_id
      }
    }).then(res => {
      if (res.data.meta.status !== 200) {
        wx.showToast({
          title: '获取商品详情失败',
        })
      } else {
        console.log(res)
        // 将返回的商品详情中的部分数据保存到data中
        this.setData({
          goodsInfo: {
            goods_name: res.data.message.goods_name,
            goods_price: res.data.message.goods_price,
            goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),
            pics: res.data.message.pics,
            goods_id: res.data.message.goods_id,
            flag: true
          }
        })
        console.log(this.data.goodsInfo)
      }
    }).catch(err => {
      console.log(err)
    })
    // 获取缓存中收藏列表的数据
    const list = wx.getStorageSync("collectGoods")||[];
    let isActive=this.data.isActive
    if (list) {
      // console.log(list)
      const index = list.findIndex(v => v.goods_id ==options.goods_id)
      console.log(index)
      if(index!==-1){
        isActive=true
        this.setData({isActive})
      }
    }
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
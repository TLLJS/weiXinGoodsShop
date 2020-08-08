// pages/auth/auth.js
import {requests} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户信息
  handelgetUserInfo(e){
    console.log(e)
    const {encryptedData,rawData,iv,signature}=e.detail;
    // 获取小程序登陆成功之后的code
    wx.login({
      timeout:10000,
      success: (result)=>{
        console.log(result)
        const {code}=result
        let params={encryptedData,rawData,iv,signature,code}
        // 发送请求获取用户的token值
         requests({
          url: '/users/wxlogin',
          data: params,
          method: 'POST',
        }).then(result=>{
          // console.log(result.statusCode)
          let token='wewe34343';
          // 将获取到的token值保存到本地缓存中
          wx.setStorageSync('token', token);
          // 返回上个页面
          wx.navigateBack({
            delta: 1
          });
        });
      }
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
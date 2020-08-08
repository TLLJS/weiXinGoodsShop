// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ],
    // 用户选择的图片路径
    path: [],
    // 用户文本域输入的内容
    values: ''
  },
  // 上传成功后返回的图片路径
  filespath: [],
  // 监听用户的输入
  handelinput(e) {
    this.setData({
      values: e.detail.value
    })
  },
  // 用户提交时触发
  submits() {
    let values = this.data.values;
    let path = this.data.path
    if (!values.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: 'none',
        mask: true,
      });
      return
    }
    // 上传图片
    wx.showLoading({
      title: '正在上传',
      mask: true,

    });
    if (path.length === 0) {
      console.log("把文本内容和图片路径提交到后台")
       // 重置页面
       this.setData({
        values: ''
      })
      wx.navigateBack({
        delta: 1
      });
      wx.hideLoading();
    } else {
      path.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://images.ac.cn/Home/Index/UploadAction',
          filePath: v,
          name: "file",
          formData: {},
          success: (result) => {
            console.log(result)
            // 所有图片上传完毕后才触发
            if (i === path.length - 1) {
              console.log("把文本内容和图片路径提交到后台")
              wx.hideLoading();
              wx.showToast({
                title: '上传成功',
                icon: 'success',

              });
              // 重置页面
              this.setData({
                path: [],
                values: ''
              })
              wx.navigateBack({
                delta: 1
              });
            }
          },
        });
      })
    }

  },
  // 根据子组件传递过来的数据删除图片
  handels(e) {
    console.log(e.detail)
    let path = this.data.path;
    const index = path.findIndex(item => item === e.detail)
    path.splice(index, 1)
    this.setData({ path })
  },
  // 选择图片
  handelbtn() {
    let path = this.data.path
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        console.log(result.tempFilePaths)

        this.setData({
          path: path.concat(result.tempFilePaths)
        })
      }
    });
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
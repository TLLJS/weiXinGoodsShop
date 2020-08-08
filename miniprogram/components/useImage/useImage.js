// components/useImage/useImage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    path: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 删除用户点击的图片
    handeldelete(e) {
      console.log(e.target.dataset.str)
      this.triggerEvent('deletes',e.target.dataset.str)
    }
  }
})

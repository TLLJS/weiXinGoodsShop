// pages/cart/cart.js
import {getSetting,chooseAddress,openSetting} from '../../utils/asyncWX.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 控制收货地址的显示与隐藏
    flag:true,
    // 收货地址信息
    address:{},
    // 用户购物车的数据
    goodsLists:[],
    // 合计价格
    totalPrice:0,
    // 购物车商品数
    total:0,
    // 控制底部全选框
    botFlag:false,
    // 控制结算按钮跳转
    nav:false
  },
  // 点击结算按钮
  handeljiesuna(){
    let goodsLists=this.data.goodsLists;
    let address=this.data.address;
    // console.log(address.errMsg)
    if(address.errMsg===undefined){
      wx.showToast({
        title: '您还没有添加收货地址',
        icon:'none'
      })
    }else{
      wx.navigateTo({
        url: '/pages/pay/pay',
      })
    }
  },
  // 点击购物车中的复选按钮
  changeSelect(e){
    // console.log(e.target.dataset.id)
    // 选中商品的ID
    let id=e.target.dataset.id;
    let goodsLists=this.data.goodsLists;
    let botFlag=this.data.botFlag;
    // 总价格
    let totalPrice=0;
    // 总数量
    let total=0;
    // 遍历goodsLists中的数据，修改对应数据的flag值，
    goodsLists.forEach(item=>{
      if(item.goods_id===id){
        item.flag=!item.flag
      }
       // 计算商品被选中时的总价格
      if(item.flag){
        totalPrice+=item.goods_price*item.num;
        total+=item.num;
      }
    })
    //判断是否含有flag为false的商品，如果有就不选中复选框，否侧就选中
   let flags= goodsLists.some(item=>item.flag===false);
   if(flags){
      botFlag=false
   }else{
      botFlag=true
   }
      this.setData({
        goodsLists,
        botFlag,
        totalPrice,
        total
    })
    wx.setStorageSync('cart', goodsLists)
    console.log(e)
  },
  // 点击全选按钮
  checkSelect(e){
    // console.log(e.detail.value.length)
    // 判断当前全选框是否被选中
    let goodsLists=this.data.goodsLists;
    let totalPrice=0;
    let total=0;
    // 全选框被选中
    if(e.detail.value.length!==0){
      goodsLists.forEach(item=>{
        item.flag=true;
        totalPrice+=item.goods_price*item.num;
        total+=item.num;
      })
    }else{
      goodsLists.forEach(item=>{
        item.flag=false
      })
    }
    this.setData({
      goodsLists,
      totalPrice,
      total
    })
    wx.setStorageSync('cart', goodsLists)
  },
  // 用户点击减少购物车商品数量的按钮
  handeljian(e){ 
    let botFlag=this.data.botFlag;
    // 拿到当前用户点击商品的ID
    // console.log(e.target.dataset.goodsid)
    let id=e.target.dataset.goodsid
    //当前购物车的总价格
    let totalPrice=this.data.totalPrice;
    // 当前购物车中商品的总数量
    let total=this.data.total;
    let dataInfo=this.data.goodsLists;
    const datainex=  dataInfo.findIndex((element,index) => element.goods_id==id);
      // console.log(element.goods_id)
     let element= dataInfo[datainex]
    // 全选取消之后再点击某个商品，此时该商品的个数可能不为0 需要分两种情况计算总价格和总的商品个数
    if(!element.flag){
      if(element.num<=0){
        element.num=0
        total-=0;
        totalPrice-=0;
      }else{
        element.num--;
        totalPrice+=element.goods_price*element.num;
        total+=element.num;
      }
    }else{
      if(element.num<=0){
        element.num=0
        total-=0;
        totalPrice-=0;
      }else{
        element.num--;
        totalPrice-=element.goods_price;
        total--;
      }
    }
    element.flag=true
    var that=this
    // 当该商品的数量为0时删除该商品
    if(element.num<=0){
      // console.log(element.num)
      // 询问用户是否删除该商品
      wx.showModal({
        title: '提示',
        content: '是否删除该商品？',
        success (res) {
          // 提示删除成功
          if (res.confirm) {
            wx.showToast({
              title: '删除成功'
            })
            const index=dataInfo.findIndex(item=>item.goods_id===id);
            dataInfo.splice(index,1)
            that.setData({
              goodsLists:dataInfo,
              total,
              totalPrice
            })
            // 将修改后的数据保存到本地缓存中
            wx.setStorageSync('cart', dataInfo)
          }else{
            const index=dataInfo.findIndex(item=>item.goods_id===id);
           if(dataInfo[index].num<=0){
             dataInfo[index].num=0
           }
           that.setData({
            goodsLists:dataInfo,
            total,
            totalPrice
          })
          }
        }
      })
      
    }
    //判断是否含有flag为false的商品，如果有就不选中复选框，否侧就选中
   let flags= dataInfo.some(item=>item.flag===false);
   if(flags){
      botFlag=false
   }else{
      botFlag=true
   }
    // 将修改后的数据保存到data中
    this.setData({
      goodsLists:dataInfo,
      totalPrice,
      total,
      botFlag
    })
    // 将修改后的数据保存到本地缓存中
    wx.setStorageSync('cart', dataInfo)
  },
  // 用户点击增加商品数量
  handleadd(e){
    let botFlag=this.data.botFlag;
        // 拿到当前用户点击商品的ID
    // console.log(e.target.dataset.id)
    let id=e.target.dataset.id
     // 当前购物车的总价格
     let totalPrice=this.data.totalPrice;
     // 当前购物车中商品的总数量
     let total=this.data.total;
    let dataInfo=this.data.goodsLists
    dataInfo.forEach(element => {
      // console.log(element.goods_id)
      if(element.goods_id==id){
        element.num++;
        // 增加总价
         // 全选取消之后再点击某个商品，此时该商品的个数可能不为0 需要分两种情况计算总价格和总的商品个数
         if(!element.flag){
          totalPrice+=element.goods_price*element.num;
          total+=element.num;
        }else{
          totalPrice+=element.goods_price;
          total++;
        }
        element.flag=true
      }
    });
     //判断是否含有flag为false的商品，如果有就不选中复选框，否侧就选中
   let flags= dataInfo.some(item=>item.flag===false);
   if(flags){
      botFlag=false
   }else{
      botFlag=true
   }
    this.setData({
      goodsLists:dataInfo,
      totalPrice,
      total,
      botFlag
    })
    wx.setStorageSync('cart', dataInfo)
  },
  async handleAddress(){
    try {
    const result=await getSetting();
    console.log(result);
     // 用户第一次点击获取地址或者点击获取地址时取消
    if(result.authSetting['scope.address']===false){
       // 用户曾经点击过取消获取地址的按钮，需要重新设置用户状态权限
       await openSetting();
    }
       // 获取用户的地址
       const address=await chooseAddress();
      //  拼接收货地址信息，加入到address中，便于页面上的使用
       address.all=address.provinceName+address.cityName+address.countyName+address.detailInfo;
      //  将收货地址保存到本地缓存中
      wx.setStorageSync('address', address)
      //  console.log(address);
  }catch (error) {
    console.log(error)
    }
},
  // 点击收货地址按钮
  // handleAddress(){
  //   // 获取用户权限状态
  //   wx.getSetting({
  //     success:(result)=>{
  //       console.log(result.authSetting['scope.address'])
  //       // 用户第一次点击获取地址或者点击获取地址时取消
  //       if(result.authSetting['scope.address']===true||result.authSetting['scope.address']===undefined){
  //           // 获取用户的地址
  //           wx.chooseAddress({
  //             success: (result1) => {
  //               console.log(result1)
  //             },
  //           })
  //       }else{
  //         // 用户曾经点击过取消获取地址的按钮，需要重新设置用户状态权限
  //         wx.openSetting({
  //          success:(result2)=>{
  //           //  设置过用户权限之后，重新调用获取收货地址
  //           wx.chooseAddress({
  //             success: (result3) => {
  //               console.log(result3)
  //             },
  //           })
  //          },
  //         })
  //       }
  //     }
  //   })
  // },
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
     // 打开该页面，获取本地缓存中的地址信息和购物车的信息
     let infoAddress= wx.getStorageSync('address');
     let cartShops=wx.getStorageSync('cart');
     let botFlag=true;
     let totalPrice=0;
     let total=0;
     let flag= cartShops&&cartShops.some(v=>v.flag===false)
     if(flag){
        botFlag=false
     }
    //  计算总价格和总的商品个数
    cartShops&&cartShops.forEach(v=>{
        if(v.flag){
          totalPrice+=v.goods_price*v.num
          total+=v.num
        }
      })
       this.setData({
         goodsLists:cartShops,
         total,
         totalPrice,
         botFlag
       })
     // 缓存中没有地址信息，显示按钮
     if(!infoAddress){
       this.setData({
         flag:true
       })
     }else{
       // 缓存中有地址信息，显示地址
       this.setData({
         flag:false,
         address:infoAddress
       })
     }
     wx.setStorageSync('cart', cartShops)
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
// 获取用户权限的promise
export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
// 选择收货地址的promise
export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
// 设置用户权限的promise
export const openSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  })
}
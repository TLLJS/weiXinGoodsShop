let ajaxTime=0;
export const requests=(params)=>{
  ajaxTime++;
  const baseUlr='https://api-hmugo-web.itheima.net/api/public/v1'
  return new Promise(function(resolve,reject){
    // 显示加载对话框
    wx.showLoading({
      title:"加载中",
      mask:true
    });
    wx.request({
      ...params,
      url:baseUlr+params.url,
      success: (result) => {
        resolve(result)
      },
      fail: (res) => {
        reject(res)
      },
      complete:()=>{
        ajaxTime--;
        // 当请求的数据全部返回之后关闭加载框
        if(ajaxTime===0){
          wx.hideLoading();
        }
      }
    })
  })
}
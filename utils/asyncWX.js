export const getSetting =() => {
    return new Promise((reslove,reject) => {
        wx.getSetting({
          success:(res)=>{
              reslove(res)
          },
          fail:(err)=>{
              reject(err)
          }
        })
    })
}

export const chooseAddress =() => {
    return new Promise((reslove,reject) => {
        wx.chooseAddress({
          success:(res)=>{
              reslove(res)
          },
          fail:(err)=>{
              reject(err)
          }
        })
    })
}

export const openSetting =() => {
    return new Promise((reslove,reject) => {
        wx.openSetting({
          success:(res)=>{
              reslove(res)
          },
          fail:(err)=>{
              reject(err)
          }
        })
    })
}

export const login = () => {
    return new  Promise((resolve,reject) => {
        wx.login({
          timeout: 10000,
          success:(result) => {
              resolve(result)
          },
          fail:(err) => {
              reject(err)
          }
        })
    })
}
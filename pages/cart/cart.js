import {getSetting, chooseAddress, openSetting} from '../../utils/asyncWX'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{},
        cart:[],
        allChecked:false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 获取收货地址
    async handelChooseAddress(){
        // wx.chooseAddress({
        //   success: (result) => {
        //       console.log(result);
        //   },
        // })
        // wx.getSetting({
        //   success:(result) => {
        //       console.log(result);
        //   }
        // })

        // 获取权限状态
        // wx.getSetting({
        //   success:(res) => {
        //       const scopeAddress = res.authSetting["scope.address"];
        //       if(scopeAddress===true||scopeAddress===undefined){
        //           wx.chooseAddress({
        //             success: (result1) => {
        //                 console.log(result1);
        //             },
        //           })
        //       }else{
        //           wx.openSetting({
        //             success:(result2) => {
        //                 wx.chooseAddress({
        //                   success: (result3) => {
        //                       console.log(result3);
        //                   },
        //                 })
        //             },
        //           })
        //       }
        //   },
        // })

        try{
            // 1获取权限状态
            const res1 = await getSetting()
            const scopeAddress = res1.authSetting["scope.address"]

            // 2判断权限状态
            if(scopeAddress===false){
                // 4先诱导用户打开授权页面
                await openSetting();
            }
            let address = await chooseAddress()
            address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo
            wx.setStorageSync('address', address)
        }catch(err){
            console.log(err);
        }
    },

        /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        const address = wx.getStorageSync('address')
        this.setData({
            address
        })
    },

    handelOrderPay(){
        const token = wx.getStorageSync('token')
        if (!token) {
            wx.navigateTo({
              url: '/pages/auth/auth',
            })    
        }else{
            console.log("token已经存在！");
        }

    }
})
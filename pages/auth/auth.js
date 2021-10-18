
import {login} from '../../utils/asyncWX'
import request from '../../request/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    async handelGetUserInfo(e){
        
        try{
            const {encryptedData, iv, rawData, signature} = e.detail
        
            const {code} =await login()
            console.log(code);
            const orderParams = {encryptedData, iv, rawData, signature, code}
            const token = await request('/users/wxlogin',{orderParams},'post')
            wx.setStorageSync('token', token)
            wx.navigateBack({
            delta: 1,
            })
        }catch(error){
            console.log(error);
        }
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
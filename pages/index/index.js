import request from '../../request/request'
// import {request} from '../../request/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiperList:[],
        cateList:[],
        floorList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getSwiperList()
        this.getCateList()
        this.getFloorList()

        // request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'}).then(res => {
        //     this.setData({
        //         swiperList:res.data.message
        //     })
        // }).catch(err => {
        //     console.log(err);
        // })

    },

    onShow(options){
        const pages = getCurrentPages()
        console.log(pages);
    },

    // 获取轮播图数据
    async getSwiperList(){
        const result = await request('/home/swiperdata')
        // console.log(result);
        this.setData({
            swiperList:result
        })
    },

    // 获取导航分类数据
    async getCateList(){
        const result = await request('/home/catitems')
        // console.log(result);
        this.setData({
            cateList:result
        })
    },

    // // 获取楼层数据
    async getFloorList(){
        const result = await request('/home/floordata')
        console.log(result);
        this.setData({
            floorList:result
        })
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
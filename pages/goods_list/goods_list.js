import request from '../../request/request'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs:[ 
            {
                id:0,
                value:'综合',
                isActive:true
            },
            {
                id:1,
                value:'销量',
                isActive:false
            },
            {
                id:2,
                value:'价格',
                isActive:false
            }
        ],
        goodsList:[]
    },

    queryParams:{
        query:'',
        cid:'',
        pagenum:1,
        pagesize:10000
    },

    // 总页数
    totalPages:1,

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.queryParams.cid=options.cid || ""
        this.queryParams.query=options.query || ""

        this.getGoodsList()
    },

    handelTabsItemChange(e){
        // console.log(e);
        const {index} = e.detail
        let {tabs} = this.data
        tabs.forEach((v,i) => {
            return i===index?v.isActive=true:v.isActive=false
        })
        this.setData({
            tabs
        })
    },

    // 获取商品列表
    async getGoodsList(){
        const result = await request('/goods/search',{data:this.queryParams})
        // console.log(result);
        // 获取总条数
        const total =result.total
        // 计算总页数
        this.totalPages = Math.ceil(total/this.queryParams.pagesize)
        // console.log(this.totalPages);
        this.setData({
            goodsList:[...this.data.goodsList, ...result.goods]
        }),
        wx.stopPullDownRefresh()
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
        // 重置数组
        this.setData({
            goodsList:[]
        })
        this.queryParams.pagenum = 1,
        this.getGoodsList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        if(this.queryParams.pagenum >= this.totalPages){
            wx.showToast({
              title: '没有下一页了~',
              icon:"error"
            })
        }else{
            this.queryParams.pagenum++
            this.getGoodsList()
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
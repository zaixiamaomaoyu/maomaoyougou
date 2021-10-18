import request from "../../request/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsObj:{},
        isCollect:false
    },

    swiperList:[],


    /**
     * 生命周期函数--监听页面加载
     */
    onShow: function () {
        let pages = getCurrentPages()
        let currentPage = pages[pages.length-1]
        let options = currentPage.options
        const {goods_id} = options
        this.getGoodsList(goods_id)
        this.getSwiperList()
    },

    // 获取商品详情数据
    async getGoodsList(goods_id){
        const result = await request("/goods/detail",{goods_id})
        // console.log(result);
        this.setData({
            goodsObj:{
                goods_id:result.goods_id,
                goods_introduce:result.goods_introduce.replace(/\.webp/g,'.jpg'),
                goods_name:result.goods_name,
                pics:result.pics,
                goods_price:result.goods_price
            }
        })
    },

    // 获取轮播图数据
    async getSwiperList(){
        const result = await request("/home/swiperdata")
        this.swiperList = result
        // let collect = wx.getStorage("collect") || []
        // let isCollect = collect.some(v=> v.goods_id===this.swiperList.goods_id)
         // 1 获取缓存中的商品收藏的数组
        let collect = wx.getStorageSync("collect") || [];
        // 2 判断当前商品是否被收藏
        let isCollect = collect.some(v => v.goods_id === this.swiperList.goods_id);
        this.setData({
            swiperList:result,
            isCollect
        })
    },

    // 点击放大图片
    handelPreviewImage(e){
        const urls = this.swiperList.map(v => v.image_src)
        // console.log(e);
        const current = e.currentTarget.dataset.url
        wx.previewImage({
          urls,
          current
        })
    },

    // 点击添加购物车
    handelAddCart(){
        // 1获取缓存中的购物车 数组
        let cart = wx.getStorageSync("cart")||[]
        // 2判断 商品对象是否存在于购物车数组中
        let index = cart.findIndex(v => v.goods_id===this.swiperList.goods_id)
        if(index===-1){
            // 3不存在，第一次添加
            this.swiperList.num=1;
            this.swiperList.checked = true
            cart.push(this.swiperList)
        }else{ 
            // 4已经存在购物车数据， 执行num++
            cart[index].num++
        }
        // 5把购物车重新添加回缓存中
        wx.setStorageSync('cart', cart)
        // 6弹窗显示
        wx.showToast({
          title: '加入成功',
          icon:'success',
          mask:true
        })
    },


      // 点击 商品收藏图标
  handleCollect(){
    console.log('nihao');
    let isCollect=false;
    // 1 获取缓存中的商品收藏数组
    let collect=wx.getStorageSync("collect")||[];
    // 2 判断该商品是否被收藏过
    let index=collect.findIndex(v=>v.goods_id===this.swiperList.goods_id);
    // 3 当index！=-1表示 已经收藏过 
    if(index!==-1){
      // 能找到 已经收藏过了  在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
        
    }else{
      // 没有收藏过
      collect.push(this.swiperList);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 4 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 5 修改data中的属性  isCollect
    this.setData({
      isCollect
    })
  }
})
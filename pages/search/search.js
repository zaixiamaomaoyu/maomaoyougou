import request from '../../request/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods:[],
        TimeId:-1,
        isFoucs:false,
        inpValue:''

    },

    handelInput(e){
        const {value} = e.detail
        console.log(value);
        if(!value.trim()){
            this.setData({
                goods:[],
                isFoucs:false
            })
            return
        }

        clearTimeout(this.TimeId);
        this.TimeId=setTimeout(() => {
          this.qSearch(value);
          this.setData({
              isFoucs:true
          })
        }, 1000);
    },

    async qSearch(query){
        const res = await request('/goods/search',query)
        console.log(res);
        this.setData({
            goods:res.goods
        })
    },

    handelCancel(){
        this.setData({
            inpValue:'',
            isFoucs:false,
            goods:[]
        })
    }
})
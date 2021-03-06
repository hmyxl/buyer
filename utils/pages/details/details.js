Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    details: "",
    switch: 'hidden',
    check: 0,
    img_arr: [],
    images: [], //存放图片的数组
    dadd_desc_det: '',
    checks:0,
    zanwu:'hidden',
    zanwu_img:'hidden',
    dadd_bill_id:'',
    ifName: false,
    summary_content:''
  },
  menu_img: function() {
    if (this.data.check == 0) {
      this.setData({
        switch: 'show',
        check: 1
      })
    } else {
      this.setData({
        switch: 'hidden',
        check: 0
      })
    }
  },
  // 预览图片
  handleImagePreviews(event) {
    var index = event.currentTarget.dataset.index
    const images = this.data.img_arr
    wx.previewImage({
      current: images[index], //当前预览的图片
      urls: images, //所有要预览的图片
    })
  },
  product: function(options) {
    wx.navigateTo({
      url: '../product/product?dadd_desc_det=' + this.data.dadd_desc_det + '&dadd_bill_id=' + this.data.dadd_bill_id,
    })
  },
  delete_words: function () {
    wx.navigateTo({
      url: '../batch_deletion/batch_deletion?dadd_desc_det=' + this.data.dadd_desc_det,
    })
  },
  compile:function(event){
    var dard_reply_det = this.data.array[event.currentTarget.dataset.index].dard_reply_det
    wx.navigateTo({
      url: '../compile/compile?dard_reply_det=' + dard_reply_det,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      dadd_desc_det: options.dadd_desc_det
    })
  },
  submit:function(){
    this.setData({
      ifName: !this.data.ifName
    })
  },
  setValue: function (e) {
    this.setData({
      summary_content: e.detail.value
    })
  },
  cancel: function () {
    this.setData({
      ifName: !this.data.ifName
    })
  }, 
  confirm: function () {
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    if (that.data.details.dard_need_qty < that.data.details.dadd_need_qty){
      if (that.data.summary_content == ''){
        wx.showToast({
          title: '请输入找货回复',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      }else{
        wx.request({
          url: 'http://local.test.com/api/new_products_infomation_input/over',
          data: {
            getkey: us_user_id_pass,
            dai_who_find: dai_who_find,
            dadd_find_memo: that.data.summary_content,
            dadd_desc_det: that.data.dadd_desc_det,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    }else{
      wx.request({
        url: 'http://local.test.com/api/new_products_infomation_input/over',
        data: {
          getkey: us_user_id_pass,
          dai_who_find: dai_who_find,
          dadd_find_memo: that.data.summary_content,
          dadd_desc_det: that.data.dadd_desc_det,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            ifName: !this.data.ifName
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
      
  },

  /**
   * 生命周期函数--监听页面显示
   */
  
  onShow: function() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
    
    wx.request({
      url: 'http://cj.panduo.com.cn/api/new_products_infomation_input/index',
        data: {
          dai_who_find: dai_who_find,
          dadd_desc_det: that.data.dadd_desc_det,
          getkey: us_user_id_pass,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          that.setData({
            dadd_bill_id: res.data.data.dadd_bill_id
          })
          
          var dadd_bill_ids = res.data.data.dadd_bill_id
          that.setData({
            details: res.data.data,
          })
          if (res.data.data.dadd_prod_pic_path == null || res.data.data.dadd_prod_pic_path == ''){
            that.setData({
              zanwu_img: 'show',
            })
          }else{
            var len = res.data.data.dadd_prod_pic_path.length
            var dadd_prod_pic_path = res.data.data.dadd_prod_pic_path.substring(0, len - 1).split(':');
            that.setData({
              img_arr: dadd_prod_pic_path
            })
            that.data.img_arr.forEach(function (item, index,arr) {
              var item_ = "http://10.2.1.170:8020/NEW_PROD_REPLY_PIC/"+ dadd_bill_ids+'/' + item
              var items = "img_arr[" + index + "]";
              that.setData({
                [items]: item_
              })
            })
          }
          that.setData({
            checks: 1
          })
         }
          
      })
    var dai_who_find = wx.getStorageSync('us_user_id')
    var us_user_id_pass = wx.getStorageSync('us_user_id_pass')
      wx.request({
        url: 'http://cj.panduo.com.cn/api/new_products_infomation_input/list',
        data: {
          dai_who_find: dai_who_find,
          dadd_desc_det: that.data.dadd_desc_det,
          page:1,
          total:10,
          getkey: us_user_id_pass,
          // dard_bill_id:that.data.dard_bill_id
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          // var dard_bill_id = res.data.data.data.dard_bill_id
          that.setData({
            array: res.data.data.data,
          })
          if (res.data.data.data == ''){
            that.setData({
              zanwu: 'show'
            })
          }else{
            that.setData({
              zanwu: 'hidden'
            })
          }
          
          wx.hideLoading()
        }
      })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
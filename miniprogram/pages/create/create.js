// miniprogram/pages/create/create.js
const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
      shareId:"",
      theme:null,
      location:null,
      num:null,
      array: ['1', '2', '3', '4','5','6'],
      index:0,
      date:'',
      time:'',
      isAHidden:false,
      isBHidden:true,
      isCHidden:false,
      isDHidden:true,
      isEHidden:false,
      isFHidden:true
  },
  backToIndex:function(option){
    wx.switchTab({
      url: '../index/index',
    })
  },
  getTheme:function(event){
    this.setData({
      theme:event.detail.value
    });
  },
  getPeopleNum:function(event){
    this.setData({
      num:event.detail.value
    });
  },
  getLocation: function (event) {
    this.setData({
      location: event.detail.value
    });
  },
  yincangtupian1:function(event){
    this.setData({
      isAHidden:true,
      isBHidden:false
    })
  },
  yincangtupian2:function(event){
    this.setData({
      isCHidden:true,
      isDHidden:false
    })
  },
  yincangtupian3: function (event) {
    this.setData({
      isEHidden: true,
      isFHidden: false
    })
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  }, 
  addData: function(){
    db.collection('Activities').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      //_id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      A_Schema: this.data.theme,
      A_Location: this.data.location,
      A_StartDate:this.data.date,
      A_StartTime:this.data.time,
      A_Create:app.globalData.openid,
      A_Participate: app.globalData.openid
    },
    success:res=> {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      this.setData({
        shareId:res._id
      })
      console.log(this.data.shareId)
    }
  })
  },
  onShareAppMessage: function () {
    // console.log(this.data.shareId)
    return {
      title: '发送给好友',
      path: 'pages/share/share?aid='+this.data.shareId,
      imageUrl: '/images/user-unlogin.png'
    }
  }
})
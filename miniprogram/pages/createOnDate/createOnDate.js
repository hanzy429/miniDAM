const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
      shareId:"",
      theme:null,
      location:null,
      num:null,
      date:'',
      time:'',
      isAHidden:false,
      isBHidden:true,
      isCHidden:false,
      isDHidden:true,
      isEHidden:false,
      isFHidden:true
  },
  onLoad:function(option){
    var speDate = wx.getStorageSync('Date');
    wx.removeStorage({
      key: 'Date',
    })
    this.setData({
      date:speDate
    })
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
    let value = event.detail.value;
    if (!(/(^[0-9]*$)/.test(value))){
      wx.showToast({
        title: '请输入数字',
        image:'/images/tanhao.png',
        duration: 2000
      })
    }
    else{
      this.setData({
        num:value
      });
    }
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
    console.log(this.data.date);
    if (this.data.theme == null){
      wx.showToast({
        title: '请填写活动主题',
        image:'/images/tanhao.png',
        duration: 2000
      })
    }
    else if (this.data.num == null){
      wx.showToast({
        title: '请填写活动人数上限',
        image:'/images/tanhao.png',
        duration: 2000
      })
    }
    else if (this.data.location == null){
      wx.showToast({
        title: '请填写活动地点',
        image:'/images/tanhao.png',
        duration: 2000
      })
    }
    else if (this.data.date == ''){
      wx.showToast({
        title: '请选择活动日期',
        image:'/images/tanhao.png',
        duration: 2000
      })
    }
    else if (this.data.time == ''){
      wx.showToast({
        title: '请选择活动时间',
        image:'/images/tanhao.png',
        duration: 2000
      })
    }
    else{
        db.collection('Activities').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          //_id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          A_Schema: this.data.theme,
          A_Location: this.data.location,
          A_StartDate:this.data.date,
          A_StartTime:this.data.time,
          A_Create:app.globalData.openid,
          A_Participate: app.globalData.openid,
          A_Peoplenum:this.data.num
        },
        success:res=> {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          this.setData({
            shareId:res._id
          })
          //console.log(this.data.shareId)
          wx.showToast({
            title: '活动创建成功！',
            icon: 'success',
            duration: 2000
          })
        }
      })
  }
  },
  onShareAppMessage: function () {
    console.log('ttt',this.data.shareId)
    return {
      title: '发送给好友',
      path: 'pages/share/share?aid='+this.data.shareId,
      imageUrl: '/images/user-unlogin.png'
    }
  }
})
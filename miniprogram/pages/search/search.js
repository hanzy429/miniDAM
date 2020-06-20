// miniprogram/pages/search/search.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startDate:'',
    endDate:'',
    name:'',
    position:'',
    placeholderName:'请填要搜索的主题',
    placeholderPosition:'请填要搜索的地点',
    result:[],
    flag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qurey();
  },

  getName: function (event) {
    this.setData({
      name: event.detail.value
    });
  },

  getPosition: function (event) {
    this.setData({
      position: event.detail.value
    });
  },

  startDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },

  endDateChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  clear: function (e) {
    
    console.log('进入clear')
    console.log(this.data)
    this.setData({
      startDate:'',
      endDate:'',
      name:'',
      position:'',
      placeholderName:'请填要搜索的主题',
      placeholderPosition:'请填要搜索的地点',
    })
    console.log(this.data)
    this.qurey()
  },

  
  qurey: function (e) {
    this.setData({
      result: [],
    })
    if(this.data.startDate==''&&this.data.endDate==''&&this.data.name==''&&this.data.position=='')
    {
      console.log("1")
      db.collection("Activities").where(
        {
          A_Participate: app.globalData.openid
        }
      ).get().then(res => {
        if(res.data.length==0){
          this.setData({
            flag:false,
          })
        }
        this.setData({
          result: res.data
        })
      })
    }
    else if(this.data.startDate!=''&&this.data.endDate!=''&&this.data.name==''&&this.data.position=='')
    {
      console.log("2")
      db.collection("Activities").where(
        {
          A_StartDate: _.gt(this.data.startDate).and(_.lt(this.data.endDate)),
          A_Participate: app.globalData.openid
          //app.globalData.openid
        }
      ).get().then(res => {
        if(res.data.length==0){
          this.setData({
            flag:false,
          })
        }
        this.setData({
          result: res.data
        })
      })
    }
    else if(this.data.startDate!=''&&this.data.endDate!=''&&this.data.name!=''&&this.data.position=='')
    {
      console.log("3")
      db.collection("Activities").where(
        {
          A_Schema: {								
            $regex:'.*' + this.data.name + '.*',		
            $options: 'i'						
          },
          A_StartDate: _.gt(this.data.startDate).and(_.lt(this.data.endDate)),
          A_Participate: app.globalData.openid
          //app.globalData.openid
        }
      ).get().then(res => {
        if(res.data.length==0){
          this.setData({
            flag:false,
          })
        }
        this.setData({
          result: res.data
        })
      })
    }
    else if(this.data.startDate!=''&&this.data.endDate!=''&&this.data.name!=''&&this.data.position!='')
    {
      console.log("4")
      db.collection("Activities").where(
        {
          A_Schema: {								
            $regex:'.*' + this.data.name + '.*',		
            $options: 'i'						
          },
          A_Location: {								
            $regex:'.*' + this.data.position + '.*',		
            $options: 'i'						
          },
          A_StartDate: _.gt(this.data.startDate).and(_.lt(this.data.endDate)),
          A_Participate: app.globalData.openid
          //app.globalData.openid
        }
      ).get().then(res => {
        if(res.data.length==0){
          this.setData({
            flag:false,
          })
        }
        this.setData({
          result: res.data
        })
      })
    }
    else if(this.data.startDate!=''&&this.data.endDate!=''&&this.data.name==''&&this.data.position!='')
    {
      console.log("5")
      db.collection("Activities").where(
        {
          A_Location: {								
            $regex:'.*' + this.data.position + '.*',		
            $options: 'i'						
          },
          A_StartDate: _.gt(this.data.startDate).and(_.lt(this.data.endDate)),
          A_Participate: app.globalData.openid
          //app.globalData.openid
        }
      ).get().then(res => {
        if(res.data.length==0){
          this.setData({
            flag:false,
          })
        }
        this.setData({
          result: res.data
        })
      })
    }
    else if(this.data.startDate==''&&this.data.endDate==''&&this.data.name!=''&&this.data.position!='')
    {
      console.log("6")
      db.collection("Activities").where(
        {
          A_Schema: {								
            $regex:'.*' + this.data.name + '.*',		
            $options: 'i'						
          },
          A_Location: {								
            $regex:'.*' + this.data.position + '.*',		
            $options: 'i'						
          },
          A_Participate: app.globalData.openid
          //app.globalData.openid
        }
      ).get().then(res => {
        if(res.data.length==0){
          this.setData({
            flag:false,
          })
        }
        this.setData({
          result: res.data
        })
      })
    }
    else if(this.data.startDate==''&&this.data.endDate==''&&this.data.name!=''&&this.data.position=='')
    {
      console.log("7")
      db.collection("Activities").where(
        {
          A_Schema:{								
            $regex:'.*' + this.data.name + '.*',		
            $options: 'i'						
          },
          A_Participate: app.globalData.openid
          //app.globalData.openid
        }
      ).get().then(res => {
        if(res.data.length==0){
          this.setData({
            flag:false,
          })
        }
        this.setData({
          result: res.data
        })
      })
    }
    else if(this.data.startDate==''&&this.data.endDate==''&&this.data.name==''&&this.data.position!='')
    {
      console.log("8")
      db.collection("Activities").where(
        {
          A_Location: {								
            $regex:'.*' + this.data.position + '.*',		
            $options: 'i'						
          },
          A_Participate: app.globalData.openid
          
        }
      ).get().then(res => {
        if(res.data.length==0){
          this.setData({
            flag:false,
          })
        }
        this.setData({
          result: res.data
        })
      })
    }
    else if((this.data.startDate!=''&&this.data.endDate=='')||(this.data.startDate==''&&this.data.endDate!=''))
    {
      wx.showToast({
        title: '请同时选择起始和结束日期！',
        icon: 'none',
        duration: 1500
      })
    }
    console.log("查询结束")
    console.log(this.data)
    // console.log(this.data.result)
    // if(res.data.length!=0){
    //   this.setData({
    //     flag:true,
    //   })
    // }
    if(this.data.result.length==0)
    {
      console.log("null!")
    }
    else{
      this.setData({
        flag:true,
      })
    }

  },
})
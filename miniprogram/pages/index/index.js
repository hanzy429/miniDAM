//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    
  },

  onLoad: function() {
    this.loadactivity()
  },

  loadactivity:function(){
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })

    const that = this;
    db.collection("Activities").limit(5).get().then(res => {
      const activities = res.data;
      console.log(activities);
      that.setData({
        activities:activities
      })
    }) 
  }
})

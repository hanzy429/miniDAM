// pages/share/share.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  //获取加载的页面
    var qq = options.aid
    app.globalData.joinactid = qq
    console.log('share',qq)
    console.log('aid', app.globalData.joinactid)
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        // console.log('callFunction test result: ', res)
        app.globalData.openid = res.result.openid
        console.log('tt', app.globalData.openid)
        this.read()
      }
    })
  },
  read:function(){
    const that = this;
    db.collection("Activities").where({
      _id: app.globalData.joinactid
    }).get().then(res => {
      const activities = res.data;
       console.log('db', app.globalData.joinactid)
       console.log(activities);
      that.setData({
        activities: activities
      })
    })
  }
})
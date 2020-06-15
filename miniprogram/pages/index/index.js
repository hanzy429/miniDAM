//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {

  },

  onLoad: function () {
    this.loadactivity()
    
  },

  loadactivity: function () {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        console.log('callFunction test result: ', res)
        app.globalData.openid = res.result.openid
        console.log('tt', app.globalData.openid);
        this.read()
      }
    })
  },
  read:function(){
    const that = this;
    console.log('11', app.globalData.openid);
    db.collection("Activities").where({
      _openid: app.globalData.openid
    }).orderBy('A_StartDate', 'asc').orderBy('A_StartTime','asc').get().then(res => {
      const activities = res.data;
      console.log(activities);
      that.setData({
        activities: activities
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下面填写需要下拉时的函数 自己定
    // 下拉刷新 调用onload函数
    this.onLoad()
    // 注意现在需要使用停止函数停止刷新
    wx.stopPullDownRefresh()
  },
})

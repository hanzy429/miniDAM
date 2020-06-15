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
  onLoad: function (options) {
    var aid = options.aid
    console.log(aid)
    db.collection('Activities').doc(aid).get().then(res => {
      const activities = res.data;
      console.log(activities);
      that.setData({
        activities: activities
      })
      console.log(activities);
    })
  },
})
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
    var that =this
    var aid = options.aid
    db.collection('Activities').doc(aid).get().then(res => {
      const activities = res.data;
      // console.log(activities);
      that.setData({
        activities: activities
      })
      // console.log(activities);
    })
  },
})
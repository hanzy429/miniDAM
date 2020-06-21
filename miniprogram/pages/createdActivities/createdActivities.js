// miniprogram/pages/createdActivities/createdActivities.js
const app = getApp()
const db = wx.cloud.database()
Page({


  onLoad: function (options) {
    this.qurey()

  },

  qurey: function (e) {
    console.log(app.globalData.openid)
    db.collection("Activities").where(
      {
        A_Create: app.globalData.openid
      }
    ).orderBy('A_StartDate', 'asc').orderBy('A_StartTime','asc').get().then(res => {
      this.setData({
        result: res.data
      })
    })

  },
})
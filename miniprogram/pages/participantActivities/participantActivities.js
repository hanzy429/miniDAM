// miniprogram/pages/participantActivities/participantActivities.js
const app = getApp()
const db = wx.cloud.database()
Page({


  onLoad: function (options) {
    this.qurey()

  },

  qurey: function (e) {
    console.log("我的id")
    console.log(app.globalData.openid)
    db.collection("Activities").where(
      {
        A_Participate: app.globalData.openid
      }
    ).get().then(res => {
      console.log("查询结果")
      console.log(res)
      this.setData({

        result: res.data
      })
    })

  },
})
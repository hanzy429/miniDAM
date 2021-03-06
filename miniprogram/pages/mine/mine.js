// miniprogram/pages/mine/mine.js
const app = getApp()
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // createNum:'10',
    // participateNum:'20',
    userInfo: {},
    hasUserInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
    //this.addfunction()
    //this.qureyfunction()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  init: function (e) {
    db.collection("Activities").where(
      {
        A_Create: app.globalData.openid
      }
    ).count().then(res => {
      this.setData({
        createNum: res.total
      })
    })
    console.log(this.data.createNum)
    db.collection("Activities").where(
      {
        A_Participate: app.globalData.openid
      }
    ).count().then(res => {
      this.setData({
        participateNum: res.total
      })
    })
    console.log(this.data.participateNum)
    // app.userInfoReadyCallback = res => {
    //   console.log(res)
    //   this.setData({
    //     userInfo: res.userInfo,
    //     hasUserInfo: true
    //   })
    // }
    
  },

  getPosition: function (event) {
    this.setData({
      position: event.detail.value
    });
    console.log(this.data.theme)
  },

  positionButtom: function (e) {
    db.collection("Activities").where(
      {
        A_Location: this.data.position
      }
    ).count().then(res => {
      this.setData({
        result2: res.total
      })
    })
  },

  getTheme: function (event) {
    this.setData({
      theme: event.detail.value
    });
    console.log(this.data.theme)
  },

  qurey: function (e) {
    db.collection("Activities").where(
      {
        A_Schema: this.data.theme
      }
    ).get().then(res => {
      this.setData({
        result1: res.data
      })
    })

  },

  qureyfunction: function () {
    db.collection('Activities').get().then(res => {
      // res.data 包含该记录的数据
      this.setData({
        result: res.data
      })
      console.log(res.data)
    })
  },

  addfunction: function () {
    db.collection("Activities").add({
      data: {
        _id: "NO1",
        A_location: "home",
        A_Schema: "coding2",
      }
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
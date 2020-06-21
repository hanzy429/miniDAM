//index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    userInfo:{},
    hasUserInfo:false,
    peoplecount:''
  },

  onLoad: function () {
    var that=this;
    that.loadactivity()
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
    // wx.getUserInfo({
    //   success:function(res){
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     that.setData({
    //       [avatarUrl]: res.userInfo.avatarUrl,
    //       [nickName]:res.userInfo.nickName,
    //     })
    //   }
    // })

  },
  loadactivity: function () {
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        // console.log('callFunction test result: ', res)
        app.globalData.openid = res.result.openid
        // console.log('tt', app.globalData.openid)
        this.read()
      }
    })
  },
  read:function(){
    let nowdate = new Date();
    let year = nowdate.getFullYear();
    let month = nowdate.getMonth() + 1;
    let day = nowdate.getDate();
    if (month < 10){
      month = "0" + month;
    }
    if (day < 10){
      day = "0" + day;
    }
    let now = year + "-" + month + "-" + day;
    const _ = db.command;
    const that = this;
    db.collection("Activities").where({
      A_Participate: app.globalData.openid,
      A_StartDate: _.gte(now),
    }).orderBy('A_StartDate', 'asc').orderBy('A_StartTime','asc').get().then(res => {
      const activities = res.data;
      // console.log(activities);
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

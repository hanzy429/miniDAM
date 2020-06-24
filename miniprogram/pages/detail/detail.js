const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    isActShowHide:false,
    hasAct:true,
    Date:""
  },


  onLoad: function (options) {
    var that = this;
    that.setData(options);
    var fix=0;
    var f=fix.toString();
    var dateNum = that.data.dateNum;
    var d=dateNum.toString();
    if(dateNum<10){
      d=f+d;
    }
    var month = that.data.month;
    var m=month.toString();
    if(month<10){
      m=f+m;
    }
    var year = that.data.year;
    var y=year.toString();
    var specificDate=y+"-"+m+"-"+d;
    wx.setStorageSync('Date', specificDate);
    that.setData({
      Date:specificDate
    })
    //console.log(month); 
    db.collection("Activities").where({
      A_StartDate: that.data.Date,
      A_Participate: app.globalData.openid
    }).orderBy('A_StartTime','asc').get().then(res => {
      const activities = res.data;
      that.setData({
        activities: activities
      })
      console.log(activities);
      //console.log(that.data.activities.length);
      if(that.data.activities.length==0){
        that.setData({
          isActShowHide:true,
          hasAct:false
        })
      }
    })

  },
  goToCreate:function(){
    console.log(this.data.Date);
    wx.navigateTo({
      url: '/pages/createOnDate/createOnDate',
    })
  }
})
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
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
    //console.log(month); 
    db.collection("Activities").where({
      A_StartDate: specificDate
    }).get().then(res => {
      const activities = res.data;
      that.setData({
        activities: activities
      })
      console.log(activities);
    })

  },
})
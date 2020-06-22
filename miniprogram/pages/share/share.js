// pages/share/share.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   peoplecount:0,
   join:0,
   isjoin:false
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
        this.countpeople()  
        this.isJoint() 
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
    
  },
  isJoint:function(){
    const that = this;
    const _ = db.command;
    console.log('1',app.globalData.openid);
    console.log('2',app.globalData.joinactid);
    db.collection("Activities").where(_.or([
      {
        A_Create: app.globalData.openid,
        _id: app.globalData.joinactid
      },
      {
         A_Participate:app.globalData.openid,
         A_Activityid:app.globalData.joinactid
      }
    ])).count().then(res => {
      that.setData({
        join:res.total
      })
      console.log(that.data.join)
      if(that.data.join!=0){
        that.setData({
          isjoin:true
        })
        console.log(that.data.isjoin)
      }
    })
  },
  countpeople:function(){
    const that = this;
    db.collection("Activities").where({
      A_Activityid: app.globalData.joinactid // 填入当前用户 openid
    }).count().then(res => {
      // console.log(res.total)
      // that.data.peoplecount = res.total+1
      // const count=that.data.peoplecount
      // console.log('ttt',count)
      that.setData({
        peoplecount:res.total + 1
      })
    })
  },
  addData:function(){
 
    if(this.data.isjoin){
      wx.showToast({
        title: '你已参加该活动',
        image:'/images/tanhao.png',
        duration: 2000
      })
    }
    else{
        if(this.data.peoplecount<this.data.activities[0].A_Peoplenum){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          db.collection('Activities').add({
            // data 字段表示需新增的 JSON 数据
            data: {
              //_id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
              A_Activityid:this.data.activities[0]._id,
              A_Schema: this.data.activities[0].A_Schema,
              A_Location: this.data.activities[0].A_Location,
              A_StartDate: this.data.activities[0].A_StartDate,
              A_StartTime: this.data.activities[0].A_StartTime,
              A_Create: this.data.activities[0].A_Create,
              A_Participate: app.globalData.openid
            },
            success: res => {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
            }
          })
          this.countpeople() 
          this.isJoint()
        }
      else{
        wx.showToast({
          title: '人数已满',
          image:'/images/tanhao.png',
          duration: 2000
        })
      }
    }
  }
})
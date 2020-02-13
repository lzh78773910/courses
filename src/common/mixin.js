export const wRoute = {
  data() {
    return {
      path: '',
      oldpath: ''
    }
  },
  watch: {
    $route(to, old) {
      this.path = to.path;
      this.oldpath = old.path;
    }
  }
}

export const inDetail = {
  data() {
    return {

    }
  },
  methods: {
    itemClick(index, item) {
      if (this.$route.path == '/teachVideo') {
        if (this.sActive == 0) {
          let videoId = this.vData[index].videoId
          let videoName = this.vData[index].videoTitle
          console.log(videoId)
          this.$router.push({
            path: this.$route.path + '/' + this.vData[index].videoId,
            query: {
              videoId,
              videoName
            }
          })
        } else {
          let videoId = this.vData1[index].videoId
          let videoName = this.vData1[index].videoTitle
          this.$router.push({
            path: this.$route.path + '/' + this.vData1[index].videoId,
            query: {
              videoId,
              videoName
            }
          })
        }

      }
      else if (this.$route.path == '/discussion') {
        let discussion = item;
        let currentPage = this.currentPage;
        this.$router.push({
          path: this.$route.path + "/" + item.qid,
          query: {
            discussion,
            currentPage
          }
        });
      } else if (this.$route.path == '/home') {
        let discussion = item;
        let currentPage = this.currentPage;
        this.$router.push({
          path: '/discussion/' + item.qid,
          query: {
            discussion,
            currentPage
          }
        });
      }

      // if(this.vData[this.sActive]) 
      //   this.$router.push(this.$route.path + '/' + this.vData[this.sActive][index].id)
      // else 
      //   this.$router.push(this.$route.path + '/' + this.vData[index].id)
      // else
      //   this.$router.push(this.$route.path + '/' + this.content[index].qid) 
    }
  }
}

export const TabRoute = {
  data() {
    return {
      navData: [
        {
          liCon: "首页",
          icon: "el-icon-s-home",
          liPath: "/home"
        },
        {
          liCon: "教学视频",
          icon: "el-icon-video-camera",
          liPath: "/teachVideo"
        },
        {
          liCon: "教学资料",
          liPath: "/teachData",
          icon: "el-icon-tickets",
        },
        {
          liCon: "课程讨论",
          icon: "el-icon-chat-dot-square",
          liPath: "/discussion"
        },
        {
          liCon: "教学反馈",
          icon: "el-icon-chat-line-square",
          liPath: "/comment"
        },
        {
          liCon: "关于",
          icon: "el-icon-guide",
          liPath: "/about"
        },
      ]
    }
  },
  methods: {
    navClick(item) {
      this.$router.push(item.liPath).catch(err => {
        console.log(err)
      });
    },
  }
}

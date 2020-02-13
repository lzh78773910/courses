<template>
  <el-row>
    <content-box>
      <div class="advName contentTitle">
        <span>{{titleName}}</span>
        <span>{{titleAdv}}</span>
      </div>
      <div class="advContent">
        <ul v-for="(item,index) in Adv" :key="index">
          <li>
            <p>{{item.AdvNum}}</p>
            <p>{{item.AdvCon}}</p>
          </li>
          <li>
            <img :src="item.AdvImg" alt />
          </li>
        </ul>
      </div>
    </content-box>
  </el-row>
</template>

<script>
import ContentBox from "components/content/overall/ContentBox";
export default {
  name: "HAdvantage",
  data() {
    return {
      titleName: "Linux六大优势",
      titleAdv: "让你惊叹不已!",
      Adv: [
        {
          AdvNum: "系统优势一",
          AdvCon: "跨平台的硬件支持",
          AdvImg: require("assets/img/home/hardware.png")
        },
        {
          AdvNum: "系统优势二",
          AdvCon: "丰富的软件支持",
          AdvImg: require("assets/img/home/software.png")
        },
        {
          AdvNum: "系统优势三",
          AdvCon: "多用户多任务",
          AdvImg: require("assets/img/home/task.png")
        },
        {
          AdvNum: "系统优势四",
          AdvCon: "可靠的安全性",
          AdvImg: require("assets/img/home/safety.png")
        },
        {
          AdvNum: "系统优势五",
          AdvCon: "良好的稳定性",
          AdvImg: require("assets/img/home/stable.png")
        },
        {
          AdvNum: "系统优势六",
          AdvCon: "完善的网络功能",
          AdvImg: require("assets/img/home/network.png")
        }
      ]
    };
  },
  components: {
    ContentBox
  }
};
</script>

<style scoped>
.ContentBox {
  height: 380px;
}
.advName span:last-child {
  font-weight: bolder;
  color: var(--color-main);
}
.advContent {
  width: 80%;
  height: 200px;
  margin: 0 auto;
}

.advContent ul {
  width: 33.13%;
  height: 49%;
  border: 1px solid var(--color-main);
  background-color: white;
  float: left;
  list-style: none;
  margin: auto;
  text-align: center;
}

.advContent ul:nth-child(1),
ul:nth-child(2),
ul:nth-child(3) {
  border-bottom: none;
}
.advContent ul:nth-child(3),
ul:nth-child(6) {
  border-left: none;
}
.advContent ul:nth-child(1),
ul:nth-child(4) {
  border-right: none;
}

.advContent ul li:first-child {
  width: 60%;
  height: 100%;
  margin-top: 8%;
  float: left;
  margin-left: 10%;
}

.advContent ul p {
  width: 100%;
  font-size: 14px;
}
.advContent ul p:nth-child(2) {
  font-weight: 800;
  font-size: 16px;
  color: var(--color-main);
}

.advContent ul li:last-child {
  width: 30%;
  height: 100%;
  float: left;
  margin: auto;
  margin-left: -8%;
}

.advContent ul li:last-child img {
  width: 55%;
  height: 57%;
  margin-top: 20%;
}

@media (max-width: 1033px) {
  .advContent {
    width: 90%;
  }
  .advContent ul {
    width: 33%;
  }
}
@media (max-width: 804px) {
  .ContentBox {
    width: 100%;
  }
}
@media (max-width: 608px) {
  .advContent ul:nth-child(1),
  ul:nth-child(2),
  ul:nth-child(3) {
    border-bottom: 1px solid var(--color-main);
  }
  .advContent ul:nth-child(3),
  ul:nth-child(6) {
    border-left: 1px solid var(--color-main);
  }
  .advContent ul:nth-child(1),
  ul:nth-child(4) {
    border-right: 1px solid var(--color-main);
  }
  .ContentBox {
    height: 435px;
  }
  .contentTitle span {
    font-size: 20px;
  }
  .advContent ul {
    width: 49%;
  }
  .advContent ul li:last-child img {
    width: 80%;
    height: 57%;
    margin-left: 30%;
  }
}
</style>
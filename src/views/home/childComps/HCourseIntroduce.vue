<template>
  <content-box>
    <div class="courseName contentTitle">
      <span>{{cName}}</span>
      <span>{{eCourse}}</span>
    </div>
    <div class="courseTab">
      <ul>
        <li
          v-for="(item, index) in HomeTabAContent"
          :key="index"
          class="tabItem"
          @mouseenter="tabMove(index)"
          :class="{isActive: active === index}"
        >{{item.homeLabel}}</li>
      </ul>
    </div>

    <div class="courseContent">
      <div
        v-show="isShow(index2)"
        v-for="(item,index2) in HomeTabAContent"
        :key="index2"
        class="cDiv"
      >
        <!-- {{item}} -->
        <div class="imgDiv">
          <img :src="item.labelImg" />
        </div>
        <div class="textDiv">
          <ul>
            <li v-for="item2 in item.list" :key="item2">{{item2}}</li>
          </ul>
        </div>
      </div>
    </div>
  </content-box>
</template>

<script>
import { RouteContext } from "common/const.js";
import ContentBox from "components/content/overall/ContentBox";
export default {
  components: {
    ContentBox
  },
  data() {
    return {
      active: 0,
      cName: "Linux",
      eCourse: "精品课程",
      RouteContext
    };
  },
  props: {
    HomeTabAContent: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {},
  methods: {
    tabMove(index) {
      this.active = index;
    },
    isShow(index2) {
      if (index2 === this.active) return true;
    }
  }
};
</script>

<style scoped>
.isActive {
  background-color: var(--color-main);
  color: #fff;
}

.courseName span:first-child {
  font-weight: bolder;
  color: var(--color-main);
}

.courseTab {
  width: 100%;
  height: 52px;
  text-align: center;
}
.courseTab ul {
  width: 75%;
  height: 92%;
  margin: 0 auto 0 auto;
  list-style: none;
  line-height: 50px;
  border: 2px solid var(--color-main);
  background-color: #f0f0f0;

}
.courseTab li {
  margin-left: 0.8%;
  width: 24%;
  height: 100%;
  font-size: 16px;
  border-left: 0.1px solid var(--color-main);
  border-right: 0.1px solid var(--color-main);
  float: left;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.courseTab li:hover {
  background-color: var(--color-main);
  transition: 0.3s;
  color: #fff;
  border-right: 0.1px solid var(--color-main);
}

.courseContent {
  width: 80%;
  height: 400px;
  background-color: #fbfbfb;
  /* background-color: #fff; */

  margin: 2% auto 0 auto;
  border: 1px solid #e7e7e7;
}
.courseContent > div {
  width: 98%;
  height: 96%;
  margin: auto;
  margin-top: 0.8%;
  background-color: #fff;
}
.courseContent .imgDiv {
  width: 36%;
  height: 100%;
  margin-left: 2%;
  margin-right: 2%;
  margin-top: 5%;
  float: left;
}
.courseContent img {
  width: 100%;
  height: 70%;
  box-shadow: 0 0 10px grey;
}

.courseContent .textDiv {
  width: 58%;
  height: 63%;
  margin-left: 2%;
  margin-top: 5%;
  float: left;
  color: grey;
  font-size: 14px;
  overflow: auto;
  margin-left: -0.1%;
}
.textDiv::-webkit-scrollbar {
  display: none;
}
.textDiv ul {
  width: 100%;
  height: 100%;
  list-style-position: inside;
}

.textDiv ul li {
  margin-top: 2%;
}



/* 适配手机端 */
@media (max-width: 804px) {
  .ContentBox {
    width: 100%;
  }
  .btn button {
    width: 30%;
  }
}
@media (max-width: 508px) {
  .ContentBox {
    height: 480px;
  }
  .imgDiv {
    display: none;
  }
  .courseContent {
    height: 270px;
  }
  .courseContent .textDiv {
    width: 100%;
    height: 75%;
  }
  .btn button {
    width: 45%;
    height: 50%;
  }
  .courseTab ul {
    width: 98%;
    margin: 0 auto;
  }
  .courseTab li {
    margin-left: .8%;
    width: 23.8%;
    height: 100%;
  }
}
</style>
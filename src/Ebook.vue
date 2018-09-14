<template>
  <div class="ebook">
    <title-bar :ifshow="ifshow"></title-bar>
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleShow"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
    <menu-bar :ifshow="ifshow" ref="menuBar" :fontSizeList="fontSizeList" :defaultFontSize="defaultFontSize" @setFontSize="setFontSize" :themeList="themeList" :defaultTheme="defaultTheme" :bookAvailable="bookAvailable" @setTheme="setTheme" @onProgressChange="onProgressChange" @jumpTo="jumpTo" :navigation="navigation"></menu-bar>
  </div>
</template>

<script>
import TitleBar from "@/components/TitleBar";
import MenuBar from "@/components/MenuBar";
import Epub from "epubjs";
const DOWNLOAD_URL = "/static/epub_book/firstbook.epub";

export default {
  components: {
    TitleBar,
    MenuBar
  },
  data() {
    return {
      ifshow: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 }
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: "default",
          style: {
            body: {
              color: "#000",
              background: "#fff"
            }
          }
        },
        {
          name: "eye",
          style: {
            body: {
              color: "#000",
              background: "#ceeaba"
            }
          }
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#000"
            }
          }
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "rgba(241, 236, 226, 1)"
            }
          }
        }
      ],
      defaultTheme: 0,
      bookAvailable: false,
      navigation: null
    };
  },
  methods: {
    //选择主题
    setTheme(index) {
      this.themes.select(this.themeList[index].name);
      this.defaultTheme = index;
    },
    //注册主题
    regitserTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style);
      });
    },
    //点击切换title和menu
    toggleShow() {
      this.ifshow = !this.ifshow;
      //如果为false将把设置栏的选项全部隐藏
      if (!this.ifshow) {
        //父组件调用子组件方法
        this.$refs.menuBar.hideSetting();
      }
    },
    //电子书的生成与渲染
    showEpub() {
      //生成book
      this.book = new Epub(DOWNLOAD_URL);
      //生成rendition，通过book.renderTo
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      //使用rendition的display方法渲染
      this.rendition.display();
      //获取主题对象，保存在this变量中，让后续的方法操作
      this.themes = this.rendition.themes;
      //设置默认字体
      this.setFontSize(this.defaultFontSize);
      //注册主题
      this.regitserTheme();
      //选择主题
      this.setTheme(this.defaultTheme);
      //获取locations对象，通过epub.js的钩子函数来进行获取
      this.book.ready
        .then(() => {
          this.navigation = this.book.navigation;
          return this.book.locations.generate();
        })
        .then(() => {
          this.locations = this.book.locations;
          this.bookAvailable = true;
        });
    },
    //点击上一页
    prevPage() {
      if (this.rendition) {
        this.hiddenTitleAndMenuBar();
        this.rendition.prev();
      }
    },
    //点击下一页
    nextPage() {
      if (this.rendition) {
        this.hiddenTitleAndMenuBar();
        this.rendition.next();
      }
    },
    //修改字体
    setFontSize(fontSize) {
      if (this.themes) {
        this.defaultFontSize = fontSize;
        this.themes.fontSize(fontSize + "px");
      }
    },
    //修改进度
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    //jumpto
    jumpTo(href) {
      this.rendition.display(href);
      this.hiddenTitleAndMenuBar();
    },
    //隐藏标题栏和菜单栏以及导航栏
    hiddenTitleAndMenuBar() {
      this.ifshow = false;
      this.$refs.menuBar.hideSetting();
      this.$refs.menuBar.hideContent();
    }
  },
  mounted() {
    this.showEpub();
  }
};
</script>

<style lang="scss" scoped>
@import "assets/styles/global";
.ebook {
  position: relative;
  .read-wrapper {
    .mask {
      display: flex;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
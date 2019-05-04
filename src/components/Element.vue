<template>
<div>
  <el-row>
    <!-- zuobian -->
    <el-col :span="14" style="height:500px;">
      <el-table :data="tableData" style="width: 100%" stripe border @select="handleIsChange" size="mini">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" width="180"></el-table-column>
        <el-table-column label="颜色" width="180">
          <template slot-scope="scope">
            <span class="span-circle" :style="{background:scope.row.color}"></span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      <!-- fenye -->
      <div class="block">
        <el-pagination @current-change="handleCurrentChange" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="50">
        </el-pagination>
      </div>
    </el-col>
    <el-col :span="10">
      <!-- echart -->
      <div style="height:500px;" id="demoEchart"></div>
    </el-col>
  </el-row>

</div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      // 折线图y轴数据
      seriesData :[],
      rows: 15,
      page: 1,
      tableData: [],
      randomColor: ['#bcbcbc', '#419efc', '#616b70', '#bc3642', '#797ae3', '#2627ca', '#ca9d24', '#d3a28a', '#6cbc45', '#785afd']
    }
  },
  mounted: function () {
    this.findByParams();
    // this.loadEchart();
    // this.randomSeriesData(7);
  },
  methods: {
    //当勾选的复选框改变之后
    handleIsChange(rows, row) {
      let _that = this;
      //判断是否选中
      let selected = rows.length && rows.indexOf(row) !== -1;
      let randomColor = _that.randomColor;
      if (selected) {
        //弹出最后一个元素
        row.color = randomColor.pop();
        if (!row.color) {
          alert('选择不能超出10条！');
        }
        _that.randomColor = randomColor;
        // 生成折线图数据
        _that.seriesData.push({
          id: row.id,
          data: this.randomSeriesData(),
          type: 'line',
          // 折线图颜色
          itemStyle: {
            normal: {
              color: row.color,
              lineStyle: {
                color: row.color
              }
            }
          }
        });
        console.log(_that.seriesData);
      } else {
        //往后面加入一个元素
        randomColor.push(row.color);
        _that.randomColor = randomColor;
        row.color = '';
        for (let item in _that.seriesData) {
          if (_that.seriesData[item].id == row.id) {
            _that.seriesData.splice(item, 1);
          }
        }
        console.log(_that.seriesData);
      }
      // 将折线图颜色传给echart
      this.loadEchart(_that.seriesData);
    },
    handleCurrentChange(pageNo) {
      let _that = this;
      _that.page = pageNo;
      _that.findByParams();
    },
    findByParams: function () {
      let _that = this;
      let response = {
        "rows": 10,
        "page": 1,
        "tableData": [{
            "id": 1,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 2,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 3,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 4,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 5,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 6,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 7,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 8,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 9,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 10,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 11,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 12,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 13,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 14,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 15,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 16,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 17,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 18,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 19,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 20,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 21,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 22,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 23,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 24,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 25,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 26,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 27,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 28,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 29,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 30,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 31,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 32,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 33,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 34,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 35,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 36,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 37,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 38,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 39,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 40,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 41,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 42,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 43,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 44,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 45,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 46,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 47,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 48,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 49,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          },
          {
            "id": 50,
            "name": "王小虎",
            "address": "上海市普陀区金沙江路 1518 弄"
          }
        ]
      };
      // 实现分页
      let startIndex = (_that.page - 1) * _that.rows;
      let list = response.tableData.slice(startIndex, _that.page * _that.rows);
      //添加颜色
      _that.tableData = list.map(function (item) {
        // let color = _that.randomHexColor(response);
        item.color = '';
        return item;
      });
    },
    loadEchart(seriesData) {
      var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('demoEchart'));
      myChart.clear();
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: seriesData
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    // 随机生成数组数据
    randomSeriesData(length) {
      let i = 0
      let index = 0
      let temp = null
      let arr = [length]
      length = typeof (length) === 'undefined' ? 9 : length
      for (i = 1; i <= length; i++) {
        arr[i - 1] = i
      }
      for (i = 1; i <= length; i++) {
        index = window.parseInt(Math.random() * (length - i)) + i
        if (index != i) {
          temp = arr[i - 1]
          arr[i - 1] = arr[index - 1]
          arr[index - 1] = temp
        }
      }
      console.log(arr);
      return arr
    }

  }
}
</script>

<style lang="scss" scoped>
.span-circle {
  width: 20px;
  height: 20px;
  display: inline-block;
  border-radius: 50%;
}

.el-table .cell {
  display: flex;
}
</style>

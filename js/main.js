(function() {
  'use strict';

  var app = new Vue({
    el: '#app',
    data: {
      weeks: ['日', '月', '火', '水', '木', '金', '土'],
      calData: {year: 0,
                month: 0
      }
    },
    created: function() {
      const date = new Date();
      this.calData.year = date.getFullYear();
      this.calData.month = date.getMonth() + 1;
    },
    methods: {
      moveMonth(event) {
        if(event.target.id == 'prev') {
          if (this.calData.month == 1) {
            this.calData.month = 12;
            this.calData.year --;
          }
          else {
            this.calData.month --;
          }
        }
        else if(event.target.id == 'next') {
          if (this.calData.month == 12) {
              this.calData.year++;
              this.calData.month = 1;
          }
          else {
              this.calData.month++;
          }
        };
      }
  },
  computed: {

    calendar: function () {
      // 月初めの曜日
      var firstDay = new Date(this.calData.year, this.calData.month - 1, 1).getDay();
      // 月終わりの日にち
      var lastDate = new Date(this.calData.year, this.calData.month, 0).getDate();
      // 日にちのカウント
      var dayCount = 1;

      var calendar = [];
      for (var w = 0; w < 6; w++) {
        var week = [];

        // 空白行をなくすため
        if (lastDate < dayCount) {break;}

        for (var d = 0; d < 7; d++) {
            if (w == 0 && d < firstDay) {
                week[d] = {day: ''};
            } else if (w == 6 && lastDate < dayCount) {
                week[d] = {day: ''};
                dayCount++;
            } else if (lastDate < dayCount) {
                week[d] = {day: ''};
                dayCount++;
            } else {
                week[d] = {day: dayCount};
                dayCount++;
            }
        }
        calendar.push(week);
      }
      return calendar;
     }
    }
  })
})();
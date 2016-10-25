var QHDatePicker = React.createClass({
  getInitialState: function () {
    return {
      month: this.props.month - 1,
      year: this.props.year,
      day: this.props.day,
      date_selected: null
    };
  },
  getMonthText: function (month) {
    switch (month) {
      case 0: return 'Jan';
      case 1: return 'Feb';
      case 2: return 'Mar';
      case 3: return 'Apr';
      case 4: return 'May';
      case 5: return 'Jun';
      case 6: return 'Jul';
      case 7: return 'Aug';
      case 8: return 'Sep';
      case 9: return 'Oct';
      case 10: return 'Nov';
      case 11: return 'Dec';
      default: return '';
    }
  },
  getNextMonthText: function (month, year) {
    switch (month) {
      case 0: return 'Jan ' + year;
      case 1: return 'Feb ' + year;
      case 2: return 'Mar ' + year;
      case 3: return 'Apr ' + year;
      case 4: return 'May ' + year;
      case 5: return 'Jun ' + year;
      case 6: return 'Jul ' + year;
      case 7: return 'Aug ' + year;
      case 8: return 'Sep ' + year;
      case 9: return 'Oct ' + year;
      case 10: return 'Nov ' + year;
      case 11: return 'Dec ' + year;
      case 12: return 'Jan ' + (year + 1);
    }
  },
  getPrevMonthText: function (month, year) {
    switch (month) {
      case -1: return 'Dec' + (year - 1);
      case 0: return 'Jan ' + year;
      case 1: return 'Feb ' + year;
      case 2: return 'Mar ' + year;
      case 3: return 'Apr ' + year;
      case 4: return 'May ' + year;
      case 5: return 'Jun ' + year;
      case 6: return 'Jul ' + year;
      case 7: return 'Aug ' + year;
      case 8: return 'Sep ' + year;
      case 9: return 'Oct ' + year;
      case 10: return 'Nov ' + year;
      case 11: return 'Dec ' + year;
    }
  },
  showNextMonth: function () {
    var new_month = this.state.month + 1;
    var new_year = this.state.year;

    if ((this.state.month) === 11) {
      new_month = 0;
      new_year = this.state.year + 1;
    }

    this.setState({
      month: new_month,
      year: new_year
    });
  },
  showPreviousMonth: function () {
    var new_month = this.state.month - 1;
    var new_year = this.state.year;

    if ((this.state.month) === 0) {
      new_month = 11;
      new_year = this.state.year - 1;
	  }

    this.setState({
      month: new_month,
      year: new_year
    });
  },
  handleDayClick: function (date) {
    this.setState({
        date_selected: date
    });
  },
  render: function () {

    var date_display = '';

    if (this.state.date_selected != null) {
      var curr_date = this.state.date_selected;
      date_display = 'date selected: ' + (curr_date.month + 1) + '/' + curr_date.day + '/' + curr_date.year;
    }

    return (
      <div>
        <div className="qh_calendar_title">qh-datepicker</div>
        <table className="qh_calendar_month">
        	<tbody>
	          <tr>
	            <td className="qh_calendar_prev"><div onClick={this.showPreviousMonth }>{this.getPrevMonthText(this.state.month - 1, this.state.year)}</div></td>
	            <td className="qh_calendar_now"><div>{this.getMonthText(this.state.month)} {this.state.year}</div></td>
	            <td className="qh_calendar_next"><div onClick={this.showNextMonth }>{this.getNextMonthText(this.state.month + 1, this.state.year)}</div></td>
		        </tr>
	        </tbody>
        </table>
        <Days month={this.state.month} year={this.state.year} day={this.state.day} onClick={this.handleDayClick} />
        <div className="qh_show_date">
          {date_display}
        </div>
      </div>
    )
  }
});

var DayMonth = React.createClass({
  getInitialState: function () {
    return {
      current_selection: null
    }
  },
  handleDayClick: function (day) {
    this.setState({
      current_selection: day
    });

    this.props.onClick(day);
  },
  render: function () {
    var MAX_COLS = 7;
    var MAX_ROWS = 6;
    var month_disp = [];

    var month_data = this.props.data;

    for (var i = 0; i < MAX_ROWS; i++) {
      var week_info = month_data[i];

      var is_row_empty = true;
      var week_days = [];

      for (var w = 0; w < MAX_COLS; w++) {
          
        if (week_info[w] !== -1) {
          week_days.push(week_info[w]);
          is_row_empty = false;
        } else {
          week_days.push("");
        }
      }

      if (is_row_empty) {
        week_days = [];
      }

      var weekday_disp = [];
      var currDate = new Date();

      for (var k = 0; k < week_days.length; k++) {
        var gendate = week_days[k];

        var classNameToday = false;
        var classNameSelected = false;
        var className = "";

        if (gendate.day === currDate.getDate() && gendate.month === currDate.getMonth() && gendate.year === currDate.getFullYear()) {
          classNameToday = true;
        }

        if (this.state.current_selection != null) {
          if (gendate.day === this.state.current_selection.day && gendate.month === this.state.current_selection.month && gendate.year === this.state.current_selection.year) {
            classNameSelected = true;
          }
        }

        if (classNameToday && classNameSelected) {
          className = 'qh_calendar_today qh_calendar_selected';
        } else if (classNameToday && !classNameSelected) {
          className = 'qh_calendar_today';
        } else if (!classNameToday && classNameSelected) {
          className = 'qh_calendar_selected';
        } else {
          className = '';
        }

        weekday_disp.push(<td key={k} className={className} onClick={this.handleDayClick.bind(this, gendate) }>{gendate.day}</td>);
      }

      month_disp.push(<tr key={i}>{weekday_disp}</tr>);
    }

    return (
      <tbody>
        {month_disp}
      </tbody>
    )
  }
});

var Days = React.createClass({
  daysInMonth: function (month, year) {
    return new Date(year, month, 0).getDate();
  },
  handleDayClick: function (day) {
    this.props.onClick(day);
  },
  render: function () {
    var MAX_COLS = 7;
    var MAX_ROWS = 6;

    var x = new Array(MAX_COLS);

    for (var i = 0; i < MAX_ROWS; i++) {
      x[i] = new Array(MAX_COLS);
    }

    for (var i = 0; i < MAX_ROWS; i++) {
      for (var k = 0; k < MAX_COLS; k++) {
        x[i][k] = -1;
      }
    }

    var rows = [];
    var total_days = this.daysInMonth(this.props.month + 1, this.props.year);

    var current_month_date = new Date(this.props.year, this.props.month, 1);
    var current_month_last = new Date(this.props.year, this.props.month + 1, 0);

    var first_day_week = current_month_date.getDay();
    var last_day_week = current_month_last.getDay();

    var lookup = [];
    lookup[0] = 0;

    var FIRST_ROW = 0;
    var LAST_ROW = 5;

    var dayNumber = 1;

    for (var i = 0; i < MAX_ROWS; i++) {
      if (i == FIRST_ROW) {
        for (var n = first_day_week; n < MAX_COLS; n++) {
          x[i][n] = { day: dayNumber, month: this.props.month, year: this.props.year }
          dayNumber++;
        }

      } else if (i == LAST_ROW) {
        for (var n = 0; n <= last_day_week; n++) {
          if (dayNumber <= total_days) {
            x[i][n] = { day: dayNumber, month: this.props.month, year: this.props.year }
            dayNumber++;
          }
        }

      } else {
        for (var n = 0; n < MAX_COLS; n++) {
          if (dayNumber <= total_days) {
            x[i][n] = { day: dayNumber, month: this.props.month, year: this.props.year }
            dayNumber++;
          }
        }
      }
    }

    return (
      <table className="qh_calendar">
        <thead>
          <tr>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
        </thead>
        <DayMonth data={x} onClick={this.handleDayClick} />
      </table>
    )
  }
});

ReactDOM.render(
  <QHDatePicker year={2016} month={9} day={6} />,
  document.getElementById('content')
);

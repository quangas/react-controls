# react-controls
React bits and bobs

#QHDatePicker

Simple inline date picker using React

![qh-datepicker screenshot](https://github.com/quangas/react-controls/blob/master/qh-datepicker.png)

####QHDatePicker.jsx

To use this in React.net, rails and as a standalone single component, just reference the QHDatePicker.jsx in your javascript references and then include <QHDatePicker year={2016} month={10} day={21} /> in your render method.

```
<body>
  <div id="content" />
  
  <script src="react libary" />
  <script src="/path/to/QHDatePicker.js" />
</body>
```

####QHDatePicker.js

To use this control, you will need to do something like this:

```
var QHDatePicker = require('/path/to/QHDatePicker.js');
```

Then somehwere in your render method declare

```
<QHDatePicker year={2016} month={10} day={21} />
```

#####Options

If you want to use today's date, use can make a call to the javascript's new Date() then set the props to use this date.

e.g

```
var d = new Date();

year: d.getFullYear(),
month: d.getMonth() - 1,
day: d.getDate()
```

For React Native component, you would replace a **div** with **View** and for **table** you could use a **ListView** and apply the same logic.

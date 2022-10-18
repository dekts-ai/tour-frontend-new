jQuery.fn.calendarPicker = function (options) {
    // --------------------------  start default option values --------------------------
    if (!options.date) {
        options.date = new Date();
        options.date.toLocaleString('en-US', {timeZone: 'US/Arizona'})
    }

    if (typeof (options.years) == "undefined")
        options.years = 1;

    if (typeof (options.months) == "undefined")
        options.months = 3;

    var slidetoshow = 4;
    if ($(window).width() < 768) {
        slidetoshow = 2;
    }

    if (typeof (options.days) == "undefined")
        options.days = slidetoshow;

    if (typeof (options.showDayArrows) == "undefined")
        options.showDayArrows = true;

    if (typeof (options.useWheel) == "undefined")
        options.useWheel = true;

    if (typeof (options.callbackDelay) == "undefined")
        options.callbackDelay = 500;

    if (typeof (options.monthNames) == "undefined")
        options.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    if (typeof (options.monthvalues) == "undefined")
        options.monthvalues = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    if (typeof (options.dayNames) == "undefined")
        options.dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // --------------------------  end default option values --------------------------

    var calendar = {currentDate: options.date};
    calendar.options = options;

    //build the calendar on the first element in the set of matched elements.
    var theDiv  = this.eq(0);//$(this);
    var theDiv1 = jQuery(document).find('#dsel3');//$(this);
    theDiv.addClass("calBox");

    //empty the div
    theDiv.empty();

    var divYears  = $("<select>").addClass("selectYear");
    var divMonths = $("<select>").addClass("selectmonth");
    var divDays   = $("<div>").addClass("calDay");

    theDiv.append(divDays);
    theDiv1.append(divYears).append(divMonths);

    calendar.changeDate = function (date) {
        calendar.currentDate = date;

        var fillYears = function (date) {
            var year = date.getFullYear();
            var t = new Date();
            divYears.empty();
            var nc = options.years * 2 + 1;
            var currentYear = new Date().getFullYear();

            for (var i = currentYear; i <= currentYear + options.years; i++) {
                var d = new Date(date);
                d.setFullYear(i);
                var span = $("<option>").addClass("calElement").attr("millis", d.getTime()).html(i);
                if (d.getYear() == t.getYear())
                    span.addClass("today");
                if (d.getYear() == calendar.currentDate.getYear())
                    span.addClass("selected").attr("selected", "selected");
                divYears.append(span);
            }
        }

        var fillMonths = function (date) {
            var month = date.getMonth();
            var t = new Date();
            divMonths.empty();
            var oldday = date.getDay();
            var nc = options.months * 2 + 1;

            var currentMonth = new Date().getMonth();

            for (var i = currentMonth; i <= currentMonth + options.months; i++) {
                var d = new Date(date);
                var oldday = d.getDate();
                d.setMonth(i);

                if (d.getDate() != oldday) {
                    d.setMonth(d.getMonth() - 1);
                    d.setDate(28);
                }
                var span = $("<option>").addClass("calElement").attr("millis", d.getTime()).html(options.monthNames[d.getMonth()]).val(i + 1);
                if (d.getYear() == t.getYear() && d.getMonth() == t.getMonth())
                    span.addClass("today");
                if (d.getYear() == calendar.currentDate.getYear() && d.getMonth() == calendar.currentDate.getMonth())
                {
                    span.addClass("selected").attr("selected", "selected");

                }
                divMonths.append(span);

            }
        }

        var fillDays = function (date) {
            var day = date.getDate();
            var t = new Date();
            divDays.empty();
            var nc = options.days * 2 + 1;
            var w = parseInt((theDiv.width() - 4 - (options.showDayArrows ? 12 : 0) - (nc) * 4) / (nc - (options.showDayArrows ? 2 : 0))) + "px";
            w = (w === "0px") ? "171px" : w;

            for (var i = -options.days; i <= options.days; i++) {
                var d = new Date(date);
                d.setDate(day + i)
                
                var startDate = d.toDateString();
                var span = $("<div>").addClass("calElement").attr("millis", d.getTime())
                if (i == -options.days && options.showDayArrows) {
                    span.addClass("prev")
                } else if (i == options.days && options.showDayArrows) {
                    span.addClass("next")
                } else {
                    span.html("<div class=time-item><label class=dayNumber>" + d.getDate() + "<span>" + options.dayNames[d.getDay()]).css("width", w) + "</span></label></div>";
                    if (d.getYear() == t.getYear() && d.getMonth() == t.getMonth() && d.getDate() == t.getDate())
                    {
                        span.addClass("today");
                        let gm = d.getMonth();
                        if (gm == 0) {
                            m = 1
                        }
                        if (gm == 1) {
                            m = 2
                        }
                        if (gm == 2) {
                            m = 3
                        }
                        if (gm == 3) {
                            m = 4
                        }
                        if (gm == 4) {
                            m = 5
                        }
                        if (gm == 5) {
                            m = 6
                        }
                        if (gm == 6) {
                            m = 7
                        }
                        if (gm == 7) {
                            m = 8
                        }
                        if (gm == 8) {
                            m = 9
                        }
                        if (gm == 9) {
                            m = 10
                        }
                        if (gm == 10) {
                            m = 11
                        }
                        if (gm == 11) {
                            m = 12
                        }
                        $("#realdatevalue").val("" + d.getDate() + "-" + m + "-" + d.getUTCFullYear());
                        $("#date").val(d.getDate());
                        $("#month").val(options.monthNames[d.getMonth()]);
                        $("#day").val(options.dayNames[d.getDay()]);
                        $("#year").val(d.getUTCFullYear());

                    } else {
                        var today_vue = new Date();
                        var current_year = $(document).find('.date-booking-row #year').val();
                        if(current_year != ''){
                            var lastDateOfYear = new Date(current_year, 11, 32);
                            if(d.getTime() > lastDateOfYear.getTime() ){
                                span.addClass("slider-not-active");
                                setTimeout(function () {
                                    $(document).find('#dsel2 .calDay .calElement.next').addClass("slider-not-active");
                                }, 50);
                            }
                        }
                        
                        if(d.getTime() < today_vue.getTime()){
                            span.addClass("slider-not-active");
                            $(document).find('.calElement.prev').addClass("slider-not-active");
                        }
                    }
                    if (d.getYear() == calendar.currentDate.getYear() && d.getMonth() == calendar.currentDate.getMonth() && d.getDate() == calendar.currentDate.getDate())
                    {
                        span.addClass("selected");
                        let gm = d.getMonth();
                        if (gm == 0) {
                            m = 1
                        }
                        if (gm == 1) {
                            m = 2
                        }
                        if (gm == 2) {
                            m = 3
                        }
                        if (gm == 3) {
                            m = 4
                        }
                        if (gm == 4) {
                            m = 5
                        }
                        if (gm == 5) {
                            m = 6
                        }
                        if (gm == 6) {
                            m = 7
                        }
                        if (gm == 7) {
                            m = 8
                        }
                        if (gm == 8) {
                            m = 9
                        }
                        if (gm == 9) {
                            m = 10
                        }
                        if (gm == 10) {
                            m = 11
                        }
                        if (gm == 11) {
                            m = 12
                        }
                        $("#realdatevalue").val("" + d.getDate() + "-" + m + "-" + d.getUTCFullYear());
                        $("#date").val(d.getDate());
                        $("#month").val(options.monthNames[d.getMonth()]);
                        $("#day").val(options.dayNames[d.getDay()]);
                        $("#year").val(d.getUTCFullYear());

                    }
                }
                divDays.append(span);
            }
        }

        var deferredCallBack = function () {
            if (typeof (options.callback) == "function") {
                if (calendar.timer)
                    clearTimeout(calendar.timer);

                calendar.timer = setTimeout(function () {
                    options.callback(calendar);
                }, options.callbackDelay);
            }
        }

        fillYears(date);
        fillMonths(date);
        fillDays(date);
        deferredCallBack();
    }

    theDiv.change(function (ev) {
        var ev = $(ev.target).closest('select').find(":selected");
        if (ev.hasClass("calElement")) {
            calendar.changeDate(new Date(parseInt(ev.attr("millis"))));
        }
    });

    theDiv.click(function (ev) {
        var el = $(ev.target).closest(".calElement");
        if (el.hasClass("calElement")) {
            calendar.changeDate(new Date(parseInt(el.attr("millis"))));
        }
    });

    theDiv1.change(function (ev) {
        var ev = $(ev.target).closest('select').find(":selected");
        if (ev.hasClass("calElement")) {
            calendar.changeDate(new Date(parseInt(ev.attr("millis"))));
        }
    });

    theDiv1.click(function (ev) {
        var el = $(ev.target).closest(".calElement");
        if (el.hasClass("calElement")) {
            calendar.changeDate(new Date(parseInt(el.attr("millis"))));
        }
    });

    calendar.changeDate(options.date);

    return calendar;
};
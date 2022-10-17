$(document).ready(function () {
    $(function () {
        const d = new Date();
        let totalmonths = d.getMonth() + 1;
        let addTotalmonths = totalmonths - 12;
        let finalMonths = 11
        if(Math.abs(addTotalmonths) != ''){
            finalMonths = Math.abs(addTotalmonths);
        }

        $('[data-toggle="tooltip"]').tooltip()
        var calendarPicker2 = $("#dsel2").calendarPicker({
            years: 0,
            months: finalMonths,
            showDayArrows: true,
            callback: function (cal) {
                $("#wtf").html("Selected date: " + cal.currentDate);
            }
        });
        calendarPicker2.changeDate(new Date());
    });
});
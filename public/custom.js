$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
});

function calendarPickerFn() {
    const d = new Date('2022-12-19');
    let totalmonths = d.getMonth() + 1;
    let addTotalmonths = totalmonths - 12;
    let finalMonths = 11
    if(Math.abs(addTotalmonths) != ''){
        finalMonths = Math.abs(addTotalmonths);
    }

    var calendarPicker2 = $("#dsel2").calendarPicker({
        years: 1,
        months: finalMonths,
        showDayArrows: true,
        callback: function (cal) {
            $("#wtf").html("Selected date: " + cal.currentDate);
        }
    });

    calendarPicker2.changeDate(new Date());
}

window.calendarPickerFn = calendarPickerFn;

$('.owl-carousel').owlCarousel({
    loop: false,
    margin: 0,
    nav: true,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    responsive: {
        0: {
            items: 2
        },
        480: {
            items: 4
        },
        575: {
            items: 5
        },
        768: {
            items: 7
        }
    }
});

//Get flag for phone number
$('#phonenumber').each(function (index) {
    var input = document.querySelector("#phonenumber");
    if (input !== 'undefined') {
        window.intlTelInput(input, {
            separateDialCode: true,
        });
    }
});

$('#phonenumber, #cardnumber, #expirydate, #cvv').keypress(function (event) {
    var keycode = event.which;
    if (!(event.shiftKey == false && (keycode == 43 || keycode == 46 || keycode == 8 || keycode == 37 || keycode == 39 || (keycode >= 48 && keycode <= 57)))) {
        event.preventDefault();
    }
});

//Input validation text only
$('#fullname, #nameoncard').bind('keyup blur', function () {
    var node = $(this);
    node.val(node.val().replace(/[^A-Za-z ']/g, ''));
});

$('#cardnumber').mask('0000 0000 0000 0000');
$('#expiration').mask('00/00');
$('#cvc').mask('000');

$(".makeaayment-btn").click(function () {
    var form = $("#payment-form");
    form.validate({
        errorElement: 'span',
        errorClass: 'help-block',
        success: function (label) {
            label.text("ok!").addClass("success");
        },
        rules: {
            fullname: {
                required: true,
            },
            phonenumber: {
                required: true,
                minlength: 9,
                maxlength: 14,
            },
            emailaddress: {
                required: true,
                email: true
            },
            getemailupdates: {
                required: true,
            },
            cancellationsterms: {
                required: true,
            },
            cardnumber: {
                required: true,
                minlength: 16,
                maxlength: 16,
            },
            expiration: {
                required: true,
                minlength: 5,
                maxlength: 5,
            },
            cvv: {
                required: true,
                minlength: 3,
                maxlength: 3,
            },
            countryregion: {
                required: true,
            },
        },
    });
});

// Begin Inspectlet Asynchronous Code
(function () {
    window.__insp = window.__insp || [];
    __insp.push(['wid', 755343795]);
    var ldinsp = function () {
        if (typeof window.__inspld != "undefined") return; window.__inspld = 1; var insp = document.createElement('script'); insp.type = 'text/javascript'; insp.async = true; insp.id = "inspsync"; insp.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://cdn.inspectlet.com/inspectlet.js?wid=755343795&r=' + Math.floor(new Date().getTime() / 3600000); var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(insp, x);
    };
    setTimeout(ldinsp, 0);
})();
// End Inspectlet Asynchronous Code
// JavaScript Document

$(function () {
    $('#contact').validate({
        errorElement: "label",
        wrapper: "td",
        errorPlacement: function (error, element) {
            error.insertBefore(element.parent().parent());
            error.wrap("<tr class='error'></tr>");
            $("<td></td>").insertBefore(error);
        },

        rules: {
            fname: {
                required: true,
                minlength: 2
            },
            sname: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },

        messages: {
            fname: {
                required: "Please provide your Forename.",
                minlength: jQuery.format("At least {0} characters required.")
            },
            sname: {
                required: "Please provide your Surname.",
                minlength: jQuery.format("At least {0} characters required.")
            },
            email: {
                required: "Please provide your Email.",
                email: "Please provide a valid Email."
            },
            message: {
                required: "Please provide a Message.",
                minlength: jQuery.format("At least {0} characters required.")
            }
        },

        submitHandler: function (form) {
            $("#submit").attr("value", "Sending...");
            $(form).ajaxSubmit({
                success: function (responseText, statusText, xhr, $form) {
                    $(form).slideUp("slow");
                    $("#response").html(responseText).hide().slideDown("slow");
                }
            });
            return false;
        }
    });
});

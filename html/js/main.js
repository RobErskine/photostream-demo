$(function() {
    $("form").on("submit", function(event) {
        event.preventDefault();
        var post = new FormData($("form")[0]);
        $.ajax({
            url: "/guestEntries/saveEntry",
            type: "POST",
            data: post,
            contentType: !1,
            processData: !1,
            success: function(data, textStatus, jqXHR) {},
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus);
            }
        });
    });
    var upload = $('.upload-photo input[type="file"]');
    upload.on("change", function() {
        $(".upload-photo-form").submit();
    }), $("button.upload").on("click", function() {
        upload.click();
    }), $(".upload-photo-form").on("submit", function(event) {
        event.preventDefault(), $(".icon-camera").removeClass("active"), $(".icon-spinner").addClass("active");
    });
});
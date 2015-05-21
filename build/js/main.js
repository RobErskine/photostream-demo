$(function() {
    //$("form").ajaxForm(options);
    $('form').on('submit',function(event){
        event.preventDefault();
        var post = new FormData($('form')[0]);

        $.ajax({
            url:'/guestEntries/saveEntry',
            type:'POST',
            data: post,
            contentType: false,
            processData:false,
            success: function(data, textStatus, jqXHR) {
                //console.log(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
                //if fails      
                console.log(textStatus);
            }
        });
    });

    var upload = $('.upload-photo input[type="file"]');

    upload.on("change", function() {
        //$('.upload-photo-form input[type="submit"]').click();
        $('.upload-photo-form').submit();
    });

    $("button.upload").on("click", function() {
        upload.click();
    });

    $(".upload-photo-form").on("submit", function(event) {
        event.preventDefault(); 
        $(".icon-camera").removeClass("active");
        $(".icon-spinner").addClass("active");
    });
});

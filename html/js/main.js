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
                $('button.upload').removeClass('loading');
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
        $(this).addClass('loading');
    });

    $(".upload-photo-form").on("submit", function(event) {
        event.preventDefault(); 
    });

    //var socket = io('http://45.55.245.33', {
    var socket = io('localhost:8000', {
        transports: ['websocket']
    });

    var newPhotosBox = $('.new-photos');
    var newPhotos = [];

    socket.on('photo', function (data) {
        //$('#photos').prepend('<li><img src="' + data + '"></li>');
        newPhotos.push(data);
    });

    setInterval(function(){
        if(newPhotos.length > 0){
            if(newPhotos.length === 1){
                newPhotosBox.find('div').html('<p><strong>+</strong> 1 new photo</p>');
            }
            else{
                newPhotosBox.find('div').html('<p><strong>+</strong> '+newPhotos.length+' new photos');
            }
            newPhotosBox.addClass('active');
        }
        else{
            newPhotosBox.removeClass('active');
        }

        var currentScroll = $(document).scrollTop();

        if ( currentScroll <= $('header').height() ){
            $('.new-photos').css({
                'top': $('header').height()
            });
        }
        else{
            $('.new-photos').css({
                'top': 0
            });
        }

    },100);

    newPhotosBox.on('click',function(){
        for(i=0;i<newPhotos.length;i++){
            $('#photos').prepend('<li><img src="' + newPhotos[i] + '"></li>');
        }
        newPhotosBox.removeClass('active');
        newPhotos = [];

        $('html,body').animate({
            scrollTop: 0
        },333);
    });
});

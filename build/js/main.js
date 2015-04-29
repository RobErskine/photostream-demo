$(function(){

    var options = { 
        success: showResponse  // post-submit callback 
    };

    $('form').ajaxForm(options);

    function showResponse(responseText, statusText, xhr, $form)  { 
        console.log('status: ' + statusText + '\n\nresponseText: \n' + responseText + 
            '\n\nThe output div should have already been updated with the responseText.'); 

        //$form.parents('li').addClass('submitted');
        $('.icon-camera').addClass('active');
        $('.icon-spinner').removeClass('active');
    }

    var upload = $('.upload-photo input[type="file"]');

    $('button.upload').on('click',function(){
        upload.click();

        upload.on('change',function(){
            $('.upload-photo-form input[type="submit"]').click();
        });
    });

    $('.upload-photo-form').on('submit',function(event){
        event.preventDefault();

        $('.icon-camera').removeClass('active');
        $('.icon-spinner').addClass('active');
    });

    /*/////////////////////////
    // 60fps scroll paints
    /////////////////////////*/
    var body = $('body');
    var timer;
    $(window).on("scroll", function(){
        if(! body.hasClass('disable-hover')){
            body.addClass('disable-hover');
        }
        timer = setTimeout(function(){
            body.removeClass('disable-hover');
        }, 250);
    }, false);


    /*/////////////////////////
    // Split up query strings
    /////////////////////////*/
    var getQueryVariable = function(variable){
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] === variable){
                return pair[1];
            }
        }

        return(false);
    };

    /*/////////////////////////
    // open data-target in new tabs
    /////////////////////////*/
    var popupWindow = function(){
        $("a[data-popup]").on("click", function(event){
            event.preventDefault();
            window.open($(this)[0].href);
        });
    };
    popupWindow();
});

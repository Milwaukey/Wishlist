// COOOOKIE
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


// Menu
$('.menu_link').click(function(e) {

    $(this).toggleClass('close');
    $('nav').toggleClass('open');

    $('.menu_link').toggleClass('color')

});


function logout(){

    $.ajax({

        url : 'http://127.0.0.1:8000/accounts/rest-auth/logout/',
        method : 'POST',
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        processData: false,
        contentType: false

    })
    .done(function(response){

        if( response.detail ){

            location.href = '../login'

        }
        
    })
    .fail(function(response){
        
        console.log(response)

    })

}
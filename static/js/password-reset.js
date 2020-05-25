
function passwordReset(){
    $('.error_message').empty()

    var formData = new FormData( document.querySelector('form') )

    $.ajax({

        url : 'http://127.0.0.1:8000/accounts/rest-auth/password/reset/',
        method : 'POST',
        dataType: 'JSON',
        data : formData,
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        processData: false,
        contentType: false
        
    })
    .done(function(data){

        console.log(data)

        if(data.detail){
            location.href = '../'
        }
    })
    .fail(function(data){

            let response = JSON.parse(data.responseText);

            if( response.email ){
                for(let i = 0; i < response.email.length; i++){
                    console.log(response.email[i])
                    $('.error_message').append('<li>' + response.email[i] + '</li>')
                }
            }

    })
}
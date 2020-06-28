
function login(){
    $('.error_message').empty()

    var formData = new FormData( document.querySelector('form') )

    $.ajax({

        url : 'http://127.0.0.1:8000/accounts/rest-auth/login/',
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

        if(data.key){
            location.href = '../profile'
        }
    })
    .fail(function(data){

        console.log(data)

            let response = JSON.parse(data.responseText);

            if( response.username ){
                for(let i = 0; i < response.username.length; i++){
                    console.log(response.username[i])
                    $('.error_message').append('<li>' + response.username[i] + '</li>')
                }
            }

            if( response.password ){
                for(let i = 0; i < response.password.length; i++){
                    console.log(response.password[i])
                    $('.error_message').append('<li>Password: ' + response.password[i] + '</li>')
                }
            }

    })
}
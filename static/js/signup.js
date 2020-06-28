

function signup(){
    $('.error_message').empty()

    var formData = new FormData( document.querySelector('form') )

    $.ajax({

        url : 'http://127.0.0.1:8000/accounts/rest-auth/registration/',
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

            let response = JSON.parse(data.responseText);
            // console.log(data)

            if( response.username ){
                for(let i = 0; i < response.username.length; i++){
                    console.log(response.username[i])
                    $('.error_message').append('<li>Username: ' + response.username[i] + '</li>')
                }
            }

            if( response.email ){
                for(let i = 0; i < response.email.length; i++){
                    console.log(response.email[i])
                    $('.error_message').append('<li>Email: ' + response.email[i] + '</li>')
                }
            }

            if( response.password1 ){
                for(let i = 0; i < response.password1.length; i++){
                    console.log(response.password1[i])
                    $('.error_message').append('<li>Password: ' + response.password1[i] + '</li>')
                }
            }

            if( response.password2 ){
                for(let i = 0; i < response.password2.length; i++){
                    console.log(response.password2[i])
                    $('.error_message').append('<li>Confirm Password: ' + response.password2[i] + '</li>')
                }
            }

    })

}


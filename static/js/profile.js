$(document).ready(function() {
    
    $.ajax({

        url : 'http://127.0.0.1:8000/accounts/rest-auth/user/',
        method : 'GET',

    })
    .done(function(reponse){

        // console.log(reponse)

            let account = `
                <div class="username">Username: ${reponse.username}</div>
                <div class="first_name>Firstname: ${reponse.first_name}</div>
                <div class="last_name">Lastname: ${reponse.last_name}</div>
                <div class="email">Email:${reponse.email} </div>
            `;

            let updateAccount = `
                    <input name="pk" type="hidden" value="${reponse.pk}">
                    <label for="username">Username</label>
                        <input name="username" type="text" value="${reponse.username}">
                    <label for="first_name" >Firstname</label>
                        <input name="first_name" type="text" value="${reponse.first_name}">
                    <label for="last_name">Lastname</label>
                        <input name="last_name" type="text" value="${reponse.last_name}">
                    <button>Save</button>
            `




            $('#accountContainer').prepend(account)
            $('#frmUpdateAccount').prepend(updateAccount)



    })
    .fail(function(err){

        // console.log(err)

    })


});


$('.updateBtn').click(function(){
    $('.updateAccount').toggle()

    $('#frmUpdateAccount').submit(function(){

        //  AJAX FOR UPDATE
        var formData = new FormData( document.querySelector('#frmUpdateAccount') )

        $.ajax({

            url : 'http://127.0.0.1:8000/accounts/rest-auth/user/',
            method : 'put',
            data : formData,
            dataType: 'JSON',
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
            processData: false,
            contentType: false


        }).done(function(response){

            if(response.username){
                location.href = '../profile'
            }

        }).fail(function(response){

            console.log(response)

        })

        return false;

    })



})



$('.updatePasswordBtn').click(function(){
    $('#frmUpdatePassword').toggle()
})

$('#frmUpdatePassword').submit(function(){

    $('.error_message').empty()

    var formData = new FormData( document.querySelector('#frmUpdatePassword') )

    $.ajax({

        url : 'http://127.0.0.1:8000/accounts/rest-auth/password/change/',
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

        $('#frmUpdatePassword')[0].reset()
        $('.error_message').append('<li>' + data.detail + '</li>')

        // if(data.detail){
        //     location.href = '../profile'
        // }
    })
    .fail(function(data){

            let response = JSON.parse(data.responseText);

            console.log(response)

            if( response.new_password1 ){
                for(let i = 0; i < response.new_password1.length; i++){
                    // console.log(response.new_password1[i])
                    $('.error_message').append('<li>' + response.new_password1[i] + '</li>')
                }
            }

            if( response.new_password2 ){
                for(let i = 0; i < response.new_password2.length; i++){
                    // console.log(response.new_password2[i])
                    $('.error_message').append('<li>' + response.new_password2[i] + '</li>')
                }
            }

    })


    return false;

})
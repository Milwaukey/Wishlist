$(document).ready(function() {
    
    $.ajax({

        url : 'http://127.0.0.1:8000/accounts/rest-auth/user/',
        method : 'GET',

    })
    .done(function(reponse){

        // console.log(reponse)

            let account = `
                <div class="username"><span>Username:</span> ${reponse.username}</div>
                <div class="first_name"><span>First name:</span> ${reponse.first_name}</div>
                <div class="last_name"><span>Last name:</span> ${reponse.last_name}</div>
                <div class="email"><span>Email:</span>${reponse.email} </div>
            `;

            let updateAccount = `
            <div class="createWishlistInnerFrm">
            <h1>What new information can you provide us with?</h1>
                        <input name="pk" type="hidden" value="${reponse.pk}">
                        <div class="inputArea">
                            <input class="newUsername" name="username" type="text" value="${reponse.username}">
                            <input class="newFirstname" name="first_name" type="text" value="${reponse.first_name}">
                            <input class="newLastname" name="last_name" type="text" value="${reponse.last_name}">
                        </div>
                        <button>Save</button>
            </div>
            `;


            $('#accountContainer').prepend(account)
            $('#frmUpdateAccount').prepend(updateAccount)



    })
    .fail(function(err){

        // console.log(err)

    })


});


$('.updateBtn').click(function(){
    $('.updateAccount').toggle()
    $('.updatePasswordBtn').toggle()
})

$('#frmUpdateAccount').submit(function(){

    let username = $(".newUsername").val();
    let firstName = $(".newFirstname").val();
    let lastName = $(".newLastname").val();

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

        $('.username').text('Username: '+username)
        $('.first_name').text('Firstname: '+firstName)
        $('.last_name').text('Lastname: '+lastName)

        $('.updateAccount').hide()


    }).fail(function(response){

        console.log(response)

    })

    return false;

})














$('.updatePasswordBtn').click(function(){
    $('#frmUpdatePassword').toggle()
    $('.updateBtn').toggle();
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
        $('#frmUpdatePassword').hide()

        setTimeout(function(){
            $('.error_message').hide()
            $('.error_message').val('')
        }, 1000)

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
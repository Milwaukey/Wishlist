let userID;
let wishlistPlacedInArray;

$(document).ready(function() {

    $.ajax({

        url : 'http://127.0.0.1:8000/accounts/rest-auth/user/',
        method : 'GET',

    }).done(function(response){
        userID = response.pk
    })

    $.ajax({
        url : 'http://127.0.0.1:8000/api/wishlists/',
        method : 'GET',
    })
    .done(function(reponse){
        console.log(reponse)
        for(let i = 0; i < reponse.length; i++ ){
            let wishlist = `<a href="../mywishlist/${reponse[i].id}"><div>Title: ${reponse[i].title}</div></a>`;
            $('#wishlistContainer').prepend(wishlist)
        }

        
        $('#frmCreateWishlist').prepend('<input name="user" type="hidden" value="'+ userID +'">')


        


        // UPDATE WISHLIST

    })
    .fail(function(err){
        console.log(err)
    })
});


$('.createWishlist').click(function(){
    
    $('#frmCreateWishlist').toggle()
    
    // API CREATE WISHLIST
    
    $('#frmCreateWishlist').submit(function(){
        var formData = new FormData( document.querySelector('#frmCreateWishlist') )
    
            $.ajax({

                url : 'http://127.0.0.1:8000/api/wishlists/',
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
            .done(function(){

                location.href = '../mywishlist'

            })
            .fail(function(data){

                    let response = JSON.parse(data.responseText);
                    console.log(response)

                    // if( response.username ){
                    //     for(let i = 0; i < response.username.length; i++){
                    //         console.log(response.username[i])
                    //         $('.error_message').append('<li>' + response.username[i] + '</li>')
                    //     }
                    // }

            })
    
        return false;
    
    })


})

// STRIPS OUT THE ID/PK
const value = $(location). attr("href");
const parts = value.split('/');
const wishlistID = parts[4];

let userID; 

let wishlistName;

// ########################################################################

$(document).ready(function() {


    $.ajax({
        url : 'http://127.0.0.1:8000/accounts/rest-auth/user/',
        method : 'GET',
    })
    .done(function(reponse){
        userID = reponse.pk;
        $('#frmAddNewWish').prepend(`<input type="hidden" name="user" value="${reponse.pk}">`)
        $('#frmAddNewWish').prepend(`<input type="hidden" name="wishlist_id" value="${wishlistID}">`)
    })

    // ########################################################################

    $.ajax({

        url : 'http://127.0.0.1:8000/api/wishlists/'+wishlistID+"/wishes/",
        method : 'GET',

    })
    .done(function(response){

        for(let i = 0; i < response.length; i++ ){

            // let wish = `<div class="wishWrapper wishID_${response[i].id}">
            
            // <div class="wishID">${response[i].id}</div> <div class="wishTitle">${response[i].title}</div> <div class="wishDescription">${response[i].description}</div>
            
            // <button class="updateWish">UPDATE</button>
            // <button class="deleteWish">DELETE</button>

            // </div>`;

            let wish = `
            
            <div class="wishWrap wishID_${response[i].id}">

                <div class="wishContentWrapper">
                    <div class="imageHere"></div>


                <div>
                    <h3 class="wishTitle">${response[i].title}</h3>
                    <div class="wishDescription">${response[i].description}</div>
                </div>

                </div>
                    <div class="deleteWish" onclick="deleteWish(${response[i].id})"><i class="fas fa-trash"></i></div>

                    </div>
                    `;

            

            $('#wishesContainer').prepend(wish)

        }
    })
    .fail(function(err){

        console.log(err)

    })


    // ########################################################################


    $.ajax({
        url : 'http://127.0.0.1:8000/api/wishlists/'+wishlistID,
        method : 'GET',
    })
    .done(function(reponse){
        console.log(reponse)

        $('#wishlistName').html(`${reponse.title}`);

        $('#frmUpdateWishlistInfo').prepend(`

        <div class="createWishlistInnerFrm">
        <h1>Update your new wishlist!</h1>
        
            <input type="hidden" name="id" value="${reponse.id}">
            <input type="hidden" name="user" value="${reponse.user}">

            <div class="radioBox">
            <label>Privat</label>
                <input type="radio" id="private_public" name="is_private" value="True">
            <label>Public</label>
                <input type="radio" id="private_public" name="is_private" value="False" checked>
            </div>

            <div class="inputArea">
                <input name="title" type="text" value="${reponse.title}">
            </div>

            <button>Save</button>

        </div>

        `);


        $('.updateWishlist').click(function(){

            // Toggle
            $('#frmUpdateWishlistInfo').toggle();

            $('#frmUpdateWishlistInfo').submit(function(){

                var formData = new FormData( document.querySelector('#frmUpdateWishlistInfo') )

                $.ajax({
                    url : 'http://127.0.0.1:8000/api/wishlists/'+ wishlistID +'/',
                    method : 'PUT',
                    dataType : 'JSON',
                    data : formData,
                    beforeSend: function(xhr, settings) {
                        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        }
                    },
                    processData: false,
                    contentType: false

                }).done(function(){

                    location.href = '../'+wishlistID

                }).fail(function(response){

                    console.log(response)

                })


                return false;
            })


        })




        

    })
    .fail(function(err){
        console.log(err)
    })





});


// ########################################################################


// $('#frmDeleteWishlist').submit(function(){

//     $.ajax({

//         url : 'http://127.0.0.1:8000/api/wishlists/'+ wishlistID+'/',
//         dataType : 'JSON',
//         // data : formData,
//         type : 'DELETE',
//         beforeSend: function(xhr, settings) {
//             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//         },
//         processData: false,
//         contentType: false

//     }).done(function(response){

//         location.href = '../'
        
        
//     }).fail(function(response){
        
//         console.log(response)

//     })

//     return false;


// })

// ########################################################################

$('.addNewWish').click(function(){

    // Toggle
    $('#frmAddNewWish').toggle();

})

// ajax on submit
$('#frmAddNewWish').submit(function(){

    var formData = new FormData( document.querySelector('#frmAddNewWish') )

    $.ajax({
        url : 'http://127.0.0.1:8000/api/wishlists/'+ wishlistID +'/wishes/',
        method : 'POST',
        dataType : 'JSON',
        data : formData,
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        processData: false,
        contentType: false


    }).done(function(response){

        location.href = '../'+wishlistID
        
    }).fail(function(response){
        
        console.log(response)
        
    })


    return false;

})


// ########################################################################

$("body").delegate(".updateWish", "click", function(){
    let wishID = $(this).parent().find('.wishID').text()
    let wishTitle = $(this).parent().find('.wishTitle').text()
    let wishDescription = $(this).parent().find('.wishDescription').text()

    $('#frmUpdateWish').toggle()
    $('.frmContentUpdateWish').empty()

    let wishUpdate = `

    <label>Title</label>
    <input name="title" type="text" value="${wishTitle}">
    
    <label>Description</label>
    <input name="description" type="text" value="${wishDescription}">

    <input name="wishlist_id" type="hidden" value="${wishlistID}">
    <input name="user" type="hidden" value="${userID}">
    <input name="id" type="hidden" value="${wishID}">

    `;

    $('.frmContentUpdateWish').prepend(wishUpdate)


    $('#frmUpdateWish').submit(function(){

        let wishID = $('#frmUpdateWish input[name="id"]').val()
        let wishTitle = $('#frmUpdateWish input[name="title"]').val()
        let wishDescription = $('#frmUpdateWish input[name="description"]').val()

        console.log(wishID)

        var formData = new FormData( document.querySelector('#frmUpdateWish') )

        // AJAX
        $.ajax({
            url : 'http://127.0.0.1:8000/api/wishes/'+wishID+'/',
            dataType : 'JSON',
            method : 'PUT',
            data : formData,
            beforeSend: function(xhr, settings) {
                if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                }
            },
            processData: false,
            contentType: false
    
        }).done(function(response){ 

            $('#frmUpdateWish').hide()
            $('.frmContentUpdateWish').empty()

            $(`.wishID_${wishID} .wishTitle`).empty().text(wishTitle)
            $(`.wishID_${wishID} .wishDescription`).empty().text(wishDescription)
            
            // location.href = '../'+wishlistID
        
        }).fail(function(response){
            console.log(response)
        }) 

        return false;

    })



});

//  UPDATE WISH  - trigger delegate function
$('button.updateWish').click(function(){})








function deleteWish(wishID){

    $.ajax({

        url : 'http://127.0.0.1:8000/api/wishes/'+wishID+'/',
        dataType : 'JSON',
        type : 'DELETE',
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        processData: false,
        contentType: false

    }).done(function(response){

        $(`.wishID_${wishID}`).remove()
        // location.href = '../'+wishlistID
        
        
    }).fail(function(response){
        
        console.log(response)


    })

    return false;



};

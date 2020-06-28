// STRIPS OUT THE ID/PK
const value = $(location). attr("href");
const parts = value.split('/');
const userID = parts[4];

const url = new URL(value);

console.log(url + 'wishlist/')
// const username = url.searchParams.get("username");


// if( !username ){

//     window.location.href = '../../search'
// }

// $('h1').text(username +'\'s wishlists!')

$(document).ready(function() {

    $.ajax({
        url : 'http://127.0.0.1:8000/api/allwishlists?id='+userID,
        method : 'GET',
    })
    .done(function(data){

        for(let i = 0; data.length > i; i++){
            
            let eachSearchResult = `<div class="wishWrap"><a href="${url}wishlist/${data[i].id}?wname=fødselsdag">${data[i].title} </a></div>`

            // APPEND SEARCH INPUTS
            $('#usersWishlist').prepend(eachSearchResult)

        }

        if( data == '' ){

            console.log('EMPTY')
            window.location.href = '../../search'
        }

    })


})
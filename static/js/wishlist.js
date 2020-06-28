// STRIPS OUT THE ID/PK
const value = $(location). attr("href");
const parts = value.split('/');
const wishlistID = parts[6];


let wish;
let wishContainer = $('#wishContainer');
let myUserID = parseInt(userID)

$(document).ready(function() {


    $.ajax({

        url : 'http://127.0.0.1:8000/api/wishlists/'+wishlistID+'/wishes/',

    }).done(function(data){

                        

                        $.ajax({

                            url : 'http://127.0.0.1:8000/api/reservedWishes/',

                        }).done(function(reservedWishes){

                            console.log(reservedWishes)
                            
                            for(let i = 0; data.length > i; i++){
                                
                                // console.log(data[i])

                                let wishID = data[i].id

                                if(reservedWishes.some(rUser => rUser.wish === wishID)){

                                    let reservedWishID;

                                    if(reservedWishes.some(rUser => rUser.user === myUserID && rUser.wish === wishID)){

                                        for(let x = 0; reservedWishes.length > x; x++){

                                            // console.log(reservedWishes[x])

                                            if( reservedWishes[x].wish === data[i].id ){

                                                
                                                wish = `<div class="wish wish_id_${data[i].id}"> <h4>${data[i].title}</h4> <div>${data[i].description}</div>  
                                                
                                                <form id="frmRemoveResered" class="wishReserve_${reservedWishes[x].id}">
                                                    <input type="text" name="user" value="${myUserID}" hidden>
                                                    <input type="text" name="wish" value="${data[i].id}" hidden>
            
                                                <button>REMOVE RESERVATION</button> 
                                                </form>
                                                
                                                
                                                </div>`;
                                           
                                                // console.log(data[i])
                                                // console.log(userID)
                                                // console.log('Ønsket er reserveret AF DIG')
        
                                                wishContainer.append(wish)
                                            }

                                        }


                                    }else{

                                        wish = `<div class="wish wish_id_${data[i].id}"> <h4>${data[i].title}</h4> <div>${data[i].description}</div>  <div class="reservedBySomeone">Reserved by another user </div>   </div>`

                                        // console.log(data[i])
                                        // console.log('Ønsket er reserveret AF EN ANDEN')

                                        wishContainer.append(wish)
                                    }

                                        
                                }else{

                                    wish = `<div class="wish wish_id_${data[i].id}"> <h4>${data[i].title}</h4> <div>${data[i].description}</div>  
                                    
                                    

                                    <div class="reservation res_${data[i].id}">
                                    <form id="frmReserveWish" class="wishReserve_${data[i].id}" onsubmit="reserveWish(${data[i].id}); return false;">
                                        <input type="text" name="user" value="${myUserID}" hidden>
                                        <input type="text" name="wish" value="${data[i].id}" hidden>

                                        <button>RESERVE</button> 
                                    </form>
                                    </div>
                                    
                                    </div>`;

                                    // console.log(data[i])
                                    // console.log('Not reserved')

                                    wishContainer.append(wish)
                                }

                                
                            }



                        })

    })

})





// function reserveWish(wishID){
$("body").delegate("#frmReserveWish", "submit", function(){

        let wishReservedID = $(this).attr('class').slice(12, 15);
    
        let wishID =  $(this).find('input[name=wish]').val()

        console.log('reserve wish')

        var formData = new FormData( document.querySelector('.wishReserve_'+wishID) )

            $.ajax({

                url : 'http://127.0.0.1:8000/api/reservedWishes/',
                type : 'POST',
                data : formData,
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                },
                processData: false,
                contentType: false
    
            }).done(function(data){

                $('.res_'+wishID).empty();

                console.log('Done')
                console.log(data)

                let removeReservation = `
                
                <form id="frmRemoveResered" class="wishReserve_${data.id}">
                                        <input type="text" name="user" value="${myUserID}" hidden>
                                        <input type="text" name="wish" value="${data.wish}" hidden>

                                        <button>REMOVE RESERVATION</button> 
                </form>
                
                `


                // <form id="frmReserveWish" class="wishReserve_${data.id}" >
                //                         <input type="text" name="user" value="${myUserID}" hidden>
                //                         <input type="text" name="wish" value="${data[i].id}" hidden>

                //                         <button>RESERVE</button> 
                //                     </form>

                $('.res_'+wishID).append(removeReservation)

                
    
            }).fail(function(data){
                console.log(data)
            })

            return false;

})

// onsubmit="removeReserveWish(${data.id}, ${data.wish}); return false;"
$("body").delegate("#frmRemoveResered", "submit", function(){

    let wishReservedID = $(this).attr('class').slice(12, 15);

    let wishID =  $(this).find('input[name=wish]').val()

    var formData = new FormData( document.querySelector('.wishReserve_'+wishReservedID) )

    $.ajax({

        url : 'http://127.0.0.1:8000/api/reservedWishes/'+wishReservedID,
        type : 'DELETE',
        data : formData,
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        },
        processData: false,
        contentType: false

    }).done(function(data){

        // $('.res_'+wishID).empty();

        // let reserveWish = `
        
        // <form class="wishReserve_${data.wish}" onsubmit="reserveWish(${data.wish}); return false;">
        // <input type="text" name="user" value="${myUserID}" hidden>
        // <input type="text" name="wish" value="${data.wish}" hidden>

        // <button>RESERVE</button> 
        // </form>
        
        // `

        // $('.res_'+wishID).append(reserveWish)


        location.reload();
        

    }).fail(function(data){
        console.log(data)
    })



    return false;

})

// $('#frmRemoveResered').on('submit', function(){



// })


// function removeReserveWish(id, wishID){
//     console.log(wishID)
//     console.log(id)

//     var formData = new FormData( document.querySelector('.wishReserve_'+wishID) )

//     $.ajax({

//         url : 'http://127.0.0.1:8000/api/reservedWishes/'+id,
//         type : 'DELETE',
//         data : formData,
//         beforeSend: function(xhr, settings) {
//             if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//                 xhr.setRequestHeader("X-CSRFToken", csrftoken);
//             }
//         },
//         processData: false,
//         contentType: false

//     }).done(function(data){

//         $('.res_'+wishID).empty();

//         // let reserveWish = `
        
//         // <form class="wishReserve_${data.wish}" onsubmit="reserveWish(${data.wish}); return false;">
//         // <input type="text" name="user" value="${myUserID}" hidden>
//         // <input type="text" name="wish" value="${data.wish}" hidden>

//         // <button>RESERVE</button> 
//         // </form>
        
//         // `

//         $('.res_'+wishID).append(reserveWish)

        

//     }).fail(function(data){
//         console.log(data)
//     })


// }
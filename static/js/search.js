

$('#frmSearch').on('submit', function(){

    let searchText = $('.searchText').val()
    console.log(searchText)

    // AJAX SEARCH CALL - ON USRS
    $.ajax({

        url : 'http://127.0.0.1:8000/api/users/?searchfor='+searchText,
        method : 'GET',

    }).done(function(data){
        // CLEAR SEARCH INPUTS
        $('#searchResults').empty()
        
        for(let i = 0; data.length > i; i++){
            
            let eachSearchResult = `<a href="../profile/${data[i].id}"><div> ${data[i].username} <i class="fas fa-arrow-right"></i></div></a>  `

            // APPEND SEARCH INPUTS
            $('#searchResults').prepend(eachSearchResult)

        }

    }).fail(function(){

    })


    return false;
})


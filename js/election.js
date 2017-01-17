$(function(){
    $('#candidat').click(function(){
        $.get('/api/candidat', function(data){
            
            $('#candidatslist').empty();
            for(var i=0; i<data.length; i++){
                var _li = '<li>'+ data[i].firstname +' '+ data[i].lastname +'</li>';
                $('#candidatslist').append(_li);
            }
        })
    })
});


    
    $('#createvotant').submit(function(e){
        e.preventDefault();
        
        var _firstname = $('#firstname').val();
        var _lastname = $('#lastname').val();
        var _age = $('#age').val();
        
        $.post('api/votant', {
            firstname: _firstname,
            lastname: _lastname,
            age: _age
        }).done(function(data){
            alert ("Data Loaded: " + data );
        });
    });
  

    $('#createvote').submit(function(e){
        e.preventDefault();
        
        var candidate_ = $('#candidat_').val();
        var votants_ = $('#votant_').val();
        
        $.post('api/vote', {
            candidat: candidate_,
            votant: votants_
        }).done(function(data){
            alert ("Merci d'avoir voté, passez une bonne journée !");
        });
    });
 

$(function(){
    $('#result').click(function(){
        $.get('/api/vote2', function(data){
               var results = {};
            
            for(var i=0; i<data.length;i++){
                var candidat = data[i].vote;
                
                if(results[candidat]) {
                    results[candidat]++;
                } else {
                    results[candidat] = 1;
                }
            }
        var _li = '<li>'+ data[i].candidat +'</li>';
                $('#result_list').append(_li); 
        })
        
    })
    
});
    
            
            /*$('#result_list').empty();
            for(var i=0; i<data.length; i++){
                var _li = '<li>'+ data[i].candidat +'</li>';
                $('#result_list').append(_li); 
                 } */
       

    $("#candidat").click(function () {
         $("#createvotant").fadeIn("slow");
     });

     $("#c_votant").click(function () {
         $("#createvotant").fadeOut("slow");
     });


     $("#c_votant").click(function () {
         $("#createvote").fadeIn("slow");
     });

     $("#c_vote").click(function () {
         $("#createvote").fadeOut("slow");
     });

     $("#c_vote").click(function () {
         $("#results").fadeIn("slow");
     });




  
$(window).load(function(){
  var socket = io.connect('http://localhost');
        
  $('#msg_error').hide();
  $('#send_left_error').hide();
  $('#send_right_error').hide();
        
  var id = null;        
  socket.on('user_id',function(user_id){
    id = user_id;
    $('#user_id').html(id);
  });
        
  socket.on('user_ids', function(user_nb){
    $('option').remove();
    var i = 0;
    for(i = 0 ; i < user_nb ; i++){
      if(i != id){
        $('#user_ids_left').append($("<option></option>").attr("value",i).text(i));
        $('#user_ids_right').append($("<option></option>").attr("value",i).text(i));
      }
    }
  });
        
  socket.on('incoming msg', function(msg, author, from){
    $('#rcv_msg').append('<p>from ' + author + ' (at your ' + from + ') ' + ': ' + msg +'</p>');
  });
        
  $('#send_left').bind('click',function(){
    var msg = $('#msg').val(),
        rcv_id = $('#user_ids_left').val();
         
    if(msg != ''){
      if(rcv_id != ''){
        socket.emit('msg', 'left', msg, rcv_id);
      }
      else{
        $('#send_left_error').show();
      }
    }
    else{
      $('#msg_error').show();
    }
  });
        
  $('#send_right').bind('click',function(){
    var msg = $('#msg').val(),
        rcv_id = $('#user_ids_right').val();
          
    if(msg != ''){
      if(rcv_id != ''){
        socket.emit('msg', 'right', msg, rcv_id);
      }
      else{
        $('#send_right_error').show();
      }
    }
    else{
      $('#msg_error').show();
    }
  });
        
  $('#msg').bind('focus',function(){
    $('#msg_error').hide();
    $('#send_left_error').hide();
          $('#send_right_error').hide();
  });
});

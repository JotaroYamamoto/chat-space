$(function(){
  function buildHTML(message){
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";

      
      var html = 
      `<div class="chat-main__message-list__one" data-message-id="${message.id}">
        <div class="chat-main__message-list__one--name">
          ${message.name}
        </div>
        <div class="chat-main__message-list__one--time">
          ${message.created_at}
        </div>
        <div class="chat-main__message-list__one--core">
          <p class="chat-main__message-list__one--core__content">
            ${message.content}
          </p>
          ${image}
            
        </div>
      </div>`
      return html;
    }
    
    
  
    var reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        last_message_id = $('.chat-main__message-list__one:last').data('message-id');
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })




        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function(message){
            insertHTML = buildHTML(message);
            $('.chat-main__message-list').append(insertHTML);
          })
          $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight},'fast');
        })




        .fail(function() {
          alert('自動更新に失敗しました');
        });

        
      }
    };
    setInterval(reloadMessages, 5000);

    $("#new_message").on("submit",function(e){
      e.preventDefault()
      var formData =new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.chat-main__message-list').append(html);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        $('form')[0].reset();
        $('.submit').prop('disabled',false)
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
      })
    })
  });


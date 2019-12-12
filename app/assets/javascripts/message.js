$(function(){
  function buildHTML(message){
    
    if (message.image) {
      var html = 
      `<div class="chat-main__message-list__one">
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
          <img class="lower-message__image" src="${message.image}">
            
        </div>
      </div>`
    } else {
      var html = 
      `<div class="chat-main__message-list__one">
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
        </div>
      </div>`
  
    }
    return html
  }
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
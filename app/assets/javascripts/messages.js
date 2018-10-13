function makeHTML(message){
      var html = `<div class="message" data-message_id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.time}
                      </div>
                    </div>
                    <div class="lower-message new-send">`
    if (message.image.url && message.text) {
      html += `<p class="lower-message__content">
                ${message.text}
               </p>
               <img class="lower-message__image" src="${message.image.url}">
             </div>
           </div>`
      return html;
    } else if ( message.text ){
      html += `<p class="lower-message__content">
                 ${message.text}
               </p>
             </div>
           </div>`
      return html;
    } else if ( message.image.url ){
      html += `<img class="lower-message__image" src="${message.image.url}">
             </div>
           </div>`
      return html;
    }
}

$(function(){
  var href = location.href;

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: href,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      $('#form__button').prop("disabled", false);
      var html = makeHTML(data);
      $('.messages').append(html);
      $('.lower-message__content').val('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      $('#message_content').val('');
    })
    .fail(function(){
      alert('通信に失敗しました');
    });
  });

  $(document).ready(function(){
  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(function(){
      $.ajax({
        url: href,
        type: 'GET',
        dataType: 'json'
      })
      .done(function(data){
        var id = $('.message').last().attr('data-message_id');
        data.forEach(function(message){
          if (message.id > id ){
            var html = makeHTML(message);
            $('.messages').append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
          };
        });
      })
      .fail(function(){
        alert('自動更新に失敗しました');
      });
    }, 5000);
  };
  });
});

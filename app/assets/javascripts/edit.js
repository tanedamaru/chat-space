$(function(){
  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();
    var input = $(this).val();
    $('#user-search-result').find('.chat-group-user').remove();
    if (input !== ""){
      $.ajax({
        url: '/users',
        type: 'GET',
        data: { keyword: input },
        dataType: 'json'
      })
      .done(function(data){
        if (data.length !== 0){
          $(data).each(function(i, user){
            var html = buildHTML(user);
            $('#user-search-result').append(html);
          });
        }else{
          $('#user-search-result').append(`<div class="chat-group-user">
                                            <p>一致するユーザーは存在しません</p>
                                           </div>`);
        };
      })
      .fail(function(){
        alert('ユーザー検索に失敗しました');
      });
    };
  });

  $(document).on('click', '.chat-group-user__btn--add', function(){
    var name = $(this).attr('data-user-name');
    var id = $(this).attr('data-user-id');
    var addHtml = addHTML(name, id);
    $('#chat-group-users').append(addHtml);
    $(this).parent().remove();
  });

  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).parent().remove();
  });

});

function buildHTML(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>
             `
  return html;
}

function addHTML(name, id){
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value='${id}'>
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>
              `
  return html;
}

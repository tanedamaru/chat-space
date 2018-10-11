$(function(){
  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();
    var input = $(this).val();
    if (input !== ""){
      $('#user-search-result').find('.chat-group-user').remove();
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
    }else{
      $('#user-search-result').find('.chat-group-user').remove();
    };
  });
});

function buildHTML(user){
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name"> ${user.user_name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</a>
              </div>
             `
  return html;
}

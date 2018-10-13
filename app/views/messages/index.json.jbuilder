json.array! @messages do |message|
  json.id message.id
  json.text  message.content
  json.image message.image
  json.time  message.created_at
  json.user_id  message.user.id
  json.user_name  message.user.name
end

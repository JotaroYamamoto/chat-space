json.content @message.content
json.image @message.image_url
json.group_id @message.group_id
json.user_id @message.user_id
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.name @message.user.name

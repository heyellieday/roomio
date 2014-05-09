Jbuilder.encode do |json|
    json.array! @groups do |group|
      @users = group.users
      json.array! @users do |user|
          json.user
      end
    end
end
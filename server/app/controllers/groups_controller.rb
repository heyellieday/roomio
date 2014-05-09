class GroupsController < ApplicationController
    def index
        @groups = Group.al
    end
end

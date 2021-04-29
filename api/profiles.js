import {request} from '/plugins/request'

export const getProfilesByUsername = (username) => { //获取文章列表
  return request({
    method: 'GET',
    url: `api/profiles/${username}`,
  })
}


export const unfollowUser = (username) => { //取消关注
  return request({
    method: 'DELETE',
    url: `api/profiles/${username}/follow`
  })
}

export const followUser = (username) => { //关注
  return request({
    method: 'POST',
    url: `api/profiles/${username}/follow`
  })
}


import {request} from '/plugins/request'

export const getArticles = (params) => { //获取文章列表
  return request({
    method: 'GET',
    url: 'api/articles',
    params
  })
}

export const getFeedArticles = (params) => { //获取关注的文章列表
  return request({
    method: 'GET',
    url: 'api/articles/feed',
    params,
    //手动设置用户信息，改拦截器里自动添加
    // headers: {
    //   // 添加用户身份，数据格式：Token空格Token数据
    //   Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTY0NTI0LCJ1c2VybmFtZSI6Ind3aiIsImV4cCI6MTYyNDcwMTY2Mn0.7c7R65WqtPEUbyfSlSQcd54lbhqcQmtvaARcd3hsdH4`
    // }
  })
}


export const unfavoriteArticle = (slug) => { //取消关注
  return request({
    method: 'DELETE',
    url: `api/articles/${slug}/favorite`
  })
}

export const favoriteArticle = (slug) => { //关注
  return request({
    method: 'POST',
    url: `api/articles/${slug}/favorite`
  })
}

export const getArticle = (slug) => { //文章详情
  return request({
    method: 'GET',
    url: `api/articles/${slug}`
  })
}
 
export const getComments = slug => { //文章评论
  return request({
    method: 'GET',
    url: `api/articles/${slug}/comments`
  })
}

export const getSingleArticle = slug => { //文章详情
  return request({
    method: 'GET',
    url: `api/articles/${slug}`
  })
}
export const addArticles = data => { //新增文章
  return request({
    method: 'POST',
    url: 'api/articles',
    data
  })
}

export const editArticles = (data,slug) => { //编辑文章
  return request({
    method: 'PUT',
    url: `api/articles/${slug}`,
    data
  })
}

export const deleteArticles = (slug) => { //编辑文章
  return request({
    method: 'DELETE',
    url: `api/articles/${slug}`
  })
}

export const addArticlesComments = (data,slug) => { //文章添加评论
  return request({
    method: 'POST',
    url: `api/articles/${slug}/comments`,
    data
  })
}



export const deleteArticlesComments = (slug,id) => { //文章添加评论
  return request({
    method: 'DELETE',
    url: `api/articles/${slug}/comments/${id}`,
  })
}




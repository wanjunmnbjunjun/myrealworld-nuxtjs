import {request} from '/plugins/request'

export const Login = (data) => {
  return request({
    method: 'POST',
    url: 'api/users/login',
    data
  })
}

export const Register = (data) => {
  return request({
    method: 'POST',
    url: 'api/users',
    data
  })
}

export const UpdateUser = (data) => { //更新用户
  return request({
    method: 'PUT',
    url: 'api/user',
    data
  })
}

export const GetUser = () => { //获取当前用户
  return request({
    method: 'GET',
    url: 'api/user',
  })
}
import { request } from "../plugins/request";

export const login = data => {
    return request({
        method: "POST",
        url: "/api/users/login",
        data
    });
};


// 用户注册
export const register = data => {
    return request({
        method: "POST",
        url: "/api/users",
        data
    });
};

export const updateUser = data => {
    return request({
        method: "PUT",
        url: "/api/user",
        data
    })
}

export const getProfile = username => {
    return request({
        method: "GET",
        url: `/api/profiles/${username}`
    })
}

export const follow = username => {
    return request({
        method: "GET",
        url: `/api/profiles/${username}/follow`
    })
}

export const unFollow = username => {
    return request({
        method: "DELETE ",
        url: `/api/profiles/${username}/follow`
    })
}
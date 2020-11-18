import { request } from "../plugins/request";


// 获取公共文章列表
export const getArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles",
    params
  });
};

//新建文章
export const createArticles = data => {
  return request({
    method: "POST",
    url: "/api/articles",
    data
  })
};

// 获取公共文章列表
export const getYourFeedArticles = params => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    params
  });
};

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/favorite`
  });
};

// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/favorite`
  });
};


// 获取文章详情
export const getArticle = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}`
  });
};

export const deleteArticle = slug => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}`
  });
};

// 获取文章评论
export const getComments = slug => {
  return request({
    method: "GET",
    url: `/api/articles/${slug}/comments`
  });
};

//添加评论
export const addComments = ({ slug, comment }) => {
  return request({
    method: "POST",
    url: `/api/articles/${slug}/comments`,
    data: {
      comment: {
        body: comment
      }
    }
  })
}

//删除评论
export const deleteComments = ({ slug, id }) => {
  return request({
    method: "DELETE",
    url: `/api/articles/${slug}/comments/${id}`
  })
}

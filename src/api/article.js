import request from "@/utils/request.js";
// import { useTokenStore } from "@/stores/token.js";

//文章分类列表查询
export const ArticleCategoryListService =()=>{
/*     const tokenStore = useTokenStore();
    //在pinia中定义的响应式对象都不需要.value(自动解包)
    return request.get('/category',{headers:{'Authorization':tokenStore.token}}); */
    return request.get('/category');

}

//文章分类添加接口
export const ArticleCategoryAddService =(categoryData)=>{
    return request.post('/category',categoryData);
}

//文章分类修改
export const ArticleCategoryUpdateService=(categoryData)=>{
    return request.put('/category',categoryData);
}

//文章分类删除
export const ArticleCategoryDeleteService=(id)=>{
    return request.delete('/category?id='+id);
}

//文章列表查询
export const ArticleListService=(params)=>{
    return request.get('/article',{params:params});
}

//文章添加
export const ArticleAddService=(articleData)=>{
    return request.post('/article',articleData);
}

//更新文章
export const ArticleUpdateService = (articleData) => {
  return request.put('/article', articleData);
}

//删除文章
export const ArticleDeleteService = (id) => {
  return request.delete('/article', {
    params: { id }
  });
};


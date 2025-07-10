# Big Event - Frontend Project | 大事件 - 前端项目

This is the frontend project of "Big Event", built with Vue 3 and Element Plus. It supports user registration/login, article & category management, and personal profile features.

这是基于 Vue 3 和 Element Plus 构建的“大事件”前端项目，实现了用户注册登录、文章及分类管理、个人资料等功能。

---

## Project Structure | 项目结构

```
src
│  App.vue
│  main.js
│
├─api
│      article.js
│      user.js
│
├─assets
│      avatar.jpg
│      cover.jpg
│      default.png
│      login_bg.jpg
│      login_title.png
│      logo.png
│      logo2.png
│      main.scss
│
├─components
├─router
│      index.js
│
├─stores
│      token.js
│      userInfo.js
│
├─utils
│      request.js
│
└─views
    │  Layout.vue
    │  Login.vue
    │
    ├─article
    │      ArticleCategory.vue
    │      ArticleManage.vue
    │
    └─user
            UserAvatar.vue
            UserInfo.vue
            UserResetPassword.vue
```
---

## Environment & Dependencies | 环境及依赖

- Node.js version: >=14.x  
- Package manager: npm or yarn  
- Main dependencies:  
  - Vue 3  
  - Element Plus  
  - axios  
  - pinia  
  - vue-router  

---

## Setup & Run | 安装与运行

1. Clone the repository  
   克隆仓库  

   ```bash
   git clone https://github.com/April1031/big-event-frontend.git
   cd big-event-frontend

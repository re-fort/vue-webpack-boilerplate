// Routes
const TopPage = () => import(/* webpackChunkName: 'topPage' */ 'src/pages/TopPage.vue')
const AuthPage = () => import(/* webpackChunkName: 'auth' */ 'src/pages/AuthPage.vue')
const SearchPage = () => import(/* webpackChunkName: 'searchPage' */ 'src/pages/SearchPage.vue')
const SearchUserPage = () => import(/* webpackChunkName: 'searchUserPage' */ 'src/pages/SearchUserPage.vue')
const SearchRepoPage = () => import(/* webpackChunkName: 'repo' */ 'src/pages/SearchRepoPage.vue')
const MyPage = () => import(/* webpackChunkName: 'myPage' */ 'src/pages/MyPage.vue')

export default [
  { path: '/', component: TopPage },
  { path: '/auth', component: AuthPage },
  { path: '/search', component: SearchPage },
  { path: '/search/user', component: SearchUserPage },
  { path: '/search/repo', component: SearchRepoPage },
  { path: '/user', component: MyPage, meta: { requiresAuth: true } },
  { path: '/user/:activeTab', component: MyPage, meta: { requiresAuth: true } },
]

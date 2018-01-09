// Routes
const TopPage = () => import(/* webpackChunkName: 'topPage' */ 'pages/TopPage')
const AuthPage = () => import(/* webpackChunkName: 'auth' */ 'pages/AuthPage')
const SearchPage = () => import(/* webpackChunkName: 'searchPage' */ 'pages/SearchPage')
const SearchUserPage = () => import(/* webpackChunkName: 'searchUserPage' */ 'pages/SearchUserPage')
const SearchRepoPage = () => import(/* webpackChunkName: 'repo' */ 'pages/SearchRepoPage')
const MyPage = () => import(/* webpackChunkName: 'myPage' */ 'pages/MyPage')

export default [
  { path: '/', component: TopPage },
  { path: '/auth', component: AuthPage },
  { path: '/search', component: SearchPage },
  { path: '/search/user', component: SearchUserPage },
  { path: '/search/repo', component: SearchRepoPage },
  { path: '/user', component: MyPage, meta: { requiresAuth: true } },
  { path: '/user/:activeTab', component: MyPage, meta: { requiresAuth: true } },
]

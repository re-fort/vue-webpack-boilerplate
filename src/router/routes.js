// Routes
const Top = () => import(/* webpackChunkName: 'top' */ 'components/Top')
const Auth = () => import(/* webpackChunkName: 'auth' */ 'components/Auth')
const Search = () => import(/* webpackChunkName: 'search' */ 'components/Search')
const User = () => import(/* webpackChunkName: 'user' */ 'components/User')
const Repo = () => import(/* webpackChunkName: 'repo' */ 'components/Repo')
const MyPage = () => import(/* webpackChunkName: 'myPage' */ 'components/MyPage')

export default [
  { path: '/', component: Top },
  { path: '/auth', component: Auth },
  { path: '/search', component: Search },
  { path: '/search/user', component: User },
  { path: '/search/repo', component: Repo },
  { path: '/user', component: MyPage, meta: { requiresAuth: true } },
  { path: '/user/:activeTab', component: MyPage, meta: { requiresAuth: true } },
]

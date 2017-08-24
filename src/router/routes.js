// Routes
import Top from 'components/Top'
import Auth from 'components/Auth'
import Search from 'components/Search'
import User from 'components/User'
import Repo from 'components/Repo'
import MyPage from 'components/MyPage'

export default [
  { path: '/', component: Top },
  { path: '/auth', component: Auth },
  { path: '/search', component: Search },
  { path: '/search/user', component: User },
  { path: '/search/repo', component: Repo },
  { path: '/user', component: MyPage, meta: { requiresAuth: true } },
  { path: '/user/:activeTab', component: MyPage, meta: { requiresAuth: true } },
]

// Routes
import Top from 'components/Top'
import User from 'components/User'
import Repo from 'components/Repo'

export default [
  { path: '/', component: Top },
  { path: '/search/user', component: User },
  { path: '/search/repo', component: Repo },
]

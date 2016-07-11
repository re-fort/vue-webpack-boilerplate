// Route
import Top from 'components/Top'
import User from 'components/User'
import Repo from 'components/Repo'

export default {
  '/':              {component: Top},
  '/search/user':   {component: User},
  '/search/repo':   {component: Repo}
}
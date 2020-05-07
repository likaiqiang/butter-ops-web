import { uniqueId } from 'lodash'
import store from '@/store/index'
import util from '@/libs/util'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}
let menu = util.cookies.get('menu') ? eval(util.cookies.get('menu') ) : []
console.log(JSON.stringify(menu))
export const menuHeader = supplementPath(menu)
export const menuAside = supplementPath(menu)


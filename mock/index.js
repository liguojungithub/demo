import Mock from 'mockjs'

import user from './user'
import home from './home'
import category from './category'
import product from './product'
import detail from './detail'
import cart from './cart'

const mocks = [...user, ...home, ...category, ...product, ...detail, ...cart]

const delayApi = [
  '/prod-api/user/login',
  '/prod-api/home/list',
  '/prod-api/product/list',
  '/prod-api/goods/detail',
  '/prod-api/cart/list'
]

// https://github.com/nuysoft/Mock/wiki
export function mockXHR() {
  for (const item of mocks) {
    Mock.mock(item.url, item.type, item.response)

    // 为了效果演示，定义一些接口延时
    if (delayApi.includes(item.url)) {
      Mock.setup({
        timeout: 1000
      })
    }
  }
}

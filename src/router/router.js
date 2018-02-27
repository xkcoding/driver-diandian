const routers = [
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: resolve => require(['pages/index'], resolve)
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      title: '历史行程'
    },
    component: resolve => require(['pages/history'], resolve)
  },
  {
    path: '/coupon',
    name: 'coupon',
    meta: {
      title: '优惠券'
    },
    component: resolve => require(['pages/coupon'], resolve)
  },
  {
    path: '*',
    redirect: '/index'
  }
]

export default routers

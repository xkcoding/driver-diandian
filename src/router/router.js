const routers = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: resolve => require(['pages/index'], resolve)
  },
  {
    path: '/service-price',
    name: 'service-price',
    meta: {
      title: '服务价格'
    },
    component: resolve => require(['pages/service-price'], resolve)
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
    redirect: '/'
  }
]

export default routers

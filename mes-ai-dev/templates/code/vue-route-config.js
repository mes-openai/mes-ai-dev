/**
 * 路由配置
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
import XxxPage from '@/views/XxxPage.vue';

export default [
  {
    path: '/xxx',
    name: 'Xxx',
    component: XxxPage,
    meta: {
      title: 'XXX管理',
      icon: 'xxx-icon',
      requiresAuth: true,
      breadcrumb: [
        { label: '首页', path: '/home' },
        { label: 'XXX管理' }
      ]
    },
    children: [
      {
        path: 'detail/:id',
        name: 'XxxDetail',
        component: () => import('@/views/XxxDetailPage.vue'),
        meta: {
          title: 'XXX详情',
          requiresAuth: true,
          hidden: true
        }
      }
    ]
  }
];

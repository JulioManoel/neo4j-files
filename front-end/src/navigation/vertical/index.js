import { getI18n } from '@/plugins/i18n'

export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'tabler-smart-home' },
  },
  {
    title: getI18n().global.t('menu.users'),
    to: { name: 'users' },
    icon: { icon: 'tabler-users' },
  },
]

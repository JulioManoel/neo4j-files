import { getI18n } from '@/plugins/i18n'

export default [
  {
    title: getI18n().global.t('menu.fileExplorer'),
    to: { name: 'root' },
    icon: { icon: 'tabler-file' },
  },
  {
    title: getI18n().global.t('menu.users'),
    to: { name: 'users' },
    icon: { icon: 'tabler-users' },
  },
  {
    title: getI18n().global.t('menu.devices'),
    to: { name: 'devices' },
    icon: { icon: 'tabler-device-laptop' },
  }
]

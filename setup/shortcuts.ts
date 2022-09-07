import { defineShortcutsSetup, NavOperations } from '@slidev/types'

export default defineShortcutsSetup((nav: NavOperations) => {
  return [
    {
      key: 'd',
      fn: () => nav.toggleDrawing(),
    },
  ]
})

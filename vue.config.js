module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    themeColor: '#FF686B',
    msTileColor: '#FF686B',
    appleMobileWebAppCapable: 'yes',
    manifestOptions: {
      name: 'Photo Pride Contest',
      short_name: 'Photo Pride Contest',
      icons: [
        {
          src: './img/icons/app-icon-36x36.png',
          sizes: '36x36',
          type: 'image/png'
        },
        {
          src: './img/icons/app-icon-48x48.png',
          sizes: '48x48',
          type: 'image/png'
        },
        {
          src: './img/icons/app-icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: './img/icons/app-icon-96x96.png',
          sizes: '96x96',
          type: 'image/png'
        },
        {
          src: './img/icons/app-icon-144x144.png',
          sizes: '144x144',
          type: 'image/png'
        },
        {
          src: './img/icons/app-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/app-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      background_color: '#FF686B'
    }
  }
}

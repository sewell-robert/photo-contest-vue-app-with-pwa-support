module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    themeColor: '#f92545',
    msTileColor: '#f92545',
    appleMobileWebAppCapable: 'yes',
    manifestOptions: {
      name: 'Photo Pride',
      short_name: 'Photo Pride',
      icons: [
        {
          src: './img/icons/photo-pride-homescreen-500x500.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: './img/icons/photo-pride-homescreen-128x128.png',
          sizes: '128x128',
          type: 'image/png'
        },
        {
          src: './img/icons/photo-pride-homescreen-500x500.png',
          sizes: '256x256',
          type: 'image/png'
        },
        {
          src: './img/icons/photo-pride-homescreen-500x500.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      background_color: '#f92545'
    }
  }
}

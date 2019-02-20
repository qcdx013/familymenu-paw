export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: true,
        title: 'familymenu',
        dll: false,
        hardSource: false,
        routes: {
          exclude: [
            /components/,
            /api/,
            /model\.(j|t)sx?$/,
            /service\.(j|t)sx?$/,
            /models\//,
            /components\//,
            /services\//,
          ],
        },
      },
    ],
  ],
  // proxy: {
  //   '/api': {
  //     target: 'http://localhost:8000/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/api': '' },
  //   },
  // },
};

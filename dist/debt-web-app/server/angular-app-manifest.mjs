
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/debt",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/debt"
  },
  {
    "renderMode": 2,
    "route": "/corr-uni"
  },
  {
    "renderMode": 2,
    "route": "/corr-multi"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24639, hash: '0b2d718935d6cb7c4f2bfde385b8372de03d4d0db1b37ffa26bd7ffced7527a3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17155, hash: 'a189cf90e50ad24a49df5553d9e68c0d8eb8ae2731a26c3e114e8cd57471aaea', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'debt/index.html': {size: 43378, hash: '98d087afc638ba00016855887a0e0eac111bfbfcc49838da9b7e195b2dc1809e', text: () => import('./assets-chunks/debt_index_html.mjs').then(m => m.default)},
    'corr-uni/index.html': {size: 42463, hash: '805973268ed9081428a1402d08f479d206ae15efe016603eaf832d0db3b2e4b7', text: () => import('./assets-chunks/corr-uni_index_html.mjs').then(m => m.default)},
    'corr-multi/index.html': {size: 42468, hash: '613a0ef3e12fd2b1d665dec855801c97c2b08b0591003aa888cffb5c9aa845b0', text: () => import('./assets-chunks/corr-multi_index_html.mjs').then(m => m.default)},
    'styles-OPUTW5UJ.css': {size: 8043, hash: 'i68XcmjPijU', text: () => import('./assets-chunks/styles-OPUTW5UJ_css.mjs').then(m => m.default)}
  },
};

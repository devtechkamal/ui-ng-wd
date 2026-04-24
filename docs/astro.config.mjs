// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'WDC UI',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/devtechkamal/wdc-ui-ng' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            // Each item here is one entry in the navigation menu.
            { label: 'Introduction', link: '/introduction' },
            { label: 'Installation', link: '/installation' },
            { label: 'Theming', link: '/theming' },
          ],
        },
        {
          label: 'Components',
          autogenerate: { directory: 'components' }, // Automatically lists files in docs/src/content/docs/components/
        },
      ],
      customCss: [
        // We will add custom CSS to make it look like your UI
        './src/styles/custom.css',
      ],
    }),
  ],
});

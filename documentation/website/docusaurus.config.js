const lightCodeTheme = require('prism-react-renderer').themes.github;
const darkCodeTheme = require('prism-react-renderer').themes.dracula;

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(module.exports = {
  title: 'ts-playground - Professional TypeScript Learning Environment',
  tagline: 'Master TypeScript from Foundations to Production Deployment | Comprehensive Learning Path for Backend Developers',
  url: 'https://Kingson4Wu.github.io',
  baseUrl: '/ts-playground/',
  onBrokenLinks: 'throw',
  markdown: {
    format: 'mdx',
    mermaid: false,
    hooks: {
      onBrokenMarkdownLinks: 'warn', // 或 'throw' / 'ignore'
    },
  },
  favicon: 'img/logo.svg',
  organizationName: 'Kingson4Wu', // Usually your GitHub org/user name.
  projectName: 'ts-playground', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/Kingson4Wu/ts-playground/edit/main/documentation/website/',
          routeBasePath: '/', // Serve docs at the root route
          remarkPlugins: [require('@docusaurus/remark-plugin-npm2yarn')],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/Kingson4Wu/ts-playground/edit/main/documentation/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg', // For social cards
      metadata: [
        {name: 'keywords', content: 'TypeScript, learning, backend development, API, CLI, Node.js, JavaScript, programming, education, tutorial, guide, course'},
        {name: 'description', content: 'Master TypeScript from Foundations to Production Deployment. Comprehensive learning path for backend developers with hands-on exercises and professional development practices.'},
        {name: 'og:title', content: 'ts-playground - Professional TypeScript Learning Environment'},
        {name: 'og:description', content: 'Master TypeScript from Foundations to Production Deployment. Comprehensive learning path for backend developers with hands-on exercises and professional development practices.'},
        {name: 'og:type', content: 'website'},
        {name: 'og:url', content: 'https://Kingson4Wu.github.io/ts-playground/'},
        {name: 'og:image', content: 'https://Kingson4Wu.github.io/ts-playground/img/logo.svg'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {name: 'twitter:title', content: 'ts-playground - Professional TypeScript Learning Environment'},
        {name: 'twitter:description', content: 'Master TypeScript from Foundations to Production Deployment. Comprehensive learning path for backend developers.'},
        // Additional metadata for browser tab branding
        {name: 'theme-color', content: '#3578e5'},
        {name: 'msapplication-TileColor', content: '#3578e5'},
        {name: 'apple-mobile-web-app-title', content: 'ts-playground'},
        {name: 'application-name', content: 'ts-playground'},
      ],
      headTags: [
        // Additional head tags for better favicon support across browsers
        {
          tagName: 'link',
          attributes: {
            rel: 'icon',
            type: 'image/x-icon',
            href: 'img/logo.svg',
          },
        },
        {
          tagName: 'link',
          attributes: {
            rel: 'icon',
            type: 'image/svg+xml',
            href: 'img/logo.svg',
          },
        },
        {
          tagName: 'link',
          attributes: {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: 'img/logo.svg',
          },
        },
        {
          tagName: 'link',
          attributes: {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: 'img/logo.svg',
          },
        },
        {
          tagName: 'link',
          attributes: {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: 'img/logo.svg',
          },
        },
      ],
      navbar: {
        title: 'ts-playground',
        logo: {
          alt: 'ts-playground Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'setup',
            position: 'left',
            label: 'Setup',
          },
          {
            type: 'dropdown',
            label: 'Learning Stages',
            position: 'left',
            items: [
              {
                label: 'Stage 1: Foundations',
                to: '/stage1-foundations/intro',
              },
              {
                label: 'Stage 2: CLI Development',
                to: '/stage2-cli/intro',
              },
              {
                label: 'Stage 3: Backend Development',
                to: '/stage3-backend/intro',
              },
              {
                label: 'Stage 4: Production Deployment',
                to: '/stage4-production/intro',
              },
            ],
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/Kingson4Wu/ts-playground',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learning Path',
            items: [
              {
                label: 'Getting Started',
                to: '/intro',
              },
              {
                label: 'Project Setup',
                to: '/setup',
              },
              {
                label: 'Development Conventions',
                to: '/conventions',
              },
            ],
          },
          {
            title: 'Stages',
            items: [
              {
                label: 'Foundations',
                to: '/stage1-foundations/intro',
              },
              {
                label: 'CLI Development',
                to: '/stage2-cli/intro',
              },
              {
                label: 'Backend Development',
                to: '/stage3-backend/intro',
              },
              {
                label: 'Production Deployment',
                to: '/stage4-production/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/Kingson4Wu/ts-playground/discussions',
              },
              {
                label: 'Contributing',
                href: 'https://github.com/Kingson4Wu/ts-playground/blob/main/CONTRIBUTING.md',
              },
              {
                label: 'Issues',
                href: 'https://github.com/Kingson4Wu/ts-playground/issues',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Specifications',
                href: 'https://github.com/Kingson4Wu/ts-playground/tree/main/specifications',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/Kingson4Wu/ts-playground',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Kingson Wu. Professional TypeScript Learning Environment. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'typescript',
        additionalLanguages: ['bash', 'json', 'yaml'],
      },
      // algolia: {
      //   // The application ID provided by Algolia
      //   appId: 'YOUR_APP_ID',
      //
      //   // Public API key: it is safe to commit it
      //   apiKey: 'YOUR_SEARCH_API_KEY',
      //
      //   indexName: 'ts-playground',
      //
      //   // Optional: see doc section below
      //   contextualSearch: true,
      //
      //   // Optional: path for search page that enabled by default (`false` to disable it)
      //   searchPagePath: 'search',
      // },
    }),
});

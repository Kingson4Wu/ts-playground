/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'overview', 'setup'],
    },
    {
      type: 'category',
      label: 'Learning Stages',
      items: [
        'stage1-foundations/intro',
        'stage2-cli/intro',
        'stage3-backend/intro',
        'stage4-production/intro'
      ],
    },
    {
      type: 'category',
      label: 'Development Guidelines',
      items: [
        'conventions',
        'standards',
        'best-practices'
      ],
    },
    {
      type: 'category',
      label: 'Project Structure',
      items: [
        'project-structure',
        'directory-structure'
      ],
    },
  ],
};

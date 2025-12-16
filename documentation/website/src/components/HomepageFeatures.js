import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useColorMode} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Professional TypeScript Mastery',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Master TypeScript from basic syntax to advanced type manipulation with strict compilation settings
      </>
    ),
  },
  {
    title: 'Structured Learning Path',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Follow a comprehensive 4-stage learning path from foundations to production deployment
      </>
    ),
  },
  {
    title: 'Real-World Applications',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Build practical applications including CLI tools, backend services, and production deployment strategies
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {Svg ? (
          <Svg
            className={styles.featureSvg}
            alt={title}
            style={{
              filter: isDarkMode ? 'invert(1)' : 'none',
            }}
          />
        ) : null}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
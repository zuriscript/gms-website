import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import HeroBanner from 'components/HeroBanner';
import Features from 'components/Feature';

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="GraphMineSuite" />
      <HeroBanner />
      <Features />
    </Layout>
  );
};

export default IndexPage;

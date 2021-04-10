import React from 'react';

import Layout from 'components/Layout';
import SEO from 'components/SEO';
import HeroBanner from 'components/HeroBanner';
import Features from 'components/Feature';
import Papers from 'components/Papers';

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <HeroBanner />
      <Features />
      <Papers />
    </Layout>
  );
};

export default IndexPage;

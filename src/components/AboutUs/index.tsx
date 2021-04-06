import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import tw, { css } from "twin.macro"

import ETHIcon from "assets/svg/eth.inline.svg";
import SPCLIcon from "assets/svg/spcl.inline.svg";

import * as Styled from './styles';

interface Paper {
  node: {
    id: string;
    html: string;
    excerpt: string;
    frontmatter: {
      title: string;
      authors: string;
      postscriptum: string;
      link: string;
      order: number;
    };
  };
}

const AboutUs: React.FC = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: {order: ASC, fields: frontmatter___order}
        filter: {frontmatter: {title: {}, category: {eq: "papers"}}}
      ) {
        edges {
          node {
            id
            html
            excerpt(pruneLength: 160)
            frontmatter {
              title
              authors
              postscriptum
              link
            }
          }
        }
      }
    }
  `);

  const features: Paper[] = allMarkdownRemark.edges;

  return (
    <Styled.AboutUsBanner>
        <Styled.Text>We are researchers and students from spcl and ETH Zurich</Styled.Text>
        <Styled.Text>GraphMineSuite is developed and maintained as part of </Styled.Text>
        <Styled.LogoLinkSection>
          <ETHIcon/>
          <SPCLIcon/>
        </Styled.LogoLinkSection>
        <Styled.Text></Styled.Text>
    </Styled.AboutUsBanner>
  );
};


export default AboutUs;

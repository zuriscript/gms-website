import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as Styled from './styles';

interface Feature {
  node: {
    id: string;
    html: string;
    excerpt: string;
    frontmatter: {
      title: string;
      text: string;
    };
  };
}

const Features: React.FC = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { category: { eq: "features" } } }) {
        edges {
          node {
            id
            html
            excerpt(pruneLength: 160)
            frontmatter {
             title
             text
            }
          }
        }
      }
    }
  `);

  const features: Feature[] = allMarkdownRemark.edges;

  return (
    <Styled.Features>
        {features.map((item) => {
            const {
              id,
              html,
              excerpt,
              frontmatter: { title, text },
            } = item.node;

            return (
              <Styled.Feature key={id}>
                <Styled.FeatureContent>
                  <Styled.FeatureTitle>{title}</Styled.FeatureTitle>
                  <Styled.FeatureText>{text}</Styled.FeatureText>
                </Styled.FeatureContent>
                <Styled.MarkdownContent dangerouslySetInnerHTML={{ __html: html }} />
                <p>{excerpt}</p>
              </Styled.Feature>
            );
          })}
    </Styled.Features>
  );
};


export default Features;

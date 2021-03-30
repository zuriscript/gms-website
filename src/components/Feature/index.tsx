import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import {Display} from "helpers/definitions"

import * as Styled from './styles';

interface Feature {
  node: {
    id: string;
    html: string;
    excerpt: string;
    frontmatter: {
      title: string;
      text: string;
      display: Display;
      order: number;
    };
  };
}

const Features: React.FC = () => {
  const { allMarkdownRemark } = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: {order: ASC, fields: frontmatter___order}
        filter: {frontmatter: {title: {}, category: {eq: "features"}}}
      ) {
        edges {
          node {
            fileAbsolutePath
            id
            html
            excerpt(pruneLength: 160)
            frontmatter {
              title
              text
              display
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
              frontmatter: { title, text, display },
            } = item.node;

            return (
              <Styled.Feature key={id} displayProp={display}>
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

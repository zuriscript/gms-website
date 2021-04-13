import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

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

const Papers: React.FC = () => {
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
    <Styled.PaperSection>
    <Styled.Title>Publications</Styled.Title>
    <Styled.Papers>
        {features.map((item) => {
            const {
              id,
              frontmatter: { title, authors, postscriptum, link },
            } = item.node;

            return (
              <Styled.Paper key={id}>
                  <Styled.PaperTitle>{title}</Styled.PaperTitle>
                  <Styled.PaperAuthors>{authors}</Styled.PaperAuthors>
                  <Styled.PaperPostScriptum>
                    {postscriptum}
                    <Styled.PaperLink href={link} rel="noopener">arXiv</Styled.PaperLink>
                  </Styled.PaperPostScriptum>
              </Styled.Paper>
            );
          })}
    </Styled.Papers>
    </Styled.PaperSection>
  );
};


export default Papers;

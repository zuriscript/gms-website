import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as Styled from './styles';
import Icon from "assets/svg/logo.inline.svg";

const Logo: React.FC = () => {
  const { site, placeholderImage } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
        }
      }
    }
  `);

  const logoTitle: string = site.siteMetadata.siteTitle;

  return (
    <Styled.Logo to="/">
        <Styled.SvgContainer>
          <Icon/>
        </Styled.SvgContainer>
      <Styled.Text>{logoTitle}</Styled.Text>
    </Styled.Logo>
  );
};

export default Logo;

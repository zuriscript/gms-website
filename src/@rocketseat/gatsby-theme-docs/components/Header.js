import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';

import GHeader from 'components/Header';

const Container = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 40px;
  margin-bottom: 24px;
  h2 {
    margin: 0;
    border: none;
    padding: 0;
    font-size: 18px;
    @media (max-width: 359px) {
      font-size: 14px;
    }
  }
  button {
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  @media (min-width: 780px) {
    display:none;
  }
`;

export default function Header({ handleMenuOpen }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteTitle
          }
        }
      }
    `,
  );

  const { siteTitle } = site.siteMetadata;

  return (
   <GHeader onToggle={handleMenuOpen} />
  );
}

Header.propTypes = {
  handleMenuOpen: PropTypes.func.isRequired,
};
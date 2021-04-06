import React from 'react';
import { Link } from 'gatsby';

import SEO from 'components/SEO';

import tw, { styled } from "twin.macro"
import Icon from "assets/svg/logo.inline.dark.svg";


export const Content = styled.div`
  ${tw`h-screen flex flex-col justify-center items-center`};
`;

export const Title = styled.h1`
  ${tw`text-3xl md:text-4xl`};
`;

export const ClickableIcon = styled(Icon)`
  ${tw`cursor-pointer`};
`;



const NotFoundPage: React.FC = () => (
  <Content> 
    <SEO title="404: Not found" />
        <Title>404: Page not found</Title>
        <p>This Path does not exists</p>
        <Link  to="/"><ClickableIcon/></Link>
  </Content>
);

export default NotFoundPage;

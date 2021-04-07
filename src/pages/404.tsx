import React from 'react';
import { Link } from 'gatsby';

import SEO from 'components/SEO';

import tw, { styled } from "twin.macro"
import Icon from "assets/svg/logo.inline.svg";

import * as Styled from "components/AnimationLines/styles";
import {Display, Height, Length, Tone} from "helpers/definitions";


export const Content = styled.div`
  ${tw`h-screen bg-background flex flex-col justify-center items-center overflow-hidden`};
`;

export const Title = styled.h1`
  ${tw`text-3xl text-white md:text-4xl font-nunitosans`};
`;

export const Text = styled.p`
  ${tw`text-xl text-white font-nunitosans`};
`;

export const ClickableIcon = styled(Icon)`
  ${tw`cursor-pointer`};
`;



const NotFoundPage: React.FC = () => (
  <Content> 
    <SEO title="404: Not found" />
    <Styled.Line
          tone = {Tone.GREEN_MEDIUM}
          length = {Length.LONG}
          height = {Height.SMALL}
          display = {Display.LEFT}
          animate={{ x: [-100, 0, 0, -100,-100] }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }} />
        <Styled.Line
          tone = {Tone.RED_DARK}
          length = {Length.MEDIUM}
          height = {Height.SMALL}
          display = {Display.LEFT}
          animate={{ x: [-100, 0, 0, 0, -100, -100, -100] }}
          transition={{ ease: "linear", duration: 5, repeat: Infinity }} />
    
    <Styled.Space height={Height.SMALL} />
        <Title>404: Page not found</Title>
        <Text>This Path does not exists</Text>
        <Link to="/"><ClickableIcon/></Link>
        <Styled.Space height={Height.SMALL} />
        <Styled.Line
          tone = {Tone.YELLOW_BRIGHT}
          length = {Length.SHORT}
          height = {Height.VERY_SMALL}
          display = {Display.RIGHT}
          animate={{ x: [100, 0, 100] }}
          transition={{ ease: "linear", duration: 6, repeat: Infinity }} />
      <Styled.Line
          tone = {Tone.BLUE_MEDIUM}
          length = {Length.VERY_LONG}
          height = {Height.SMALL}
          display = {Display.RIGHT}
          animate={{ x: [50, 100,50] }}
          transition={{ ease: "linear", duration: 4, repeat: Infinity }} />
  </Content>
);

export default NotFoundPage;

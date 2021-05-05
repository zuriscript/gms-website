import React from 'react';
import { Link } from 'gatsby';

import SEO from 'components/SEO';

import tw, { styled } from "twin.macro"

import * as Styled from "components/AnimationLines/styles";
import {Display, Height, Length, Tone} from "helpers/definitions";

export const Content = styled.div`
  ${tw`h-screen bg-background flex flex-col justify-center items-center text-center overflow-hidden`};
`;

export const Title = styled.h1`
  ${tw`text-3xl text-white md:text-4xl font-nunitosans my-0`};
`;

export const SubTitle = styled.h2`
  ${tw`text-lg font-light text-white font-nunitosans mt-0`};
`;

export const Text = styled.p`
  ${tw`text-xl text-white font-nunitosans m-0`};
`;

export const ButtonGroup = styled.span`
  ${tw`mt-4 mb-8`};
`;

export const Button = styled.button`
  ${tw`bg-transparent hover:bg-green-400 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded mr-2`};
`;



const SisaPage: React.FC = () => (
  <Content> 
    <SEO title="SISA" />
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
        <Title>SISA</Title>
        <SubTitle>Set-Centric Instruction Set Architecture for Graph Mining on Processing-in-Memory Systems</SubTitle>
        <Text>This page is under construction 🔨</Text>
        <Text>More information will follow soon...</Text>
        <ButtonGroup>
          <a href="https://arxiv.org/pdf/2104.07582.pdf" rel="noopener"><Button>Go to Paper</Button></a>
          <Link to="/"><Button>Go Home</Button></Link>
        </ButtonGroup>
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

export default SisaPage;

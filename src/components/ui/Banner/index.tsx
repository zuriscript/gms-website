import React from 'react';
import * as Styled from './styles';
import tw, {css} from "twin.macro"
import { StaticImage } from "gatsby-plugin-image"

interface Props {
  title: string;
  subtitle: string;
}

const Banner: React.FC<Props> = ({ title, subtitle }) => (
  <Styled.Banner>
     <Styled.Title>{title}</Styled.Title>
     <Styled.SubTitle>{subtitle}</Styled.SubTitle>
     <Styled.ImageContainer>
        <StaticImage
        src="../../../assets/images/gmsDesign.png"
        alt="GMS"
        placeholder="blurred"
      />
   </Styled.ImageContainer>
  </Styled.Banner>
);

export default Banner;

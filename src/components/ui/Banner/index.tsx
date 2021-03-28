import React from 'react';
import * as Styled from './styles';

interface Props {
  title: string;
  subtitle: string;
}

const Banner: React.FC<Props> = ({ title, subtitle }) => (
  <Styled.Banner>
     <Styled.Title>{title}</Styled.Title>
     <Styled.SubTitle>{subtitle}</Styled.SubTitle>
  </Styled.Banner>
);

export default Banner;

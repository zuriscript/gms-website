import React from 'react';

import Container from 'components/ui/Container';

import * as Styled from './styles';
import AnimationLines from 'components/AnimationLines';

const Footer: React.FC = () => (
  <Styled.Footer>
    <AnimationLines/>
    <Styled.CopyrightText>© Copyright 2021. All rights reserved</Styled.CopyrightText>
  </Styled.Footer>
);

export default Footer;

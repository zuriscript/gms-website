import React from 'react'

import MainNav from './MainNav';
import Logo from './Logo';

import * as Styled from './styles';
import { Display } from 'helpers/definitions';

interface Props{
  siteTitle: string;
  display: Display;
  onToggle?: Function;
}


const Header: React.FC<Props> = ({ siteTitle, display, onToggle }) =>
{
  const isBrowser :boolean = typeof window !== "undefined"
  let shouldAnimate :boolean = false;
  let windowWidth: number = 1000;
  if(isBrowser)
  {
    shouldAnimate = samePlace();
    windowWidth = window.innerWidth;
    
  }
  

  return (
    <Styled.Header>
      <Styled.Wrapper
        display = {display}
        shouldAnimate = {shouldAnimate}
        animate={shouldAnimate ? { maxWidth: display == Display.LEFT ? [768,windowWidth] : [windowWidth, 768] } : false}
        transition={{ ease: display == Display.LEFT ? "anticipate" : "backOut", duration: 1.25 }} >
        <Logo />
        <MainNav onToggle={onToggle}/>
      </Styled.Wrapper>
    </Styled.Header>
  );
}

Header.defaultProps = {
  siteTitle: ``,
  display: Display.LEFT
};

export default Header;


function samePlace() : boolean {
  const cur  = window.location.pathname;
  const prev = (window as any).PreviousPath;

  return (prev === undefined) || (cur && prev && cur.split('/')[1] !== prev.split('/')[1]);
}


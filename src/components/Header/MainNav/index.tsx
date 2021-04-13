import React, { useState } from 'react';

import * as Styled from './styles';

interface MainNavItem {
  title: string;
  slug: string;
}

const mainNavItems: MainNavItem[] = [
  {
    title: 'GMS',
    slug: '/'
  },
  {
    title: 'Docs',
    slug: '/docs/'
  },
  {
    title: 'Code',
    slug: 'https://github.com/zurvar/gms-website'
  },
];

interface NavParams
{
  onToggle?: Function
}
const MainNav: React.FC<NavParams> = ({onToggle}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Styled.MainNav open={open}>
        {mainNavItems.map((item, index) => (
          item.slug.includes('http') || item.slug.includes('www') ?
            <Styled.MainNavItemExternal
              key={`nav-item-${index}`}
              href={item.slug}
              whileTap={{ scale: 0.9 }}>
              {item.title}
            </Styled.MainNavItemExternal>
            :
            <Styled.MainNavItem
              key={`nav-item-${index}`}
              to={item.slug}
              activeClassName="active"
              whileTap={{ scale: 0.9 }}>
              {item.title}
            </Styled.MainNavItem>
        ))}
      </Styled.MainNav>
      <Styled.ToogleMainNav open={open} onClick={() => onToggle? onToggle() : setOpen(!open)}>
        <span />
        <span />
        <span />
      </Styled.ToogleMainNav>
    </>
  );
};

export default MainNav;



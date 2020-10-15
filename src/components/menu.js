import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { navLinks } from '@config';
import styled from 'styled-components';
import { theme, mixins, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  outline: 0;
  transition: ${theme.transition};
  transform: translateX(${props => (props.menuOpen ? 0 : 100)}vw);
  visibility: ${props => (props.menuOpen ? 'visible' : 'hidden')};
  display: none;
  ${media.tablet`display: block;`};
`;
const Sidebar = styled.aside`
  ${mixins.flexCenter};
  flex-direction: column;
  background-color: ${colors.green};
  padding: 50px;
  width: 30vw;
  min-height: 300px;
  height: 100%;
  position: relative;
  right: 0;
  margin-left: auto;
  font-family: ${fonts.SFMono};
  ${media.phone`padding: 25px;`};
  ${media.tablet`width: 50vw;`};
  ${media.tiny`padding: 10px;`};
`;
const NavLinks = styled.nav`
  ${mixins.flexBetween};
  width: 100%;
  flex-direction: column;
  text-align: center;
  color: ${colors.lightestSlate};
`;
const NavList = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;
  width: 100%;
`;
const NavListItem = styled.li`
  margin: 0 auto 20px;
  position: relative;
  font-size: ${fontSizes.lg};
  ${media.thone`
    margin: 0 auto 10px;
    font-size: ${fontSizes.md};
  `};
  ${media.tiny`font-size: ${fontSizes.smish};`};
  &:before {
    display: block;
  }
`;
const NavLink = styled(Link)`
  ${mixins.link};
  padding: 3px 20px 20px;
  width: 100%;
`;

const Menu = ({ menuOpen, toggleMenu }) => {
  const handleMenuClick = e => {
    const target = e.target;
    const isLink = target.hasAttribute('href');
    const isNotMenu = target.classList && target.classList[0].includes('StyledContainer');

    if (isLink || isNotMenu) {
      toggleMenu();
    }
  };

  return (
    <StyledContainer
      menuOpen={menuOpen}
      onClick={handleMenuClick}
      aria-hidden={!menuOpen}
      tabIndex={menuOpen ? 1 : -1}>
      <Sidebar>
        <NavLinks>
          <NavList>
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <NavListItem key={i}>
                  <NavLink to={url}>{name}</NavLink>
                </NavListItem>
              ))}
          </NavList>
        </NavLinks>
      </Sidebar>
    </StyledContainer>
  );
};

Menu.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Menu;

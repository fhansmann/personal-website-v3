import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Head, Nav, Social, Footer } from '@components';
import styled from 'styled-components';
import { GlobalStyle, theme } from '@styles';
const { colors } = theme;

// https://medium.com/@chrisfitkin/how-to-smooth-scroll-links-in-gatsby-3dc445299558
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a[href*="#"]');
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${props => (props.mode ? colors.lightNavy : colors.white)};
`;
const Content = styled.div`
  background-color: ${props => (props.mode ? colors.lightNavy : colors.white)};
`;

const Layout = ({ children, location, toggler, mode }) => {
  const isHome = location.pathname === '/';

  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          site {
            siteMetadata {
              title
              siteUrl
              description
            }
          }
        }
      `}
      render={({ site }) => (
        <div id="root">
          <Head metadata={site.siteMetadata} />
          <GlobalStyle />
          <StyledContent mode={mode}>
            <Nav isHome={isHome} toggler={toggler} mode={mode} />
            <Social isHome={isHome} mode={mode} />
            <Content mode={mode}>
              {children}
              <Footer mode={mode} />
            </Content>
          </StyledContent>
        </div>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  toggler: PropTypes.bool,
  mode: PropTypes.bool,
};

export default Layout;

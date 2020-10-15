import React, { createContext } from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { Layout, Hero, About, Projects, Contact, Resume, useDarkMode } from '@components';
import styled from 'styled-components';
import { Main, theme } from '@styles';
const { colors } = theme;

const StyledMainContainer = styled(Main)`
  counter-reset: section;
  background-color: ${props => (props.mode ? colors.lightNavy : colors.white)};
`;

export const ThemeContext = createContext();

const IndexPage = ({ location, data }) => {
  const [themer, themeToggler] = useDarkMode();

  return (
    <ThemeContext.Provider value={themer}>
      <Layout location={location} toggler={themeToggler} mode={themer}>
        <StyledMainContainer mode={themer} className="fillHeight">
          <Hero data={data.hero.edges} />
          <About data={data.about.edges} />
          <Resume />
          <Projects data={data.projects.edges} />
          <Contact data={data.contact.edges} />
        </StyledMainContainer>
      </Layout>
    </ThemeContext.Provider>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          frontmatter {
            title
            name
            subtitle
          }
          html
        }
      }
    }
    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          frontmatter {
            title
            avatar {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            skills
          }
          html
        }
      }
    }

    projects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { showInProjects: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tech
            github
          }
          html
        }
      }
    }
    contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;

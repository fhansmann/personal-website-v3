import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Layout, useDarkMode } from '@components';
import styled from 'styled-components';
import { Main, mixins, theme } from '@styles';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
const { colors } = theme;

const StyledMainContainer = styled(Main)`
  counter-reset: section;
  color: ${props => (props.mode ? colors.lightNavy : colors.white)};
`;

const StyledResume = styled.a`
  ${mixins.bigButton};
  border: 1px solid ${props => (props.color ? colors.white : colors.green)};
  color: ${props => (props.color ? colors.white : colors.green)};
  margin-top: 25px;
  margin-right: 25px;
`;

const StyledHomeButton = styled(Link)`
  ${mixins.bigButton};
  margin-top: 40px;
`;

const Text = styled.div`
  color: ${props => (props.mode ? colors.white : colors.lightNavy)};
`;

const Work = ({ location }) => {
  const [themer, themeToggler] = useDarkMode();

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/resume/" } }) {
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
  `);

  return (
    <Layout location={location} mode={themer} toggler={themeToggler}>
      <Helmet>
        <title>Looking for Work</title>
        <link rel="canonical" href="https://florians.dev/work" />
      </Helmet>

      <StyledMainContainer mode={themer}>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id} mode={themer}>
            <h3>{node.frontmatter.title}</h3>
            <Text mode={themer} dangerouslySetInnerHTML={{ __html: node.html }} />
          </div>
        ))}
        <StyledResume
          href="src/public/static/resume.pdf"
          target="_blank"
          rel="nofollow noopener noreferrer">
          Detailed Resume
        </StyledResume>
        <StyledHomeButton to="/">Go Home</StyledHomeButton>
      </StyledMainContainer>
    </Layout>
  );
};

Work.propTypes = {
  location: PropTypes.object.isRequired,
};

export default Work;

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Layout } from '@components';
import styled from 'styled-components';
import { Main } from '@styles';
import { Helmet } from 'react-helmet';

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

const Work = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/work/" } }) {
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
    <Layout location={location}>
      <Helmet>
        <title>Looking for Work</title>
        <link rel="canonical" href="https://florians.dev/work" />
      </Helmet>

      <StyledMainContainer>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>{node.frontmatter.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
          </div>
        ))}
      </StyledMainContainer>
    </Layout>
  );
};

export default Work;

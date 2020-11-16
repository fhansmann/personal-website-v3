import React, { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { srConfig } from '@config';
import sr from '@utils/sr';
import styled from 'styled-components';
import { mixins, media, Section, Heading } from '@styles';
import PropTypes from 'prop-types';

const StyledContainer = styled(Section)`
  position: relative;
`;
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;
const StyledWorkLink = styled.a`
  ${mixins.bigButton};
  border: 1px solid colors.green;
  color: colors.green;
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Resume = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

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
    <StyledContainer id="resume" ref={revealContainer}>
      <Heading>Resume</Heading>
      <StyledFlexContainer>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3>{node.frontmatter.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: node.html }} />
          </div>
        ))}
      </StyledFlexContainer>
      <StyledWorkLink target="_blank" to="https://drive.google.com/file/d/12CnEFAYRoxYjp1CbDas-VVlz-IFWUtQ-/view?usp=sharing">Detailed Resume</StyledWorkLink>
    </StyledContainer>
  );
};

Resume.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Resume;

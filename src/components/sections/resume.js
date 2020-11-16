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
const StyledLink = styled.a`
  ${mixins.inlineLink};
  text-align: center;
  margin: 30px auto 0;
  &:after {
    bottom: 0.1em;
  }
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
      <StyledLink
        href={'https://drive.google.com/file/d/12CnEFAYRoxYjp1CbDas-VVlz-IFWUtQ-/view?usp=sharing'}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label={'resume'}>
        Click here to see full CV
      </StyledLink>
    </StyledContainer>
  );
};

Resume.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Resume;

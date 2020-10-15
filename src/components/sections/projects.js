import React, { useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
import { ThemeContext } from '../../pages/index';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`;
const StyledTitle = styled.h4`
  margin: 0 auto;
  font-size: ${fontSizes.h3};
  ${media.tablet`font-size: 24px;`};
  a {
    display: block;
  }
`;
const StyledArchiveLink = styled.a`
  ${mixins.inlineLink};
  text-align: center;
  margin: 10px auto 0;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.md};
  &:after {
    bottom: 0.1em;
  }
`;
const StyledGrid = styled.div`
  margin-top: 50px;

  .projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    ${media.desktop`grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));`};
  }
`;
const StyledProjectInner = styled.div`
  ${mixins.flexBetween};
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  padding: 2rem 1.75rem;
  height: 100%;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
  background-color: ${props => (props.color ? colors.lightestNavy : colors.grey)};
`;
const StyledProject = styled.div`
  transition: ${theme.transition};
  cursor: default;
  &:hover,
  &:focus {
    outline: 0;
    ${StyledProjectInner} {
      transform: translateY(-5px);
    }
  }
`;
const StyledProjectHeader = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 30px;
`;
const StyledFolder = styled.div`
  color: ${colors.green};
  svg {
    width: 40px;
    height: 40px;
  }
`;
const StyledProjectLinks = styled.div`
  margin-right: -10px;
  color: ${colors.lightSlate};
`;
const StyledIconLink = styled.a`
  position: relative;
  top: -10px;
  padding: 10px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const StyledProjectName = styled.h5`
  margin: 0 0 10px;
  font-size: ${fontSizes.xxl};
  color: ${colors.lightestNavy};
`;
const StyledProjectDescription = styled.div`
  font-size: 17px;
  color: ${props => (props.color ? colors.white : colors.lightestNavy)};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledTechList = styled.ul`
  display: flex;
  align-items: flex-end;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0;
  margin: 20px 0 0 0;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.xs};
    color: ${colors.slate};
    line-height: 1.75;
    margin-right: 15px;
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Projects = ({ data }) => {
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const mode = useContext(ThemeContext);

  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 6;
  const projects = data.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = firstSix;

  return (
    <StyledContainer id="projects" ref={revealTitle}>
      <StyledTitle>Selected Projects</StyledTitle>

      <StyledArchiveLink
        href={'https://github.com/fhansmann'}
        target="_blank"
        rel="nofollow noopener noreferrer"
        aria-label={'Github'}>
        View the Archive
      </StyledArchiveLink>

      <StyledGrid>
        <TransitionGroup className="projects">
          {projectsToShow &&
            projectsToShow.map(({ node }, i) => {
              const { frontmatter, html } = node;
              const { github, title, tech } = frontmatter;
              return (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    tabIndex="0"
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    <StyledProjectInner color={mode}>
                      <header>
                        <StyledProjectHeader>
                          <StyledFolder>
                            <FormattedIcon name="Folder" />
                          </StyledFolder>
                          <StyledProjectLinks>
                            {github && (
                              <StyledIconLink
                                href={github}
                                target="_blank"
                                rel="nofollow noopener noreferrer"
                                aria-label="GitHub Link">
                                <FormattedIcon name="GitHub" />
                              </StyledIconLink>
                            )}
                          </StyledProjectLinks>
                        </StyledProjectHeader>
                        <StyledProjectName>{title}</StyledProjectName>
                        <StyledProjectDescription
                          dangerouslySetInnerHTML={{ __html: html }}
                          color={mode}
                        />
                      </header>
                      <footer>
                        {tech && (
                          <StyledTechList>
                            {tech.map((tech, i) => (
                              <li key={i}>{tech}</li>
                            ))}
                          </StyledTechList>
                        )}
                      </footer>
                    </StyledProjectInner>
                  </StyledProject>
                </CSSTransition>
              );
            })}
        </TransitionGroup>
      </StyledGrid>
    </StyledContainer>
  );
};

Projects.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Projects;

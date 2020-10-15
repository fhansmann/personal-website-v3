import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
import { FormattedIcon } from '@components/icons';
import { Link } from 'gatsby';
import { ThemeContext } from '../../pages/index';
const { colors, fontSizes, fonts, navDelay, loaderDelay } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  ${media.phone`padding-top: 85px;`};
  div {
    width: 100%;
  }
`;
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;

const StyledContentContainer = styled.div`
  padding: 0px,
  margin: 0px;
  max-width: 700px;
`;
const StyledOverline = styled.h1`
  color: ${colors.green};
  margin: 0 0 20px 3px;
  font-size: ${fontSizes.lg};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`;
const StyledTitle = styled.h2`
  color: ${props => (props.color ? colors.white : colors.lightNavy)};
  font-size: 75px;
  line-height: 1.1;
  margin: 0;
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledSubtitle = styled.h3`
  font-size: 55px;
  line-height: 1.1;
  color: ${colors.slate};
  ${media.desktop`font-size: 60px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledDescription = styled.div`
  margin-top: 25px;
  width: 50%;
  max-width: 500px;
  color: ${props => (props.color ? colors.white : colors.lightNavy)};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledPicture = styled.div`
  position: relative;
  max-width: 270px;
  max-height: 270px;
  ${media.phone`margin-left: 25px;`};
`;
const StyledWorkLink = styled(Link)`
  ${mixins.bigButton};
  border: 1px solid ${props => (props.color ? colors.white : colors.green)};
  color: ${props => (props.color ? colors.white : colors.green)};
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const mode = useContext(ThemeContext);

  const { frontmatter, html } = data[0].node;

  const one = () => (
    <StyledOverline style={{ transitionDelay: '100ms' }}>{frontmatter.title}</StyledOverline>
  );
  const two = () => (
    <StyledTitle style={{ transitionDelay: '200ms' }} color={mode}>
      {frontmatter.name}.
    </StyledTitle>
  );
  const three = () => (
    <StyledSubtitle style={{ transitionDelay: '300ms' }}>{frontmatter.subtitle}</StyledSubtitle>
  );
  const four = () => (
    <StyledDescription
      style={{ transitionDelay: '400ms' }}
      dangerouslySetInnerHTML={{ __html: html }}
      color={mode}
    />
  );

  const five = () => (
    <div style={{ transitionDelay: '500ms' }}>
      <StyledWorkLink to="/work" color={mode}>
        Looking for work!
      </StyledWorkLink>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledContainer>
      <StyledFlexContainer>
        <StyledContentContainer>
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  {item}
                </CSSTransition>
              ))}
          </TransitionGroup>
        </StyledContentContainer>
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames="fadeup">
              <StyledPicture style={{ transitionDelay: '700ms' }}>
                <FormattedIcon name={'AvatarDark'} />
              </StyledPicture>
            </CSSTransition>
          )}
        </TransitionGroup>
      </StyledFlexContainer>
    </StyledContainer>
  );
};

Hero.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Hero;

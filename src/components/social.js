import React from 'react';
import PropTypes from 'prop-types';
import { socialMedia } from '@config';
import { Side } from '@components';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme } from '@styles';
const { colors } = theme;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: ${props => (props.color ? colors.lightNavy : colors.white)};

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 90px;
    margin: 0 auto;
    background-color: ${props => (props.color ? colors.white : colors.lightNavy)};
  }

  li:last-of-type {
    margin-bottom: 20px;
  }
`;
const StyledLink = styled.a`
  padding: 10px;
  &:hover,
  &:focus {
    transform: translateY(-4px);
  }
  svg {
    width: 25px;
    height: 25px;
    fill: ${props => (props.color ? colors.white : colors.lightNavy)};
  }
`;

const Social = ({ isHome, mode }) => (
  <Side isHome={isHome} orientation="left" color={mode}>
    <StyledList color={mode}>
      {socialMedia &&
        socialMedia.map(({ url, name }, i) => (
          <li key={i}>
            <StyledLink
              color={mode}
              href={url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              aria-label={name}>
              <FormattedIcon name={name} />
            </StyledLink>
          </li>
        ))}
    </StyledList>
  </Side>
);

Social.propTypes = {
  isHome: PropTypes.bool,
  mode: PropTypes.bool,
};

export default Social;

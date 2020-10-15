import addToMailchimp from 'gatsby-plugin-mailchimp';
import React, { useState, useContext } from 'react';
import { theme, Button } from '@styles';
import styled from 'styled-components';
import { ThemeContext } from '../pages/index';
const { colors, fontSizes, fonts } = theme;

const SubmitButton = styled(Button)`
  font-size: ${fontSizes.sm};
  margin-top: 1rem;
  padding: 0.9rem 1rem;
  border: 1px solid ${props => (props.color ? colors.white : colors.green)};
  color: ${props => (props.color ? colors.white : colors.green)};
`;

const SubmittedAlert = styled.div`
  font-size: ${fontSizes.sm};
  margin-top: 1rem;
  color: ${colors.green};
  background-color: transparent;
  font-family: ${fonts.SFMono};
  line-height: 1;
  padding: 1.25rem 1.75rem;
`;

const InputForm = styled.input`
  color: ${props => (props.color ? colors.white : colors.lightNavy)};
  background-color: ${props => (props.color ? colors.lightNavy : colors.white)};
  width: 250px;
  border: none;
  margin-top: 1.1rem;
  font-size: ${fontSizes.sm};
  font-family: ${fonts.SFMono};
  line-height: 2;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label``;

const MailChimp = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const mode = useContext(ThemeContext);

  const handleSubmit = event => {
    event.preventDefault();
    event.target.reset();

    addToMailchimp(email)
      .then(() => {
        setSubmitted(true);
      })
      .catch(() => {});
  };
  const handleEmailChange = event => {
    setEmail(event.currentTarget.value);
  };

  return (
    <form onSubmit={handleSubmit} color={mode}>
      <Wrapper>
        {submitted ? (
          <SubmittedAlert>Thanks!</SubmittedAlert>
        ) : (
          <>
            <InputForm
              placeholder="Tim@apple.com"
              name="email"
              type="text"
              aria-label="input"
              onChange={handleEmailChange}
              color={mode}
            />
            <Label for="email"></Label>
            <SubmitButton aria-label="Submit" type="submit" color={mode}>
              Subscribe
            </SubmitButton>
          </>
        )}
      </Wrapper>
    </form>
  );
};

export default MailChimp;

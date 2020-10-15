import { useState } from 'react';

const useDarkMode = () => {
  const [themer, setTheme] = useState(false);

  const themeToggler = () => {
    themer === false ? setTheme(true) : setTheme(false);
  };

  return [themer, themeToggler];
};

export default useDarkMode;

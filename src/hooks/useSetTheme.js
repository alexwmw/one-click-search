const useSetTheme = () => {

  useEffect(() => {
    const theme = options?.theme?.dictionary[options.theme.value];
    setTheme(theme);
  }, [options.theme]);

};

export default useSetTheme;

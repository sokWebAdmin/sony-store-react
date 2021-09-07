export const handleChange = event => {
  const { name, value } = event.target;

  return setStateFunction => {
    setStateFunction(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
};
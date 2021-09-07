export const handleChange = inputEvent => {
  const { name, value } = inputEvent.target;

  return setStateFunction => setObjectState(name, value)(setStateFunction)
};

export const setObjectState = (key, value) => setStateFunction => {
  setStateFunction(prevState => ({
    ...prevState,
    [key]: value,
  }));
}
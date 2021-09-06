import { useCallback, useState } from "react"

export const useToggle = initial => {
  const [toggleValue, setToggleValue] = useState(initial);

  const toggle = useCallback(() => {
    setToggleValue(prevState => !prevState);
  }, [ ])
  
  return [toggleValue, toggle];
}

export const useForm = (initial, validator) => {
  const [form, setForm] = useState(initial);
  
  const onChange = useCallback(({ target }) => {
    const { name, value } = target;
    if (validator(value)) {
      setForm(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  }, [ validator ]);

  const reset = useCallback(() => {
    setForm(initial);
  }, [initial]);

  return [form, onChange, reset];
}

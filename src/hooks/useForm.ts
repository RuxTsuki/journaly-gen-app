import { useState, ChangeEvent, useEffect, useMemo } from "react";

export const useForm = <T>(initialForm: T, formValidations: any = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const [formValidation, setFormValidation] = useState({});

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if ((formValidation as any)[formValue] !== null) return false;
    }
    return true;
  }, [formValidation]);

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => setFormState(initialForm);

  const createValidators = () => {
    const formCheckedValues: any = {};

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage = "Campo requerido "] =
        formValidations[formField];
      formCheckedValues[`${formField}Valid`] = fn((formState as any)[formField])
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckedValues);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    formValidation,
    isFormValid,
  };
};

import { ReactNode } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
  } from "react-hook-form";
  
  type TFormConfig = {
    resolver?: any;
    defaultValues?: Record<string, any>;
  };
  
  type TFormProps = {
    children: ReactNode;
    onSubmit: SubmitHandler<FieldValues>;
    formReset?: boolean;
  } & TFormConfig;
  
  const CustomForm = ({
    children,
    onSubmit,
    resolver,
    defaultValues,
    formReset,
  }: TFormProps) => {
    const formConfig: TFormConfig = {};
  
    if (resolver) {
      formConfig["resolver"] = resolver;
    }
  
    if (defaultValues) {
      formConfig["defaultValues"] = defaultValues;
    }
  
    const methods = useForm(formConfig);
    const { handleSubmit, reset } = methods;
  
    const submit: SubmitHandler<FieldValues> = (data) => {
      // console.log(data);
      onSubmit(data);
      if (formReset) {
        reset();
      }
    };
  
    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(submit)}>{children}</form>
      </FormProvider>
    );
  };
  
  export default CustomForm;
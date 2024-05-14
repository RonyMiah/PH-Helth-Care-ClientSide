import { ReactNode } from 'react';
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';

type TFromConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type HandleFormProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
} & TFromConfig;

const PHForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: HandleFormProps) => {
  const formConfig: TFromConfig = {};

  if (resolver) {
    formConfig['resolver'] = resolver;
  }
  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }
0
  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    reset();
    // console.log(data);f
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;

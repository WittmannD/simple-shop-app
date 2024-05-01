import { Button, Card, CardBody, Input } from '@nextui-org/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import PhoneInput from 'react-phone-number-input/react-hook-form-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

const schema = yup
  .object({
    firstName: yup.string().required('Enter you first name'),
    lastName: yup.string().required('Enter you last name'),
    address: yup.string().required('Address is required'),
    phone: yup
      .string()
      .required('Phone number is required')
      .test(
        'validUAPhoneNumber',
        'Phone number is not valid',
        (value) => {
          return isValidPhoneNumber(value, 'UA')
        }
      ),
  })
  .required()

export const OrderForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit: SubmitHandler<yup.InferType<typeof schema>> = (data) =>
    console.log(data)

  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-6">
            <Input
              label="First name"
              {...register('firstName')}
              isInvalid={Boolean(errors.firstName)}
              errorMessage={errors.firstName?.message}
            />
            <Input
              label="Last name"
              {...register('lastName')}
              isInvalid={Boolean(errors.lastName)}
              errorMessage={errors.lastName?.message}
            />
            <Input
              label="Address"
              {...register('address')}
              isInvalid={Boolean(errors.address)}
              errorMessage={errors.address?.message}
            />
            <PhoneInput
              label="Phone number"
              control={control}
              name={'phone'}
              inputComponent={Input}
              isInvalid={Boolean(errors.phone)}
              errorMessage={errors.phone?.message}
            />
            <Button color="primary" fullWidth={true} type="submit">
              Order
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}

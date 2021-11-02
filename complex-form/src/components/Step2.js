import React from "react";
import Typography from "@material-ui/core/Typography";
import MainContainer from "./MainContainer";
import Form from "./Form";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import PrimaryButton from "./PrimaryButton";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Checkbox, FormControlLabel } from "@material-ui/core";
import parsePhoneNumberFromString from "libphonenumber-js";
import { useData } from "../DataContext";

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Email should have correct format')
        .required('Email is a required field')
});

const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumberFromString(value)
    if (!phoneNumber) {
        return value
    }

    return(
        phoneNumber.formatInternational()
    )
}

const Step2 = () => {
    const history = useHistory();

    const { data, setValues } = useData();

    const {register, handleSubmit, formState: { errors }, watch} = useForm({
        defaultValues: {
            email: data.email, 
            hasPhone: data.hasPhone, 
            phoneNumber: data.phoneNumber
        },
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const hasPhone = watch('hasPhone')

    const onSubmit = (data) => {
        history.push('/step3');
        if (!data.hasPhone) {
            const {phoneNumber, ...newData} = data;
            setValues(newData);
        } else {
            setValues(data);
        }
    }

    return (
        <MainContainer>
            <Typography 
                component='h2' 
                variant='h5'
            >
                🍄 Step 2
            </Typography>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input 
                    {...register('email')} 
                    id='email'
                    type='email'
                    label='Email'
                    name='email'
                    required
                    error={!!errors.email}
                    helperText={errors?.email?.message}
                />

                <FormControlLabel control={
                    <Checkbox 
                        defaultValue={data.hasPhone} 
                        defaultChecked={data.hasPhone} 
                        name='hasPhone' 
                        {...register('hasPhone')} 
                        color='primary'
                    />
                } label='Do you have a phone?'/>

                {
                    hasPhone && (
                        <Input 
                            {...register('phoneNumber')} 
                            id='phoneNumber'
                            type='tel'
                            label='Phone number'
                            name='phoneNumber'
                            onChange={(evt) => {
                                evt.target.value = normalizePhoneNumber(evt.target.value)
                            }}
                        />
                    )
                }

                <PrimaryButton >
                    Next
                </PrimaryButton>
            </Form>
        </MainContainer>
    );
}

export default Step2;
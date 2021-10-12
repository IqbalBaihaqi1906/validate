import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function Form(props) {
    
    const [form,setForm] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)

    const onSubmit = data => {
        setForm(data)
        setIsSubmit(true)
        props.setIsSuccess(true)
    };

    const donationSchema = yup.object({
        donation : yup.number().required().min(10),
        email : yup.string().email().required(),
        fullname : yup.string().matches(/^[a-zA-Z\s]+$/,"Harus Alphabet").required(),
        nric : yup.string().required().matches(/^[TFSG]\d{7}[A-Z]$/,"Format NRIC tidak valid"),
        address : yup.string().min(10).max(60),
        phone_number : yup.string().min(10).matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,"Nomer Telepon Tidak Valid")
        
    })

    const { register,watch,handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(donationSchema)
      });

    useEffect(() => {
        console.log(form)
        console.log(errors)
    },[form,errors])

    let input = watch()

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="number" placeholder="minimum donation" {...register("donation")}/>
                <p>{input.donation || isSubmit ? errors.donation?.message : null}</p>

                <input type="email" placeholder="email" {...register("email")}/>
                <p>{input.email ? errors.email?.message : null}</p>

                <input type="text" placeholder="fullname" {...register("fullname")}/>
                <p>{input.fullname ? errors.fullname?.message : null}</p>

                <input type="text" placeholder="nric" {...register("nric")}/>
                <p>{input.nric ? errors.nric?.message : null}</p>

                <input type="text" placeholder="address" {...register("address")}/>
                <p>{input.address ? errors.address?.message : null}</p>

                <input type="text" placeholder="phone number" {...register("phone_number")}/>
                <p>{input.phone_number ? errors.phone_number?.message : null}</p>

                <input type="submit" value="Submit" onClick={() => setIsSubmit(true)}/>
            </form>
        </div>
    )
}

export default Form

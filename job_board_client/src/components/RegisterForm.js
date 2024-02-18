import React from "react";
import { useForm } from "react-hook-form";
import CustomTextField from "./CustomTextField";
import { Button, Box, useToast } from "@chakra-ui/react";

const RegisterForm = () => {
  const toast = useToast()
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const registerdata = {
      fullname: data.Name,
      email: data.Email,
      password: data.Password,
    };
    console.log(data)
    const response = await fetch("https://job-board-server-eo10.onrender.com/login/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerdata),
    });
    const responseBody = await response.text();
      const userdata = {
        fullname : data.Name,
        email : data.Email
      }
      const signupuser = await fetch("https://job-board-server-eo10.onrender.com/profile/signup",{
        method:"POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userdata)  
      })
      const signupdata = await signupuser.json()
      console.log(signupdata)
    console.log('Success:', responseBody);
    toast({ description: `Fetch resolved ${responseBody}` });
    reset();
  };
  return (
    <Box
      width="500px"
      display="flex"
      flexDirection="column"
      backgroundColor="#28c34"
      gap="16px"
      justifyContent="center"
      alignItems="center"
    >
      {" "}
      <CustomTextField
        name="Name"
        label="Name"
        control={control}
        type="text"
        placeholder="Name"
        errors={errors}
      />
      <CustomTextField
        name="Email"
        label="Email"
        control={control}
        type="text"
        placeholder="johndoe@mail.com"
        errors={errors}
      />
      <CustomTextField
        name="Password"
        label="Password"
        control={control}
        type="password"
        placeholder="Password"
        errors={errors}
      />
      <Button
        width="250px"
        colorScheme="blue"
        borderRadius="8px"
        onClick={handleSubmit(onSubmit)}
      >
        Register
      </Button>
    </Box>
  );
};

export default RegisterForm;

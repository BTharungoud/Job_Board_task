import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { useAuth } from '../context/AuthContext';
import CustomTextField from '../components/CustomTextField';
import { useForm } from "react-hook-form"
import { Button } from '@chakra-ui/react';
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {storage} from "../FirebaseConfig.js";
import { useToast } from '@chakra-ui/react';
export const UserProfile = () => {
    const toast = useToast();
     
    // (async()=>{
        const { userprofiledata } =  useAuth();
    // }
    // )()
    const { control, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: userprofiledata[0]
    });
    const [resumedata, setResumeData] = useState(null);
    const [resumelink, setResumelink] = useState(null);
    // useEffect(()=>{

    // },[])
    const onSubmit = async(data) => {
        console.log(data,data.resume);
        if(data.resume!==null){
            setResumeData(data.resume.target.files[0])
            const resumerif = await ref(storage, `Resumes/${data.fullname}/${resumedata.name}`)
            uploadBytes(resumerif, resumedata).then((snapshot) =>
                {toast({title:'resume uploaded downloading url'})
                getDownloadURL(snapshot.ref)
                .then((url) => {setResumelink(url);data.resume = url})
                .catch((err)=> console.log(err,'err at downloading url'))
            })
        }
        if(data.additionalfiles.target.files[0]!==null){
            const filerif  = ref(storage,`Additionalfiles/${data.fullname}/${data.additionalfiles.target.files[0].name}`)
            uploadBytes(filerif, data.additionalfiles.target.files[0]).then((snapshot) =>
                {toast({title:'file uploaded downloading url'})
                getDownloadURL(snapshot.ref)
                .then((url) => {data.additionalfiles = url})
                .catch((err)=> console.log(err,'err at downloading url'))
            })
        }
        console.log(data)
        toast({title:"Fetch call started"});
    }
    return (
        <div style={{ width: '100%' }}>
            <NavBar />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '90%',
                    height: "90%",
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    color: 'black',
                    alignItems: 'center',
                    padding: '0.5%',
                    margin: '0.5%',
                    marginLeft: '4.5%'
                }}
            >
                <h2>PROFILE</h2>
                <div>
                    <CustomTextField name='fullname' control={control} label="Fullname" rules={{required:"Fullname Required"}} />
                    <CustomTextField name='email' control={control} label="Email" error={errors.email} rules={{
                        required: "Email is required",
                        validate: (value) => {
                            const emailRegex =
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            if (!emailRegex.test(value)) {
                                return "Enter a valid email";
                            }
                        },
                    }} />
                    <CustomTextField name='dob' control={control} label="Date of birth" error={errors} rules={{required:"Date of Birth Required"}} type='date' />
                    <CustomTextField name='city' control={control} label="City" error={errors} rules={{required:"City Required"}} />
                    <CustomTextField name='resume' control={control}  label="Resume" error={errors} rules={{required:"resume Required"}} type='file' />
                    <CustomTextField name='additionalfiles' control={control} label="Additionalfiles" error={errors} type='file' />
                    <CustomTextField name='phone' control={control} label="Phone" error={errors} rules={{required:"Phone number Required"}} />
                    <CustomTextField name='description' control={control} label="Description" error={errors} />
                    <Button width="250px"
                        colorScheme="blue"
                        borderRadius="8px"
                        onClick={handleSubmit(onSubmit)}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

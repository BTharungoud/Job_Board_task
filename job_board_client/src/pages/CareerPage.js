import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
export const CareerPage = () => {
    const [search, setSearch] = useState('')
    const [expand, setExpand] = useState('')
    const [jobprofiles, setJobprofiles] = useState([]);
    useEffect(() => {
        JobprofileFetch()
    }, [])
    const JobprofileFetch = async () => {
        const fetchData = await fetch('https://job-board-server-eo10.onrender.com/jobprofile');
        const Jobprofiles = await fetchData.json();
        setJobprofiles(Jobprofiles)
        console.log(jobprofiles, Jobprofiles);
    }
    return (
        <div>
            <NavBar />
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    overflow:'hidden'
                }}>
                <div
                    style={{ display: 'flex', alignItems: 'center', width: '80%', padding: '1%' }}
                >
                  <label>Search:</label> &nbsp; <input placeholder='Filter by JobTitle' type='text' style={{padding:'1%',width:'80%',borderRadius:'10px',color:'black'}} onChange={(e)=>setSearch(e.target.value)}/>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignSelf:'center',
                        width: '90%',
                        gap:'5px'
                    }}
                >
                    {
                        jobprofiles.length > 0 &&
                        jobprofiles
                            .filter((profile) => profile.jobtitle.toLowerCase().includes(search))
                            .map((profile) => (
                                <div
                                    style={{ display: 'flex', flexDirection: 'column', justifyItems: 'flex-start', border: '2px solid #61dafb', borderRadius: '10px',padding:'1%' }}
                                    onClick={()=>(expand.length ===0 ?setExpand(profile._id):setExpand(''))}
                                >
                                    <h3>
                                        {profile.jobtitle}    
                                    </h3>
                                    <h6>Qualification: {profile.education}</h6>
                                    <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <h6>
                                           Salary: {profile.salary}
                                        </h6>
                                        <h6>
                                           exp.required: {profile.experience}
                                        </h6>
                                    </span>
                                    <div
                                    style={
                                        expand.length > 0 && expand===(profile._id)?
                                        {width:'100%'}:{display:'none'}}
                                    >
                                        Job_Descripition:- <br/><span>{profile.jobdescripition}</span><br/>
                                        Role and Responsibilities:- <br/><span>{profile.responsibilities}</span>

                                    </div>
                                    <div
                                    style={{display:'flex', width:"100%",justifyContent:'flex-end'}} 
                                    >
                                        <button style={{borderRadius:'5px',backgroundColor:'#61dafb',padding:'0.5%'}}>Apply</button>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

import Jobprofile from "../Models/JobprofileSchema.js";

const getJobprofiles = async (req,res)=>{
    try{
        const Jobprofiles = await Jobprofile.find();
        res.status(201).send(Jobprofiles)
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
      }
}

const postJobprofile = async (req,res)=>{
    try{
        const {jobtitle,salary,experience,education,openings,jobdescripition,responsibilities} = req.body
        const JobProfile = new Jobprofile({
            jobtitle:jobtitle,
            salary:salary,
            experience:experience,
            education:education,
            openings:openings,
            jobdescripition:jobdescripition,
            responsibilities:responsibilities
        })
        await JobProfile.save()
        res.status(201).send(JobProfile)
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
      }
}

const updateJobprofile = async (req,res) => {
    try{
        const {id,jobtitle,salary,experience,education,openings,jobdescripition,responsibilities} = req.body
        const JobProfile = await Jobprofile.findByIdAndUpdate({_id:id},
            {
                jobtitle:jobtitle,
                salary:salary,
                experience:experience,
                education:education,
                openings:openings,
                jobdescripition:jobdescripition,
                responsibilities:responsibilities
            },
            { new: true }
            )
        res.status(201).send(JobProfile)
    }catch (error) {
        console.error(`Error: ${error}`);
        res.status(500).send("Internal Server Error");
      }
}

export{getJobprofiles,postJobprofile,updateJobprofile}
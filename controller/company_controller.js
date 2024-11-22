const Company = require('../modules/company');
const companySchema = require('../modules/company');
const userSchema = require('../modules/user');

const createcompany = async (req,res)=>{
  try {
    const {companyname,companydesc} = req.body
    const companyprofile = req.file ? req.file.path : null

    if(!companyname || !companydesc){
        return res.status(400).json({
            message:"please fill your company name and desc"
        })
    }

    const uniquecompanyname =  await companySchema({companyname})
    if(uniquecompanyname){
        return res.status(400).json({
            message:"company name alredy taken please try another name"
        })
    }

    const limitcompany = await userSchema.findById(req.userId)
    if(limitcompany.Company){
        return res.status(400).json({
            message:"you have create only one company"
        })
    }

    const newcompany = new companySchema({companyname,companydesc,companyprofile})
    newcompany.save()
    if(newcompany){
        const user = await userSchema.findById(req.userId)
        user.Company = newcompany._id
        user.save()
        return res.status(200).json({
            message:"company created",
            data:newcompany
        })
    }
  } catch (error) {
    console.log(error)
  }
}

const getcompany = async(req,res)=>{
   try {
    const company = await companySchema.find()
    if(company){
        return res.status(200).json({
            message:"company fetched",
            data:company
        })
    }
   } catch (error) {
     console.log(error)
    
   }
}

const getusercompany = async(req,res) =>{
    const user = await userSchema.findById(req.userId)
    const company = await companySchema.findById(user.Company)
    if(company){
        return res.status(200).json({
            message:"company fetched",
            data:company
        })
    }
    else{
        return res.status(404).json({
            message:"company not found"
        })
    }
}

const getcompanybyid = async(req,res) =>{
    try {
        const company = await companySchema.findById(req.params.id)
        if(company){
            return res.status(200).json({
                message:"company fetched",
                data:company
            })
        }
    } catch (error) {
        console.log(error)
    }
}


module.exports = {createcompany,getcompany,getusercompany,getcompanybyid};
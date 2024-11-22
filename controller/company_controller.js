const Company = require('../modules/company');
const companySchema = require('../modules/company');
const userSchema = require('../modules/user');

const createcompany = async (req,res)=>{
  try {
    const {companyname,companydesc} = req.body
    const companyprofile = req.file ? req.file.path : null

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

module.exports = {createcompany,getcompany,getusercompany};
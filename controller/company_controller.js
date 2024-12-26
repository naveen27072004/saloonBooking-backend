const companySchema = require('../modules/company');
const userSchema = require('../modules/user');
const partnerSchema = require('../modules/partner')

const createcompany = async (req,res)=>{
  try {
    const {companyname,companydesc,companyadress,companyphone,companyphone2} = req.body
    const companyprofile = req.file ? req.file.path : null

    if(!companyname || !companyadress || !companyphone){
        return res.status(400).json({
            message:"please fill your company name and desc"
        })
    }

    const uniquecompanyname =  await companySchema({companyname})
    if(uniquecompanyname === companyname){
        return res.status(400).json({
            message:"company name alredy taken please try another name"
        })
    }

    // const limitcompany = await userSchema.findById(req.userId)
    // if(limitcompany.Company){
    //     return res.status(400).json({
    //         message:"you have create only one company"
    //     })
    // }

    const newcompany = new companySchema({companyname,companydesc,companyprofile,
        companyadress,companyphone,companyphone2})
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
   try {
    const user = await userSchema.findById(req.userId)
    console.log(user.Company.length)
    console.log(user.Company)
    const company = await companySchema.findById(user.Company)
    if(company){
        return res.status(200).json({
            message:"company fetched",
            data:company
        })
    }
    else{
        return res.status(201).json({
            message:"company not ound"
        })
    }
   } catch (error) {
       console.log(error)
    
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

const updatecompanydetails = async(req,res) =>{
  try {
    const {id} = req.params
    const {companyname,companydesc,companyadress,companyphone,companyphone2} = req.body
    if(!companyname,!companydesc,!companyadress,!companyphone){
        res.status(400).json({
            message:"please fill the all fields"
        })
    }
    const updatecompany = await companySchema.findByIdAndUpdate(id)
    console.log(updatecompany)
    if(!updatecompany){
        res.status(200).json({
            message:"company not found"
        })
    }
    else{
        updatecompany.companyname = companyname
        updatecompany.companydesc = companydesc
        updatecompany.companyadress = companyadress
        updatecompany.companyphone = companyphone
        updatecompany.companyphone2 = companyphone2
        updatecompany.save()
        if(updatecompany){
            return res.json({
                message:"updted",
                data:updatecompany
            })
        }
    }
  } catch (error) {
    console.log(error)
  }
}

const deletecompany = async(req,res) =>{
    try {
        const {id} = req.params
        const deletecompany = await companySchema.findByIdAndDelete(id)
        if(deletecompany){
            return res.status(200).json({
                message:"company deleted"
            })
        }
        else{
            return res.status(400).json({
                message:"company not found"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const joincompany = async(req,res)=>{
const user = await userSchema.findById(req.userId)
if(!user){
    return res.status(400).json({
        message:"user not found"
    })
}
const company = await companySchema.findById(user.Company)
const getjoinreq = await company.partnerjoinrequest
const viewpartner = await partnerSchema.findById(getjoinreq)
res.status(200).json({
    message:"company joined",
    data:viewpartner
})
}

const accpetjoinreq = async(req,res)=>{
    try {
        const {partnerId} = req.params
        if(!partnerId){
            res.status(400).json({
                message:"partner not fount"
            })
        }
        const partner = await partnerSchema.findById(partnerId)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {createcompany,getcompany,getusercompany,
    getcompanybyid,updatecompanydetails,deletecompany,joincompany,
    accpetjoinreq
};
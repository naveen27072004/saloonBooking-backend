const partnermodule = require('../modules/partner')
const companySchema = require('../modules/company');
const userSchema = require('../modules/user');


const createpartner = async(req,res)=>{
    try {
        const {partnername} = req.body
        const partnerprofile = req.file ? req.file.path : null
        const partner = new partnermodule({partnername,partnerprofile})
        partner.save()
        if(partner){
            const user = await userSchema.findById(req.userId)
            user.Partner = partner._id
            user.save()
            return res.status(200).json({
                message:"partner created",
                data:partner
            })
        }
    } catch (error) {
        console.log(error)
    }
}
const getownpartner = async(req,res)=>{
    try {
        const user = await userSchema.findById(req.userId)
        const partner = await partnermodule.findById(user.Partner)
        return res.status(200).json({
            message:"partner found",
            data:partner
        })
    } catch (error) {
        console.log(error)
    }
}

const getpartnerbyid = async(req,res)=>{
    try {
        const {partnerid} = req.params
        if(!partnerid){
            return res.status(400).json({
                message:"Not have a partnert"
            })
        }
        const partner = await partnermodule.findById(partnerid)
        if(partner){
            return res.status(200).json({
                message:"partner found",
                data:partner
            })
        }
        else{
            return res.status(201).json({
                message:"partner not found"
            })
        }
    } catch (error) {
        console.log|(error)
    }
}

const jointreqtocompany = async(req,res)=>{
    try {
        const {companyid} = req.params
        if(!companyid){
            return res.status(400).json({
                message:"Not have a company"
            })
        }
        const company = await companySchema.findById(companyid)
        const userdeails = await userSchema.findById(req.userId).select('Partner')
        const partner = await partnermodule.findById(userdeails.Partner)
        console.log(partner)
        if(company){
            company.partnerjoinrequest.push(partner)
            company.save()
            partner.requeststatus.push(company)
            return res.status(200).json({
                message:"Request sent",
                data:company
            })
        }
        else{
            return res.status(201).json({
                message:"company not found"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const checkjointreqststus = async(req,res)=>{
    try {
        const user = await userSchema.findById(req.userId)
        if(!user){
            return res.status(400).json({
                message:"Not have a user"
            })
        }
        const partner = await partnermodule.findById(user.Partner)
        if(!partner){
            return res.status(400).json({
                message:"Not have a partner"
            })
        }
        res
        

    } catch (error) {
        console.log(error)
    }
}

module.exports = {createpartner,getownpartner,getpartnerbyid,
        jointreqtocompany,checkjointreqststus}
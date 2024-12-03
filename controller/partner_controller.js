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
            const user = await userSchema.findById(req.partnerId)
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



module.exports = {createpartner}
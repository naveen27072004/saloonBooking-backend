const companySchema = require('../modules/company');
const userSchema = require('../modules/user')

const createcompany = async (req,res)=>{
    try {
        const {companyname,companydesc} = req.body
        if(!companydesc || !companyname){
            res.status(400).json({
                message:"please fill the all the fields"
            })
        }
        const uniquecompanyname = await companySchema.findOne({companyname})
        if(uniquecompanyname){
            res.status(404).json({
                message:"alredy taken this company name"
            })
        }
        const newcompany = new companySchema({companydesc,companyname})
        if(newcompany){
            const getuser = await userSchema.findById(req.userId)
            console.log("getuserr",getuser)
            getuser.Company.push(newcompany)
            await getuser.save()
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
        const getourcompany = await userSchema.findById( req.userId).populate('Company')
        console.log(getourcompany)
        if(getourcompany){
            return res.status(200).json({
                message:"company found",
                data:getourcompany.Company
            })
        }
        else{
            return res.status(404).json({
                message:"company not found"
            })
        } 

    } catch (error) {
        console.log(error)
    }
}

module.exports = {createcompany,getcompany};
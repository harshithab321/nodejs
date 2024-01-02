const express = require('express');
const router = express.Router();

const path = require('path');
const{Staff,validate}=require('../model/staff')

router.post('/staff', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingStaff = await Staff.findOne({ email: req.body.email });
        if (existingStaff) {
            return res.status(200).send("Staff with given email already exists");
        } else {
            const newStaff = new Staff({
                _id: req.body._id,
                name: req.body.name,
                email: req.body.email,
                position: req.body.position
            });

            const savedStaff = await newStaff.save();
            res.send(savedStaff);
        }
    } catch (error) {
        res.status(500).send("Failed");
        console.error(error);
    }
});



router.get('/staff/:staffId', async (req, res) => {
    try {
      const staff= await Staff.findById(req.params.staffId);
      
      if (!staff) {
        return res.status(404).send('no staff');
      }
      
      res.json(staff);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

router.get('/staff_findall',async(req,res)=>{

try{
const staff=await Staff.find()
if(!staff){
    res.status(204).send("no details")
}
else{
    res.json(staff)
}
}
catch(error){

}
})

router.put('/update/:staffId',async (req,res)=>{
    try{
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
       
         const staff=await Staff.findById(req.params.staffId)
           if(!staff){
              res.status(400).send("no staff")
           }

           staff.name=req.body.name
           staff.email=req.body.email
           staff.position=req.body.position
           const updatedStaff = await staff.save();

           // Send the updated staff details as the response
           res.status(200).send("updated")
    }
     catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    })



module.exports=router
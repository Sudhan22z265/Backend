
const asynchandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asynchandler( async (req,res) =>{
    const goal = await Goal.find()
    res.status(200).json(goal)
})
const setGoals = asynchandler( async (req,res) =>{
    if(!req.body.text)
    {
        res.status(400)
        throw new Error("Please add")
    }
    const goal =await Goal.create({
        text:req.body.text
    })
    res.status(200).json(goal)
})
const updateGoals = asynchandler( async (req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal)
    {
        res.status(400) 
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true,})
    res.status(200).json(updatedGoal)
})
const deleteGoals =asynchandler( async (req, res) => {
    try {
        const goal = await Goal.findById(req.params.id);
        console.log(goal)
        if (!goal) {
            res.status(404).json({ message: 'Goal not found' });
            return;
        }

        await goal.deleteOne();

        res.status(200).json({ message: 'Goal deleted', id: req.params.id });
    } catch (error) {
       
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
})
module.exports = {getGoals,setGoals,updateGoals,deleteGoals}
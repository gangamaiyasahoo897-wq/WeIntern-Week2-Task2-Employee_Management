require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
const app = express();
app.use(cors()); app.use(express.json()); app.use(express.static('public'));
const PORT = process.env.PORT || 5001;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/weintern_task2')
.then(() => console.log('MongoDB connected')).catch(e => console.error('MongoDB connection failed:', e.message));
const Employee = mongoose.model('Employee', new mongoose.Schema({
name:{type:String,required:true,trim:true}, department:{type:String,required:true,trim:true},
role:{type:String,required:true,trim:true}, salary:{type:Number,required:true,min:0}, joinDate:{type:Date,required:true}
},{timestamps:true}));
function validate(req,res,next){const e=validationResult(req); if(!e.isEmpty()) return res.status(400).json({message:'Please check the form fields.',errors:e.array()}); next();}
app.get('/api/health',(req,res)=>res.json({status:'ok'}));
app.get('/api/employees',async(req,res)=>{try{const {search='',sort='createdAt',order='desc'}=req.query;const filter=search?{$or:[{name:{$regex:search,$options:'i'}},{department:{$regex:search,$options:'i'}},{role:{$regex:search,$options:'i'}}]}:{};const allowed=['name','department','role','salary','joinDate','createdAt'];res.json(await Employee.find(filter).sort({[allowed.includes(sort)?sort:'createdAt']:order==='asc'?1:-1}));}catch(e){res.status(500).json({message:'Could not load employees.'});}});
const fields=[body('name').trim().isLength({min:2,max:80}),body('department').trim().notEmpty(),body('role').trim().notEmpty(),body('salary').isFloat({min:0}),body('joinDate').isISO8601()];
app.post('/api/employees',fields,validate,async(req,res)=>{try{res.status(201).json(await Employee.create({name:req.body.name,department:req.body.department,role:req.body.role,salary:Number(req.body.salary),joinDate:req.body.joinDate}));}catch(e){res.status(400).json({message:'Could not create employee. Check all fields.'});}});
app.put('/api/employees/:id',fields,validate,async(req,res)=>{try{const row=await Employee.findByIdAndUpdate(req.params.id,{name:req.body.name,department:req.body.department,role:req.body.role,salary:Number(req.body.salary),joinDate:req.body.joinDate},{new:true,runValidators:true});if(!row)return res.status(404).json({message:'Employee not found.'});res.json(row);}catch(e){res.status(400).json({message:'Invalid employee ID or details.'});}});
app.delete('/api/employees/:id',async(req,res)=>{try{const row=await Employee.findByIdAndDelete(req.params.id);if(!row)return res.status(404).json({message:'Employee not found.'});res.json({message:'Employee deleted.'});}catch(e){res.status(400).json({message:'Invalid employee ID.'});}});
app.listen(PORT,()=>console.log(`HR Server running on port ${PORT}`));

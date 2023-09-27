import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors(
    {
        origin:process.env.URI,
        credentials: true,
        optionsSuccessStatus: 200,
        allowedHeaders:['Origin','X-Api-Key','X-Requested-With','Content-Type','Accept','Authorization'],
    }
));

import createGraph from "./schedulinFunction/createGraph.js";
import createDate from './schedulinFunction/createDate.js'
import {graphColoring,Result} from './schedulinFunction/schedulingSolution.js'

app.get('/',async(req,res)=>res.send('Home'))

app.post('/api/get_Graph',async(req,res)=>{

    const {data} = req.body;

    const Graph =await Promise((resolve,reject)=>{
    
        const Data = createGraph(data)
    
        if(Data){
            resolve(Data);
        }else{
            reject(new Error("Failed to create Graph"))
        }

    })

    res.status(200).send(Graph)

})

app.post('/api/get_solution',async(req,res)=>{

    const {data:{start,end,TimeSlots,Graph,conflictingSlots}} = req.body;

    const dateRange = await new Promise((resolve,reject)=>{
        const data = createDate(start,end);
        if(data){
            resolve(data);
        }else{
            reject(new Error("Failed to create the Date"))
        }

    })

    const {assignedColor , assignedSlots} = await new Promise((resolve,reject)=>{
         
        const data = graphColoring(Graph,dateRange,TimeSlots,conflictingSlots);
        
        if(data){
            resolve(data)
        }else{
            reject(new Error("Failed to solve problem"))
        }
    
    })
    

    const solution = await Promise(()=>{
    
        const data = Result(assignedColor,assignedSlots)
    
        if(data){
            resolve(data)
        }else{
            reject(new Error("Failed to solve problem"))
        }

    })

    res.status(200).send(solution)

})

app.listen(8000,(error)=>{
    if(error) console.log(error);
    console.log(`server started at ${'http://localhost:8000'}`);
})
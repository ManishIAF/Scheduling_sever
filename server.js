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
        origin:[process.env.URI]
    }
))

import createGraph from "./schedulinFunction/createGraph.js";
import createDate from './schedulinFunction/createDate.js'
import {graphColoring,Result} from './schedulinFunction/schedulingSolution.js'

app.get('/',async(req,res)=>res.send('Home'))

app.post('/api/get_Graph',async(req,res)=>{

    const {data} = req.body;

    const Graph = createGraph(data)

    res.status(200).send(Graph)

})

app.post('/api/get_solution',async(req,res)=>{

    const {data:{start,end,TimeSlots,Graph,conflictingSlots}} = req.body;

    const dateRange = await createDate(start,end)

    const {assignedColor , assignedSlots} = await graphColoring(Graph,dateRange,TimeSlots,conflictingSlots)

    const solution = await Result(assignedColor,assignedSlots)

    res.status(200).send(solution)

})

app.listen(8000,(error)=>{
    if(error) console.log(error);
    console.log(`server started at ${'http://localhost:8000'}`);
})
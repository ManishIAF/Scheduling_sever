import express from "express";
import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
console.log('process.env.URI : ',process.env.URI);
app.use(bodyParser.json())
app.use(cors(
    {
        "Access-Control-Allow-Origin":"https://scheduling-lfjs.onrender.com",
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
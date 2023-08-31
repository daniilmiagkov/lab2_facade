// const express = require('express')
// const path = require('path')
// const {v4} = require('uuid')
// const app = express()
import express from 'express'
import path from 'path'
import {v4} from "uuid";
import { fileURLToPath } from 'url';
import {TVRemoteControl_Ordinary} from "./main/dist/TVRemoteControl_Ordinary.js";
import {TVRemoteControl_LGSmartTV} from "./main/dist/TVRemoteControl_LGSmartTV.js";
import {TV_LG} from "./main/dist/TV.js";

const app = express()

//создание объектов пультов
const tv = new TV_LG();
const controlOrdinary = new TVRemoteControl_Ordinary(tv);
const controlSmart = new TVRemoteControl_LGSmartTV(tv);

app.use(express.json())
// GET
app.get('/api/volume', (req, res) => {
  setTimeout(() => {
    res.status(200).json({})
  }, 1000)
})

// POST
app.post('/api/smart/power', (req, res) => {
  res.status(201).json(controlSmart.changePower(req.body));
})
// POST
app.post('/api/ordinary/power', (req, res) => {
  res.status(201).json(controlOrdinary.changePower(req.body));
})
// POST
app.post('/api/smart/volume', (req, res) => {
  res.status(201).json(controlSmart.changeVolume(req.body));
})
// POST
app.post('/api/ordinary/volume', (req, res) => {
  res.status(201).json(controlOrdinary.changeVolume(req.body));
})
// POST
app.post('/api/smart/channel', (req, res) => {
  res.status(201).json(controlSmart.changeChannel(req.body));
})
// POST
app.post('/api/ordinary/channel', (req, res) => {
  res.status(201).json(controlOrdinary.changeChannel(req.body));
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started on port 3000... http://localhost:3000/'))
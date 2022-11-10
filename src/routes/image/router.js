const { Router } = require('express');
const {
    deletePicture,
    presignedPostURL
} = require('../../contollers/image/controller');


const imageRouter = Router();

imageRouter.get('/', (req, res)=>{
    res.json({
        msg: 'en el get'
    })
});

imageRouter.post('/', (req, res)=>{
    try {
        
        const par = req.params
        const bd = req.body
        const hd = req.headers
        const ip = req.ip
        const ur = req.url
        const hn = req.hostname
        
        res.json(
            {
                'msg': 'en el post',
                'payload': [
                    par, bd, hd, ip, ur, hn
                ],
            }
        )
    } catch (error) {
        console.error('error en ruta');
    }
});

imageRouter.post('/upload', async (req, res)=>{
    try {
        const response = await presignedPostURL();
        res.json(
            response
        )
    } catch (error) {
        console.error(error);
    }
});

imageRouter.post('/delete', async (req, res)=>{
    try {
        const data = await deletePicture(
            {
                id
            }
        )
        res.json(
            data
        )
    } catch (error) {
        console.error(error);
    }
});

module.exports = {
    imageRouter
}
const { Router } = require('express');
const { deletePicture, presignedPostURL } = require('../contollers/PictureController');
const { 
    newProfile, 
    updateProfile, 
    deleteProfile, 
    loadProfiles 
} = require('../contollers/ProfileController');

const router = Router()

router.get('/', (req, res)=>{
    res.json({
        msg: 'en el get'
    })
});

router.post('/', (req, res)=>{
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

router.post('/loadProfiles', async (req, res)=>{
    try {
        const data = await loadProfiles()
        res.json({data})
    } catch (error) {
        console.error(error);
    }
});

router.post('/newProfile', async (req, res)=>{
    try {
        const {name,day,month,slackId} = req.body;
        const rpta = await newProfile( { name,day,month,slackId } )
        res.json(rpta)
    } catch (error) {
        console.error('===en ruta===');
        console.error(error);
    }

});

router.post('/updateProfile', async (req, res)=>{
    try {
        const {id,name,day,month,slackId} = req.body;
        const rpta = await updateProfile( { id,name,day,month,slackId } )
        res.json({rpta})
    } catch (error) {
        console.error(error);
    }

});

router.post('/deleteProfile', async (req, res)=>{
    try {
        const {id} = req.body;
        const rpta = await deleteProfile( { id } )
        res.json({rpta})
    } catch (error) {
        console.error(error);
    }

});

router.post('/getPostURL', async (req, res)=>{
    try {
        const {id} = req.body;
        const {url, fields} = await presignedPostURL( {id} );
        res.status(200).json({url, fields})
    } catch (error) {
        console.error(error);
    }
});

router.post('/deletePicture', async (req, res)=>{
    try {
        const {id} = req.body;
        const response = await deletePicture({id})
        res.status(200).json({msg: 'ok'})
    } catch (error) {
        
    }

});

module.exports = { 
    router
}
const {Router} = require('express');
const {
    create_,
    read_,
    update_,
    delete_,
} = require('../../contollers/event/controller');


const eventRouter = Router();

eventRouter.get('/', (req, res)=>{
    res.json({
        msg: 'en el get'
    });
});

eventRouter.post('/', (req, res)=>{
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
                    par, 
                    bd, 
                    hd, 
                    ip, 
                    ur, 
                    hn
                ],
            }
        )
    } catch (error) {
        console.error('error en ruta');
    }
});

eventRouter.post('/create', async(req, res)=>{
    try {
         const { name, day, month, year, texts } = req.body;
         const response = await create_({
            name,
            day,
            month,
            year,
            texts,
         })
         return res.status(200).json(
            response
         )
    } catch (error) {
        console.error(error);
    }
})

eventRouter.post('/load', async(req, res)=>{
    try {
         const response = await read_();
         return res.status(200).json(
            response
         )
    } catch (error) {
        console.error(error);
    }
})

eventRouter.post('/update', async(req, res)=>{
    try {
         const { id, name, day, month, year, texts } = req.body;
         const response = await update_({
            id,
            name,
            day,
            month,
            year,
            texts
         })
         return res.status(200).json(
            response
        )
    } catch (error) {
        console.error(error);
    }
})

eventRouter.post('/delete', async(req, res)=>{
    try {
         const { id } = req.body;
         const response = await delete_({
            id
        })
        return res.status(200).json(
            response
        )
    } catch (error) {
        console.error(error);
    }
})



module.exports = { 
    eventRouter
}
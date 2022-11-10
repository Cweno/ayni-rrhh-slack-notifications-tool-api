const {
    triggerLambda
} = require('../../aws/lambda');

const birthdayTrigger = async (params)=>{
    try {
        const {id} = params;
        const type = 'birthday'
        const res = await triggerLambda(
            {
                id,
                type
            }
        );
        return {
            id,
            lambda: res
        }
    } catch (error) {
        console.error(error);
    }
}

const eventTrigger = async (params)=>{
    try {
        const {id} = params;
        const type = 'event'
        const res = await triggerLambda(
            {
                id,
                type
            }
        );
        return {
            id,
            lambda: res
        }
    } catch (error) {
        console.error(error);
    }
}

const announceTrigger = async (params)=>{
    try {
        const {id} = params;
        const type = 'announcement'
        const res = await triggerLambda(
            {
                id,
                type
            }
        );
        return {
            id,
            lambda: res
        }
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    birthdayTrigger,
    eventTrigger,
    announceTrigger
}
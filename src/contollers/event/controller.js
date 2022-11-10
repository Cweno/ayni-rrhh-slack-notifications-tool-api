const {
    loadItems,
    insertItem,
    updateItem,
    deleteItem
} = require('../../aws/dynamo');

// const tableName = 'aynitech_events';
const tableName = process.env.EVENTS_TABLE;

const create_ = async (params) => {
    try {
        const { name, day, month, year, texts } = params;
        const res = await insertItem(
            tableName,
            {
                name,
                day,
                month,
                year,
                texts,
            }
        )
        return res;
    }catch (error) {
        console.error(error);
    }
}

const read_ = async() =>{
    try{
        const res = await loadItems(tableName);
        return res;
    } catch (error) {
        console.error(error);
    }
}

const update_ = async(params)=>{
    try{
        const { id, name, day, month, year, texts } = params;
        const res = await updateItem(
            tableName,
            {
                shortNames: [ ':n', ':d', ':m', ':y', ':t' ],
                params: [ 'name', 'day', 'month', 'year', 'texts' ],
                data: {
                    name, 
                    day,
                    month,
                    year,
                    texts,
                },
                id
            }
        );
        return res;
    } catch (error) {
        console.error(error);
    }
}

const delete_ = async(params)=>{
    try {
        const {id} = params;
        const res = await deleteItem(
            tableName,
            {
                id
            }
        )
        return res
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    create_,
    read_,
    update_,
    delete_
}
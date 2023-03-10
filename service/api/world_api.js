const World = require("../models/worlds");

const read = async (params) => {
    try {
        const response = await World.findOne(params);
        if(response) return response
        if(!response) return false
    }
    catch (err) {
        if(err){
            console.error(err)
            return false
        }
    }
}

const readAll = async () => {
    try {
        const response = await World.find();
        if(response) return response
        if(!response) return false
    }
    catch (err) {
        if(err){
            console.error(err)
            return false
        }
    }
}

const create = async (new_record) => {worlds.js
    try {
        const World = new World(new_record);
        const response = await World.save();
        if(response) return true
        if(!response) return false
    }
    catch (err) {
        if(err){
            console.error(err)
            return false
        }
    }

}

const update = async (record, updated_field) => {
    try {
        const response = await World.updateOne(record, updated_field)
        if(response) return true
        if(!response) return false
    }
    catch (err) {
        if(err){
            console.error(err)
            return false
        }
    }

}

module.exports = {
    world_api: read,readAll,create,update
}
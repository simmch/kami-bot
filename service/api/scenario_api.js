const Scenario = require("../models/scenarios")

const read = async (params) => {
    try {
        const response = await Scenario.findOne(params);
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
        const response = await Scenario.find();
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

const create = async (new_record) => {
    try {
        const Scenario = new Scenario(new_record);
        const response = await Scenario.save();
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
        const response = await Scenario.updateOne(record, updated_field)
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
    scenario_api: read,readAll,create,update
}
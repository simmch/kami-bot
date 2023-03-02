const Zone = require('../service/models/zones');

async function getZoneData(zones) {
    try {
      const zoneData = await Zone.find({ TITLE: { $in: zones } })
      const result = zoneData.map(zone => `${zone.TITLE}).join(', ')}`).join('\n');
      return result || "No zone data found";
    } catch (err) {
      console.error(err);
      return 'Error retrieving zone data';
    }
  }

module.exports = {
    getZoneData
}
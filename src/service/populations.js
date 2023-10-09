const { getDataFromCsv, writeDataToCsv } = require("../data/read-csv")

const getPopulationByCityAndState = async (state, city) => {
    const allData = await getDataFromCsv();
    return allData.find((data) => data.state === state && data.city === city)
}

const upsertPapulation = async (city, state, population) => {
    return await writeDataToCsv(city, state, population)
}

module.exports = {
    getPopulationByCityAndState,
    upsertPapulation
}
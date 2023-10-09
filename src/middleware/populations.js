const handleParams = (req, res, next) => {
    req.city = req.params.city.toLowerCase();
    req.state = req.params.state.toLowerCase();
    next()
}

const handlePopulationValue = (req, res, next) => {
    if (/^\d+$/.test(req.body)) {
        req.population = parseInt(req.body);
    } else {
        return res.status(400).json({ error: 'Invalid population value' });
    }
    next();
}

module.exports = {
    handleParams,
    handlePopulationValue
}
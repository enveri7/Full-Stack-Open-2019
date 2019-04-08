const errorHandler = (error, request, response, next) => {
    console.log("_________________________!!!!!!!!")
    console.log(error)
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).send({
            error: 'malformatted id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({
            error: error.message
        })
    } else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    } 
    // duplicate entry
    else if (error.name === 'MongoError' && error.code == 11000) {
        return response.status(409).send({ error: error.message })
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    unknownEndpoint,
    errorHandler
}
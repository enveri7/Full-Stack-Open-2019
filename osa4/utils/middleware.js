const errorHandler = (error, request, response, next) => {

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

const ValidationError = (error, request, response, next) => {
    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

const duplicateEntry = (error, request, response, next) => {

    if (error.name === 'MongoError' && error.code == 11000) {
        return response.status(409).send({ error: error.message })
    }
    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    ValidationError,
    unknownEndpoint,
    duplicateEntry,
    errorHandler
}
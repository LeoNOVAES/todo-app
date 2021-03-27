const PublicError = require('../errors/PublicError')

const MODELS_NOTFOUND = (result) => {
    if(Array.isArray(result) && result[1].length < 1) {
        throw new PublicError(404, 'Nenhum registro encontrado', "NotFoundError");
    }
    
    if(!result) {
        throw new PublicError(404, 'Nenhum registro encontrado', "NotFoundError"); 
    }

    return result;
}

module.exports = {
    MODELS_NOTFOUND
}

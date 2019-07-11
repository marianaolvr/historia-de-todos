const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const ReclamacoesSchema = new Schema({
_id: { type: mongoose.Schema.Types.ObjectId, auto: true},
nome: {type: String, required: true},
email: {type: String, required: true},
instituicao: {type: String, required: true}
})
const reclamacoesModel = mongoose.model("reclamacoes", ReclamacoesSchema); // é a minha coleção de reclamações

module.exports = reclamacoesModel;
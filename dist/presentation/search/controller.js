"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchController = void 0;
const custom_errors_1 = require("../../domain/errors/custom.errors");
const get_all_1 = require("../../domain/use-cases/search/get-all");
const get_by_id_1 = require("../../domain/use-cases/search/get-by-id");
class SearchController {
    constructor(restauranteRepository) {
        this.restauranteRepository = restauranteRepository;
        this.handleError = (error, res) => {
            if (error instanceof custom_errors_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        };
        this.getAll = (req, res) => {
            new get_all_1.SearchAll(this.restauranteRepository).execute()
                .then(restaurantes => res.json({ restaurantes }).status(200))
                .catch(error => this.handleError(error, res));
        };
        this.getRestauranteById = (req, res) => {
            new get_by_id_1.SearchById(this.restauranteRepository).execute(req.params.id)
                .then(restaurante => res.json({ restaurante }).status(200))
                .catch(error => this.handleError(error, res));
        };
    }
    ;
}
exports.SearchController = SearchController;

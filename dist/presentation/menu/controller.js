"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuController = void 0;
const create_plate_dto_1 = require("../../domain/dtos/menu/create-plate.dto");
const custom_errors_1 = require("../../domain/errors/custom.errors");
const add_plate_1 = require("../../domain/use-cases/menu/add-plate");
const delete_plate_1 = require("../../domain/use-cases/menu/delete-plate");
const restaurant_dto_1 = require("../../domain/dtos/auth/restaurant.dto");
const get_types_1 = require("../../domain/use-cases/menu/get-types");
const get_plates_1 = require("../../domain/dtos/menu/get-plates");
const get_plates_2 = require("../../domain/use-cases/menu/get-plates");
class MenuController {
    constructor(restauranteRepository) {
        this.restauranteRepository = restauranteRepository;
        this.handleError = (error, res) => {
            if (error instanceof custom_errors_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal server error' });
        };
        this.addPlate = (req, res) => {
            const [error, dto] = create_plate_dto_1.CrearPlatoDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new add_plate_1.addPlate(this.restauranteRepository).execute(dto)
                .then(plato => res.json({ plato, msg: 'Plato creado con exito!!' }))
                .catch(error => this.handleError(error, res));
        };
        this.deletePlate = (req, res) => {
            const { name_plate, restaurante } = req.body;
            new delete_plate_1.deletePlate(this.restauranteRepository).execute(name_plate, restaurante)
                .then(plato => res.json({ plato, msg: 'Plato eliminado con exito!!' }))
                .catch(error => this.handleError(error, res));
        };
        this.getTypes = (req, res) => {
            const [error, dto] = restaurant_dto_1.RestauranteDto.create(req.params.id);
            if (error)
                return res.status(400).json({ error });
            new get_types_1.getTypes(this.restauranteRepository).execute(dto)
                .then(tipos => res.json({ tipos, msg: 'Estos son los  tipos de comida en el menu del restaurante!!' }))
                .catch(error => this.handleError(error, res));
        };
        this.getPlates = (req, res) => {
            const [error, dto] = get_plates_1.GetPlatesDto.create(req.params.id, req.params.type);
            if (error)
                return res.status(400).json({ error });
            new get_plates_2.getPlates(this.restauranteRepository).execute(dto)
                .then(platos => res.json({ platos, msg: `Estos son los platos pertenecientes a ${dto === null || dto === void 0 ? void 0 : dto.type} !!` }))
                .catch(error => this.handleError(error, res));
        };
    }
    ;
}
exports.MenuController = MenuController;

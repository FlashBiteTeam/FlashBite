import { Response, Request } from "express"
import { Restaurante } from "../../data/mysql/models/restaurante.models";
import { Usuario } from "../../data";
export class ProfileController{


    editRestaurantInfo = async (req: Request, res: Response) => {
        const { email } = req.body; 
        const updatedInfo = req.body; 
    
        try {
            const [updatedRowsCount] = await Restaurante.update(updatedInfo, {
                where: {
                    email: email
                }
            });
    
            if (updatedRowsCount > 0) {
                return res.json({ message: 'Información del restaurante actualizada correctamente' });
            } else {
                return res.status(404).json({ error: 'Restaurante no encontrado' });
            }
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
    editUserInfo = async (req: Request, res: Response) => {
        const { email } = req.body; 
        const updatedInfo = req.body; 
    
        try {
            const [updatedRowsCount] = await Usuario.update(updatedInfo, {
                where: {
                    email: email
                }
            });
    
            if (updatedRowsCount > 0) {
                return res.json({ message: 'Información del Usuario actualizada correctamente' });
            } else {
                return res.status(404).json({ error: 'Restaurante no encontrado' });
            }
        } catch (error) {
            console.error(error); 
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

}
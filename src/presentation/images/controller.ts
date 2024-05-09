import  { Request, Response } from "express"
import {BlobServiceClient} from "@azure/storage-blob"
import { envs } from "../../config/envs"

const blobService = BlobServiceClient.fromConnectionString(envs.AZURE_STORAGE_CONNECTION_STRING);

export class ImageController{


    restauranteImg = async (req:Request, res:Response)=>{
        try {
          const {email} = req.body;
          const {buffer} = req.file!;
          const containerClient = blobService.getContainerClient('restaurantes');

          await containerClient.getBlockBlobClient(`${email}.jpg`).uploadData(buffer)
          res.json({message: "Success"})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    usuariosImg = async (req:Request, res:Response)=>{
        try {
          const {email} = req.body;
          console.log(req.file)
          const {buffer} = req.file!;
          const containerClient = blobService.getContainerClient('usuarios');

          await containerClient.getBlockBlobClient(`${email}.jpg`).uploadData(buffer)
          res.json({message: "Success"})
        } catch (error) {
            res.status(500).json(error)
        }
    }
    getBlobRestaurantes = async (req:Request, res:Response)=>{
        try {
          const {email} = req.params;
          console.log(email)
          const containerClient = blobService.getContainerClient('restaurantes');

          res.header("Content-Type","image/jpg")
          const response = await containerClient.getBlockBlobClient(`${email}.jpg`).downloadToBuffer()
          res.send(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    getBlobUsuarios = async (req:Request, res:Response)=>{
        try {
          const {email} = req.params;
          
          const containerClient = blobService.getContainerClient('usuarios');

          res.header("Content-Type","image/jpg")
          const response = await containerClient.getBlockBlobClient(`${email}.jpg`).downloadToBuffer()
          res.send(response)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}
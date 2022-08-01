import { Request, Response } from "express";
import * as deleteRepository from "./../repositories/deleteRepository.js"



export async function deleteAllController(req: Request, res: Response) {

    await deleteRepository.deleteAll();

    res.sendStatus(200);
}

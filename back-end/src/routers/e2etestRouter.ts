import { Router } from "express";
import { deleteAllController } from "../controllers/deleteAllController.js";


const e2eTestRouter = Router()

e2eTestRouter.delete("/deleteAll", deleteAllController)

export default e2eTestRouter;
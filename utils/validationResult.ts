import { validationResult } from "express-validator";
import { Request, Response } from "express";

export default function validRequest(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            errors: errors.array()
        });
        return;
    }
}
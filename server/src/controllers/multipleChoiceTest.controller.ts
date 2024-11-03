import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { multipleChoiceTestRepository } from "../repositories/multipleChoiceTest.repository";

class MultipleChoiceTestController {
  async getAll(_req: Request, res: Response) {
    const data = await multipleChoiceTestRepository.getAll();
    res.json({ data });
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const data = await multipleChoiceTestRepository.getOne({ id });

    res.json({
      ok: true,
      data,
    });
  }

  async create(req: Request, res: Response) {
    const data = req.body;
    const results = await multipleChoiceTestRepository.create(data);

    res.status(StatusCodes.CREATED).json({
      message: "Multiple choice test created succesfully",
      results,
    });
  }
}

export const multipleChoiceTestController = new MultipleChoiceTestController();

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { multipleChoiceTestRepository } from '../repositories/multipleChoiceTest.repository';
import { multipleChoiceTestService } from '../services/multipleChoiceTest.service';

class MultipleChoiceTestController {
  async getAll(_req: Request, res: Response) {
    const data = await multipleChoiceTestService.getAll();
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
      message: 'Multiple choice test created succesfully',
      results,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await multipleChoiceTestRepository.deleteById({ id });

    res.status(StatusCodes.NO_CONTENT).json({
      message: 'Multiple choice test deleted succesfully',
    });
  }
}

export const multipleChoiceTestController = new MultipleChoiceTestController();

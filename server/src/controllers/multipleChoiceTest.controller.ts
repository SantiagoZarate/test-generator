import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { multipleChoiceTestRepository } from '../repositories/multipleChoiceTest.repository';
import { multipleChoiceTestService } from '../services/multipleChoiceTest.service';
import { AuthRequest } from '../types/authRequest';
import { getPaginatedParams } from '../utils/getPaginatedParams';

class MultipleChoiceTestController {
  async getAll(req: Request, res: Response) {
    const pagination = getPaginatedParams(req.query);

    const { testsWithMoreInfo, totalPages, totalTests } =
      await multipleChoiceTestService.getAll(pagination);

    res.json({
      data: testsWithMoreInfo,
      info: {
        currentPage: pagination.page,
        totalPages,
        totalTests,
      },
    });
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const data = await multipleChoiceTestRepository.getOne({ id });

    res.json({
      ok: true,
      data,
    });
  }

  async getOneWithInfo(req: Request, res: Response) {
    const { id } = req.params;
    const data = await multipleChoiceTestService.getOneWithInfo({ id });

    res.json({
      ok: true,
      data,
    });
  }

  async create(req: AuthRequest, res: Response) {
    const data = req.body;

    const results = await multipleChoiceTestRepository.create({
      ...data,
      user_id: req.user?.id,
    });

    res.status(StatusCodes.CREATED).json({
      message: 'Multiple choice test created succesfully',
      results,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await multipleChoiceTestRepository.deleteById({ id });

    res.status(StatusCodes.NO_CONTENT);
  }
}

export const multipleChoiceTestController = new MultipleChoiceTestController();

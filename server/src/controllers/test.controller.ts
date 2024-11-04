import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { testService } from '../services/test.service';
import { getPaginatedParams } from '../utils/getPaginatedParams';

export const testController = {
  async getAll(req: Request, res: Response) {
    const pagination = getPaginatedParams(req.query);

    const { tests, totalPages, totalTests } =
      await testService.getAll(pagination);

    res.json({
      ok: true,
      data: tests,
      info: {
        currentPage: pagination.page,
        totalPages,
        totalTests,
      },
    });
  },
  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);

    const result = await testService.getOne({ id });
    return res.json({
      ok: true,
      data: result,
    });
  },
  async create(req: Request, res: Response) {
    const data = req.body;
    const result = await testService.create(data);

    return res.status(StatusCodes.CREATED).json({
      ok: true,
      data: result,
    });
  },
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    await testService.delete({ id });

    res.status(StatusCodes.NO_CONTENT).json({
      message: 'Test deleted succesfully',
    });
  },
};

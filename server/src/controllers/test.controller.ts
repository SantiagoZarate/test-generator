import { Request, Response } from "express";
import { testService } from "../services/test.service";

export const testController = {
  async getAll(_req: Request, res: Response) {
    const data = await testService.getAll();

    res.json({
      ok: true,
      data,
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

    return res.json({
      ok: true,
      data: result,
    });
  },
};

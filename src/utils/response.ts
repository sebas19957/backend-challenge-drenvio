import { Response } from "express";

export class ResponseHandler {
  /**
   * Send a success response
   */
  static success(res: Response, data: any, message: string = "Success") {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Send a created response
   */
  static created(
    res: Response,
    data: any,
    message: string = "Created successfully"
  ) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Send a bad request response
   */
  static badRequest(res: Response, message: string = "Bad request") {
    return res.status(400).json({
      success: false,
      message,
      data: null,
    });
  }

  /**
   * Send a not found response
   */
  static notFound(res: Response, message: string = "Resource not found") {
    return res.status(404).json({
      success: false,
      message,
      data: null,
    });
  }

  /**
   * Send a server error response
   */
  static serverError(res: Response, message: string = "Internal server error") {
    return res.status(500).json({
      success: false,
      message,
      data: null,
    });
  }
}

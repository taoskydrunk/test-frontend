import axios from "axios";
import { Blob } from "buffer";

export interface Method {
  GetComments(): Promise<ResponseHandler>;
  InsertComment(text: string, user: string): Promise<ResponseHandler>;
}

type Headers = {
  [key: string]: string;
};

type ResponseStatusType = "OK" | "ERROR" | "VALIDATE";

export const ResponseOK: ResponseStatusType = "OK";
export const ResponseErr: ResponseStatusType = "ERROR";
export const ResponseValidate: ResponseStatusType = "VALIDATE";

type ResponseHandler = {
  status: ResponseStatusType;
  data?: any;
  error?: any;
  limit?: string;
  offset?: number;
  total?: number;
};

export class HttpRequest implements Method {
  url: string;
  constructor() {
    this.url = "http://127.0.0.1:2727/v1/comments";
  }

  async GetComments(): Promise<ResponseHandler> {
    try {
      const { data, status } = await axios.get<ResponseHandler>(this.url + ``, {
        headers: this.getHeaders(),
      });

      if (status != 200) {
        var result: ResponseHandler = {
          status: ResponseErr,
          error: "Can't get comments",
        };
      }

      var result: ResponseHandler = {
        status: ResponseOK,
        data: data.data,
      };

      return result;
    } catch (error) {
      var result: ResponseHandler = {
        status: ResponseErr,
        error: error,
      };
      return result;
    }
  }

  async InsertComment(text: string, user: string): Promise<ResponseHandler> {
    try {
      const { status } = await axios.post<ResponseHandler>(
        this.url + ``,
        {
          text: text,
          created_by: user,
        },
        {
          headers: this.getHeaders(),
        }
      );

      if (status != 201) {
        var result: ResponseHandler = {
          status: ResponseErr,
          error: "Can't Insert Comment",
        };
      }

      var result: ResponseHandler = {
        status: ResponseOK,
      };

      return result;
    } catch (error) {
      var result: ResponseHandler = {
        status: ResponseErr,
        error: error,
      };
      return result;
    }
  }

  getHeaders(headers?: Headers): Headers {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
}

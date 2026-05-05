import z from "zod";
import { BACKEND_URL, type methodEnum, type methodEnumSchema, type pathSchema } from "./apiSchema";

export class FetchOptions<T extends z.ZodObject, R extends z.ZodObject>
{
  protected backendUrl: string = BACKEND_URL;
  protected body?: z.infer<T>;
  headers?: Record<string, string>;
  params?: string;

  constructor ( private method: methodEnum, private path: z.infer<typeof pathSchema> ) { }

  public addHeaders ( headers: Record<string, string> )
  {
    this.headers = { ...this.headers, ...headers }
    return this;
  }

  public setBody ( body: z.infer<T> )
  {
    this.body = body;
    return this;
  }

}


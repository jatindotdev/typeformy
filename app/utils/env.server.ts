import { object, parse, string } from "valibot";

const EnvSchema = object({});

export const env = parse(EnvSchema, process.env);

import { z } from "zod";
import user from "../validators/user";

export type UserData = z.infer<typeof user.userData>
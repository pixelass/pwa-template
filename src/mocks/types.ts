import { User } from "next-auth";
import { Except } from "type-fest";

export type UserType = Except<User, "id">;

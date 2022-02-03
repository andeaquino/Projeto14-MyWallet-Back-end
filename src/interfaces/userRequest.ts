import { Request } from "express";

interface UserInfoRequest extends Request {
    userId: number;
}

export default UserInfoRequest;
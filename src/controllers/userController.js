import * as userService from "../services/userService.js";
import { signUpSchema, signInSchema } from "../schemas/usersSchemas.js";

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (signUpSchema.validate({ name, email, password }).error) {
      return res.sendStatus(403);
    }

    const user = await userService.registerUser(name, email, password);

    if (!user) {
      return res.sendStatus(409);
    }

    return res.sendStatus(201);
  } catch (err) {
    return res.sendStatus(500);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (signInSchema.validate({ email, password }).error) {
      return res.sendStatus(403);
    }

    const user = await userService.authenticate(email, password);

    if (user) {
      return res.send({
        token: user.token,
        name: user.name,
      });
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
};

export { signUp, signIn };

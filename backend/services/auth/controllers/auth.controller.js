import crypto from "crypto";
import admin from "../config/firebase.js";
import User from "../model/user.model.js";
import redis from "../../../shared/redis/redis.js";

export const login = async (req, resp) => {
  try {
    const { token } = req.body;
    if (!token) {
      return resp.status(400).json({ message: "Token is required" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    let user = await User.findOne({
      firebaseUid: decoded.uid,
    });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.picture,
      });
    }

    const sessionId = crypto.randomUUID();

    await redis.set(
      `session-${sessionId}`,
      JSON.stringify({
        userID: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      }),
      "EX",
      7 * 24 * 60 * 60
    );

    resp.cookie("session", sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return resp.status(200).json(user);
  } catch (error) {
    return resp.status(500).json({ message: `Login error: ${error.message || error}` });
  }
};

export const logout = async (req, resp) => {
  try {
    const sessionId = req.cookies?.session;
    await redis.del(`session-${sessionId}`);

    resp.clearCookie("session");
    return resp.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return resp.status(500).json({ message: `${error.message || error}` });
  }
};


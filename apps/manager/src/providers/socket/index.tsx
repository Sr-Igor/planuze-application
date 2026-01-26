"use client";

//React && Hooks
import { useEffect } from "react";

import io from "socket.io-client";

import { getToken } from "@repo/cookies";
import { useAppDispatch, useAppSelector } from "@repo/redux/hooks";
import { update as updateAdmin } from "@repo/redux/store/modules/admin/actions";
import { update as updateSocket } from "@repo/redux/store/modules/socket/actions";
import { fingerprint } from "@repo/utils/fingerprint";

//Global
const URL = process.env.NEXT_PUBLIC_API_URL;

export const socket = io(URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 500,
});

export const Provider = () => {
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.admin);
  const token = getToken();

  useEffect(() => {
    actions();

    return clear;
  }, [admin, token]);

  const actions = async () => {
    if (!admin) return;
    socket.auth = { ...socket.auth, token };
    socket.connect();

    socket.on("connect", async () => {
      dispatch(updateSocket({ connected: true, loading: false }));
      socket.emit("client");
    });

    socket.on("disconnect", () => {
      dispatch(updateSocket({ connected: false, loading: false }));
    });

    socket.on("server", () => {});

    //Emits
    socket.on("admin_hidrate", async (data, device_id) => {
      if (device_id) {
        const currentDeviceId = await fingerprint();
        if (currentDeviceId !== device_id) return;
      }

      dispatch(updateAdmin(data));
    });
  };

  const clear = () => {
    socket.removeAllListeners();
    socket.disconnect();
  };

  return null;
};

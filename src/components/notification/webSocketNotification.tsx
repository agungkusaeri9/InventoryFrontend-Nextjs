'use client';

import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function WebSocketNotification() {
    useEffect(() => {
        // const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        // const host = window.location.host;
        // const wsUrl = `${protocol}//${host}`;
        const wsUrl = process.env.NEXT_PUBLIC_SOCKET_BASE_URL || "";

        // console.log('Connecting to WebSocket at:', wsUrl);

        const socket = new WebSocket(wsUrl);

        socket.onmessage = (event) => {
            toast.custom(
                (t) => (
                    <div
                        className={`${t.visible ? 'animate-enter' : ''} max-w-md w-full bg-red-50 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-red-200`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-semibold text-red-800">Reminder!</p>
                                    <p className="mt-1 text-sm text-red-700">{event.data}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-red-200">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-700 hover:text-red-600"
                            >
                                X
                            </button>
                        </div>
                    </div>
                ),
                {
                    duration: Infinity,
                    position: 'bottom-right',
                    style: { zIndex: 9999 },
                }
            );
        };

        return () => socket.close();
    }, []);

    return null;
}

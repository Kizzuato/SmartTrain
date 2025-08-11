import React, { useState } from "react";

export default function LiveCamPreview({
  url = "http://192.168.18.16:4747/video",
  autoPlay = true,
  controls = true,
}) {
  const [connected, setConnected] = useState(true);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-800 overflow-hidden">
        {/* Video area */}
        <div className="p-4">
          <div
            className="bg-black rounded-lg overflow-hidden relative"
            style={{ aspectRatio: "16/9" }}
          >
            <img
              src={url}
              alt="Camera Stream"
              className="w-full h-full object-contain"
              onError={() => setConnected(false)}
              onLoad={() => setConnected(true)}
            />
            {/* Live badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-md">
              <div
                className={`w-2 h-2 rounded-full ${
                  connected ? "bg-red-500 animate-pulse" : "bg-gray-500"
                }`}
              />
              <span className="text-xs text-white">LIVE</span>
            </div>
            {/* Connection indicator */}
            <div className="absolute top-3 right-3 text-xs text-gray-300 bg-black/40 px-2 py-1 rounded-md">
              {connected ? "connected" : "disconnected"}
            </div>
          </div>
        </div>

        {/* Controls */}
        {controls && (
          <div className="bg-gray-800 px-6 py-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div>{connected ? "Streaming" : "No feed"}</div>
                <div className="text-gray-400">Camera</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

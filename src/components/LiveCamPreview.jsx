import React, { useEffect, useRef, useState } from "react";

/**
 * LiveCamPreview
 *  - React + Tailwind component that shows a live camera preview coming from an ESP32 over WebSocket.
 *  - Compatible with frames sent as binary JPEG/PNG blobs or as base64 strings.
 *
 * Props:
 *  - wsUrl (string) : websocket url, e.g. ws://192.168.4.1:81/stream
 *  - autoPlay (bool) : start streaming automatically
 *  - controls (bool) : show bottom controls
 *
 * Notes for ESP32 sender:
 *  - Send raw binary JPEG frames if possible (faster, smaller overhead). The browser will receive ArrayBuffer/Blob.
 *  - Alternatively send JSON like { "b64": "...base64jpeg..." } or a plain data URL string.
 */

export default function LiveCamPreview({
  wsUrl = "ws://192.168.4.1:81/stream",
  autoPlay = false,
  controls = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const wsRef = useRef(null);
  const [playing, setPlaying] = useState(!!autoPlay);
  const [connected, setConnected] = useState(false);
  const [lastFrameTime, setLastFrameTime] = useState(null);

  useEffect(() => {
    if (autoPlay) startStream();
    return () => {
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startStream() {
    if (wsRef.current) return; // already running

    try {
      const ws = new WebSocket(wsUrl);
      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        setConnected(true);
        setPlaying(true);
        console.log("WebSocket connected to", wsUrl);
      };

      ws.onmessage = async (ev) => {
        // handle binary
        if (ev.data instanceof ArrayBuffer) {
          const blob = new Blob([ev.data]);
          await drawBlobToCanvas(blob);
        } else if (ev.data instanceof Blob) {
          await drawBlobToCanvas(ev.data);
        } else if (typeof ev.data === "string") {
          // maybe data URL or JSON with base64
          try {
            const parsed = JSON.parse(ev.data);
            if (parsed && parsed.b64) {
              const byteString = atob(parsed.b64.split(",").pop());
              const ab = new Uint8Array(byteString.length);
              for (let i = 0; i < byteString.length; i++)
                ab[i] = byteString.charCodeAt(i);
              const blob = new Blob([ab.buffer]);
              await drawBlobToCanvas(blob);
            } else if (parsed && parsed.type && parsed.data) {
              // other JSON schema
            } else {
              // treat as data URL
              await drawDataUrlToCanvas(ev.data);
            }
          } catch (e) {
            // not JSON -> probably data URL
            await drawDataUrlToCanvas(ev.data);
          }
        }
      };

      ws.onclose = () => {
        setConnected(false);
        wsRef.current = null;
        console.log("WebSocket closed");
      };

      ws.onerror = (err) => {
        console.error("WebSocket error", err);
        ws.close();
      };

      wsRef.current = ws;
    } catch (err) {
      console.error("Failed to start websocket", err);
    }
  }

  function stopStream() {
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch (e) {}
      wsRef.current = null;
    }
    setPlaying(false);
    setConnected(false);
  }

  async function drawBlobToCanvas(blob) {
    if (!canvasRef.current) return;
    try {
      // createImageBitmap is fast and avoids creating object URLs
      const imgBitmap = await createImageBitmap(blob);
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // fit to canvas while keeping aspect ratio
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = imgBitmap.width;
      const ih = imgBitmap.height;
      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;
      let dw = cw,
        dh = ch;
      if (imgRatio > canvasRatio) {
        dh = Math.round(cw / imgRatio);
      } else {
        dw = Math.round(ch * imgRatio);
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(
        imgBitmap,
        Math.floor((cw - dw) / 2),
        Math.floor((ch - dh) / 2),
        dw,
        dh
      );
      setLastFrameTime(Date.now());
    } catch (err) {
      console.error("drawBlobToCanvas error", err);
    }
  }

  async function drawDataUrlToCanvas(dataUrl) {
    if (!canvasRef.current) return;
    const img = new Image();
    img.src = dataUrl;
    await new Promise((res, rej) => {
      img.onload = () => res(true);
      img.onerror = rej;
    });
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;
    const canvasRatio = cw / ch;
    const imgRatio = iw / ih;
    let dw = cw,
      dh = ch;
    if (imgRatio > canvasRatio) {
      dh = Math.round(cw / imgRatio);
    } else {
      dw = Math.round(ch * imgRatio);
    }
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(
      img,
      Math.floor((cw - dw) / 2),
      Math.floor((ch - dh) / 2),
      dw,
      dh
    );
    setLastFrameTime(Date.now());
  }

  // toggle play/pause
  function handleTogglePlay() {
    if (playing) {
      stopStream();
    } else {
      startStream();
    }
  }

  // fullscreen
  function handleFullscreen() {
    const el = containerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.();
    }
  }

  // resize canvas to container while keeping high DPI
  useEffect(() => {
    function resize() {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(320, Math.floor(rect.width - 32));
      const height = Math.max(180, Math.floor(rect.height - 84));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      const ctx = canvas.getContext("2d");
      ctx.scale(dpr, dpr);
      // black background
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // small heartbeat info for live status
  const timeSinceLast = lastFrameTime
    ? Math.round((Date.now() - lastFrameTime) / 1000)
    : null;

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-900 rounded-2xl shadow-2xl border-4 border-gray-800 overflow-hidden">
        {/* video area */}
        <div className="p-4">
          <div
            className="bg-black rounded-lg overflow-hidden relative"
            style={{ aspectRatio: "16/9" }}
          >
            <canvas ref={canvasRef} className="w-full h-full block" />
            {/* top-left live badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 px-2 py-1 rounded-md">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-white">LIVE</span>
            </div>
            {/* small connection indicator */}
            <div className="absolute top-3 right-3 text-xs text-gray-300 bg-black/40 px-2 py-1 rounded-md">
              {connected ? "connected" : "disconnected"}
            </div>
          </div>
        </div>

        {/* bottom control bar */}
        {controls && (
          <div className="bg-gray-800 px-6 py-4 flex items-center gap-4">
            <button
              onClick={handleTogglePlay}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md"
            >
              {/* play / pause triangle */}
              {!playing ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 text-gray-900"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-900"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 4h3v12H6V4zm5 0h3v12h-3V4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>

            <div className="flex-1">
              {/* progress bar (for live this is just an indicator) */}
              <div className="w-full h-2 bg-gray-700 rounded-full relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-2 rounded-full bg-red-600"
                  style={{ width: connected ? "20%" : "0%" }}
                />
                {/* subtle dark track */}
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                <div>
                  {connected
                    ? timeSinceLast === 0
                      ? "just now"
                      : timeSinceLast
                      ? `${timeSinceLast}s ago`
                      : "waiting"
                    : "no feed"}
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-gray-400">ESP32</div>
                  <button
                    onClick={handleFullscreen}
                    className="p-1 rounded-md hover:bg-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-200"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 9v-4h4" />
                      <path d="M21 15v4h-4" />
                      <path d="M21 3l-6 6" />
                      <path d="M3 21l6-6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

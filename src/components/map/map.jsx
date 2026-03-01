"use client";

import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet-control-geocoder";
import { useModal } from "@/components/reports/ModalContext";
import { setLatLng } from "@/lib/map";

export default function Map({ data }) {
    const containerRef = useRef(null);
    const mapRef = useRef(null);
    const polygonRef = useRef(null);
    const [error, setError] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [tilesLoaded, setTilesLoaded] = useState(0);
    const [tilesFailed, setTilesFailed] = useState(0);

    const { setIsOpen } = useModal();

    const buttonStyle = `
        padding: 6px 12px;
        margin-right: 8px;
        cursor: pointer;
        border: 1px solid #3388ff;
        border-radius: 4px;
        background: white;
        color: #3388ff;
        transition: background 0.2s, color 0.2s;
    `;

    useEffect(() => {
        if (mapRef.current) return;

        try {
            Object.defineProperty(window, "devicePixelRatio", {
                get: () => 1,
                configurable: true,
            });

            L.Browser.retina = false;

            mapRef.current = L.map(containerRef.current, {
                zoomAnimation: false,
            }).setView([37.9485, -91.7715], 14);

            const tileLayer = L.tileLayer(
                "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    maxZoom: 19,
                    tileSize: 256,
                    attribution: "&copy; OpenStreetMap",
                    detectRetina: false,
                },
            ).addTo(mapRef.current);

            var geocoder = L.Control.geocoder({
                defaultMarkGeocode: false,
            })
            .on("markgeocode", function (e) {
                const bbox = e.geocode.bbox;   // Leaflet LatLngBounds
                const center = e.geocode.center;

                if (bbox) {
                    mapRef.current.fitBounds(bbox);
                } else {
                    mapRef.current.setView(center, 14);
                }
            })
            .addTo(mapRef.current);

            tileLayer.on("tileload", () => setTilesLoaded((n) => n + 1));
            tileLayer.on("tileload", (ev) => {
                // eslint-disable-next-line no-console
                console.debug("tile loaded", ev.tile && ev.tile.src);
            });
            tileLayer.on("tileerror", (ev) => {
                // eslint-disable-next-line no-console
                console.warn("tile error", ev.tile && ev.tile.src);
                setTilesFailed((n) => n + 1);
            });

            var popup = L.popup();

            function onMapClick(e) {
                const container = L.DomUtil.create("div");

                const report = L.DomUtil.create("button", "", container);

                report.innerText = "📝 Make Report";

                report.style.cssText = `
                    background: white;
                    color: #2563eb;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    padding: 8px 14px;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                `;

                report.addEventListener("mouseover", () => {
                    report.style.background = "#2563eb";
                    report.style.color = "white";
                    report.style.transform = "translateY(-1px)";
                });

                report.addEventListener("mouseout", () => {
                    report.style.background = "white";
                    report.style.color = "#2563eb";
                    report.style.transform = "translateY(0)";
                });

                L.DomEvent.disableClickPropagation(report);
                L.DomEvent.disableScrollPropagation(report);

                L.DomEvent.on(report, "click", async () => {
                    const response = await fetch("/api/reports/auth", {
                        method: "GET",
                        credentials: "include",
                    });

                    if (response.ok) {
                        setIsOpen(true);
                    } else {
                        window.location.href = "/auth/login";
                    }
                });

                popup.setLatLng(e.latlng).setContent(container).openOn(mapRef.current);

                const { lat, lng } = popup.getLatLng();
                setLatLng(lat, lng);
            }

            mapRef.current.on("click", onMapClick);
            setMounted(true);
        } catch (err) {
            // surface initialization errors to the page so they can be debugged in the browser
            // (also logs to devtools console)
            // eslint-disable-next-line no-console
            console.error("Leaflet map initialization error:", err);
            setError(err?.message || String(err));
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    function createDatapoint(report) {
        if (report.isResolved) {
            return;
        }

        const circle = L.circle([report.latitude, report.longitude], {
            radius: 25,
            color: fillColor(report.type),
            fillColor: fillColor(report.type),
            fillOpacity: 0.5,
        }).addTo(mapRef.current);
        circle.bindPopup(`
        <div style="
            font-family: system-ui, sans-serif;
            width: 220px;
        ">

            <h3 style="
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                color: #111827;
            ">
                ${report.type.replace("_", " ")}
            </h3>

            <p style="
                margin: 4px 0 10px 0;
                font-size: 13px;
                color: #6b7280;
            ">
                Severity: <strong>${report.severity}</strong>
            </p>

            <div style="
                background:#f9fafb;
                padding:8px;
                border-radius:8px;
                font-size:13px;
                color:#374151;
                margin-bottom:12px;
            ">
                ${report.description || "No description provided"}
            </div>

            <div style="
                display:flex;
                gap:8px;
            ">
                <button id="upVoteBtn"
                    style="
                        flex:1;
                        background:#2563eb;
                        color:white;
                        border:none;
                        padding:6px 8px;
                        border-radius:6px;
                        cursor:pointer;
                        font-size:13px;
                        font-weight:500;
                    ">
                    👍 Upvote (${report.votes})
                </button>

                <button id="resolveBtn"
                    style="
                        flex:1;
                        background:#10b981;
                        color:white;
                        border:none;
                        padding:6px 8px;
                        border-radius:6px;
                        cursor:pointer;
                        font-size:13px;
                        font-weight:500;
                    ">
                    ✅ Resolve
                </button>
            </div>
        </div>
        `);
        circle.on("popupopen", () => {
            const upVoteBtn = document.getElementById("upVoteBtn");
            const resolveBtn = document.getElementById("resolveBtn");

            // store original colors
            const buttons = [
                { el: upVoteBtn, base: "#2563eb" }, // blue
                { el: resolveBtn, base: "#10b981" }, // green
            ];

            buttons.forEach(({ el, base }) => {
                el.addEventListener("mouseover", () => {
                    el.style.background = darkenColor(base, 15);
                    el.style.color = "white";
                });

                el.addEventListener("mouseout", () => {
                    el.style.background = base;
                    el.style.color = "white";
                });
            });

            upVoteBtn.addEventListener("click", async () => {
                try {
                    const response = await fetch("/api/reports/upVote", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(report),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    window.location.reload();
                } catch (error) {
                    console.error("Up Vote Btn Error:", error)
                }
            });

            resolveBtn.addEventListener("click", async () => {
                try {
                    const response = await fetch("/api/reports/resolve", {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(report),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    window.location.reload();
                } catch (error) {
                    console.error("Resolve Btn Error:", error)
                }
            });
        });

        // tiny helper to darken hex colors
        function darkenColor(hex, percent) {
            const num = parseInt(hex.replace("#", ""), 16),
                amt = Math.round(2.55 * percent),
                R = (num >> 16) - amt,
                G = ((num >> 8) & 0x00ff) - amt,
                B = (num & 0x0000ff) - amt;
            return (
                "#" +
                (
                    0x1000000 +
                    (R < 0 ? 0 : R > 255 ? 255 : R) * 0x10000 +
                    (G < 0 ? 0 : G > 255 ? 255 : G) * 0x100 +
                    (B < 0 ? 0 : B > 255 ? 255 : B)
                )
                    .toString(16)
                    .slice(1)
            );
        }
    }

    function fillColor(type) {
        if (type === "ROAD_ISSUE") {
            return "green";
        }
        if (type === "PUBLIC_SAFETY") {
            return "red";
        }
        if (type === "SANITATION") {
            return "yellow";
        }
        if (type === "WATER_ISSUE") {
            return "blue";
        }
        if (type === "CRIME") {
            return "orange";
        }
        if (type === "OTHER") {
            return "purple";
        }
    }

    useEffect(() => {
        if (!mapRef.current) return;
        if (!data || data.length === 0) return;

        for (const report of data) {
            createDatapoint(report);
        }
    }, [data]);

    return (
        <>
            {error ? (
                <div style={{ padding: 16, color: "white", background: "crimson" }}>
                    Map error: {error}
                </div>
            ) : null}
            <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />
        </>
    );
}

"use client";

import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo, useState } from 'react';

export function MapWidget() {
	const [pos, setPos] = useState<[number, number] | null>(null);
	const [courier, setCourier] = useState<[number, number] | null>(null);
	useEffect(() => {
		if (!navigator.geolocation) return;
		navigator.geolocation.getCurrentPosition((p) => {
			const me: [number, number] = [p.coords.latitude, p.coords.longitude];
			setPos(me);
			setCourier([me[0] + 0.01, me[1] + 0.01]);
		});
	}, []);
	useEffect(() => {
		if (!courier || !pos) return;
		const id = setInterval(() => {
			setCourier((c) => {
				if (!c) return c;
				const step = 0.001;
				const lat = c[0] + (pos[0] - c[0]) * 0.1;
				const lng = c[1] + (pos[1] - c[1]) * 0.1;
				if (Math.hypot(lat - pos[0], lng - pos[1]) < 0.0005) return pos;
				return [lat, lng];
			});
		}, 1000);
		return () => clearInterval(id);
	}, [courier, pos]);
	const path = useMemo(() => (courier && pos ? [courier, pos] : []), [courier, pos]);
	if (!pos) return <div className="h-64 w-full rounded-md border" />;
	return (
		<div className="h-64 w-full overflow-hidden rounded-md border">
			<MapContainer center={pos} zoom={14} style={{ height: '100%', width: '100%' }}>
				<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
				{courier && <Marker position={courier} />}
				<Marker position={pos} />
				{path.length === 2 && <Polyline positions={path as any} color="purple" />}
			</MapContainer>
		</div>
	);
}
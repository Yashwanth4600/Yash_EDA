"use client";

import { motion } from 'framer-motion';

export function MotionHero() {
	return (
		<div className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="bg-gradient-to-br from-primary to-fuchsia-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl"
			>
				Your Style, Delivered in 15 Minutes.
			</motion.h1>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, delay: 0.1 }}
				className="mt-4 max-w-2xl text-balance text-muted-foreground"
			>
				Fast, trendy, urban fashion for Gen Z and young professionals.
			</motion.p>
		</div>
	);
}
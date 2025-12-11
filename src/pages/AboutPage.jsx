"use client";

import React from "react";
import HeroScrollDemo from "../components/ui/scrollScreen/HeroScrollDemo"; // <-- correct import path

export default function AboutPage() {
    return (
        <div className="w-full">
            <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
                <h2 className="text-5xl font-bold mb-4 text-white/30">
                    About the MERN Project
                </h2>

                <p className="text-lg text-gray-700 max-w-3xl text-center">
                    This is a simple MERN stack application using React, Node.js,
                    Express, and MongoDB.
                </p>
            </div>
            <HeroScrollDemo />
        </div>
    );
}

import React from 'react';
import { motion } from 'framer-motion';

export const Globe: React.FC = () => {
    return (
        <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] flex items-center justify-center perspective-1000">
            {/* Core Sphere */}
            <motion.div 
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] rounded-full border border-emerald-500/30 bg-emerald-900/10 backdrop-blur-sm relative preserve-3d shadow-[0_0_50px_rgba(16,185,129,0.2)]"
            >
                {/* Lat/Long Lines Simulation */}
                {[0, 45, 90, 135].map((deg) => (
                    <div key={deg} className="absolute inset-0 rounded-full border border-emerald-500/10" style={{ transform: `rotateY(${deg}deg)` }} />
                ))}
                
                {/* Glowing Nodes (Cities) */}
                <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] translate-z-10" />
                <div className="absolute top-[40%] right-[30%] w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#10B981] translate-z-10" />
                <div className="absolute bottom-[30%] left-[40%] w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_10px_#10B981] translate-z-10" />
            </motion.div>

            {/* Orbital Rings */}
            <motion.div 
                animate={{ rotateZ: 360, rotateX: 60 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-emerald-500/10"
            />
            <motion.div 
                animate={{ rotateZ: -360, rotateX: -60 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute w-[250px] h-[250px] sm:w-[450px] sm:h-[450px] rounded-full border border-blue-500/10"
            />
        </div>
    );
};
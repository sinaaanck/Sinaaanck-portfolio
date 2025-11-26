import React, { useEffect, useRef, useState } from 'react';

interface AudioControllerProps {
    isPlaying: boolean;
}

export const AudioController: React.FC<AudioControllerProps> = ({ isPlaying }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Initialize audio
        audioRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3'); // Placeholder ambient sound
        audioRef.current.loop = true;
        audioRef.current.volume = 0.05;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying && !isMuted) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, isMuted]);

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    if (!isPlaying) return null;

    return (
        <button
            onClick={toggleMute}
            className="fixed bottom-8 right-8 z-[100] p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
        >
            <span className="material-icons">
                {isMuted ? 'volume_off' : 'volume_up'}
            </span>
        </button>
    );
};

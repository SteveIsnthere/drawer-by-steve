'use client'
import React, {useCallback, useEffect, useState} from "react";
import {motion, AnimatePresence, useMotionValue, animate} from "framer-motion";
import {X} from "lucide-react";

interface DBSProps {
    open: boolean;
    onClose: () => void;
    title?: React.ReactNode;
    children: React.ReactNode;
    noMinHeight?: boolean
}



const DBS: React.FC<DBSProps> = ({
                                     open,
                                     onClose,
                                     title,
                                     children,
                                     noMinHeight = false
                                 }) => {
    const y = useMotionValue(0);
    const isWideScreen = window.innerWidth > 700
    const [useMotionStyle, setUseMotionStyle] = useState(false);


    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            y.set(0);
            setUseMotionStyle(false);
            const timer = setTimeout(() => {
                setUseMotionStyle(true);
            }, 500);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'unset';
            setTimeout(() => {
                setUseMotionStyle(false);
            }, 500);
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.position = 'static';
            document.body.style.width = 'auto';
        };
    }, [open]);

    const handleDragStart = (e: any) => {
        const target = e.target;
        if (!target.closest('.drag-handle')) {
            e.stopPropagation();
        }
    };

    const handleDragEnd = useCallback(
        (_: PointerEvent, {offset, velocity}: {
            offset: { x: number; y: number };
            velocity: { x: number; y: number }
        }) => {
            if (offset.y > 200 || velocity.y > 200) {
                onClose();
            } else {
                animate(y, 0, {
                    type: 'spring',
                    damping: 30,
                    stiffness: 440,
                });
            }
        },
        [onClose, y],
    );

    const verticalDrawer = (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
                onClick={onClose}
                className="fixed inset-0 bg-black/55 z-40 touch-none w-full"
                style={{pointerEvents: 'auto'}}
            />
            <motion.div
                initial={{y: '100%'}}
                animate={{y: 0}}
                exit={{y: '100%'}}
                transition={{
                    type: 'spring',
                    damping: 36,
                    stiffness: 400,
                }}
                drag="y"
                dragConstraints={{top: 0}}
                dragElastic={0.5}
                style={useMotionStyle ? {y} : undefined}
                dragMomentum={true}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                className="fixed border bottom-0 left-0 right-0 z-[1000] bg-[var(--background)] rounded-t-[12px] shadow-2xl will-change-transform"
            >
                <div className="drag-handle select-none touch-none">
                    <div className="flex flex-col items-center pt-2">
                        <div className="w-24 h-[5px] rounded-full bg-gray-300 dark:bg-gray-600"/>
                    </div>
                    <div className="px-6 pt-2 pb-3 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1">
                                {title}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1 -mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex-shrink-0"
                            >
                                <X className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`p-6 overflow-y-auto overscroll-contain max-h-[calc(85vh-100px)] ${noMinHeight ? '' : 'min-h-[50vh]'}`}
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerMove={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </motion.div>
        </>
    );

    const horizontalDrawer = (
        <>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.2}}
                onClick={onClose}
                className="fixed inset-0 bg-black/55 z-40 touch-none w-full"
                style={{pointerEvents: 'auto'}}
            />
            <motion.div
                initial={{x: '100%'}}
                animate={{x: 0}}
                exit={{x: '100%'}}
                transition={{
                    type: 'spring',
                    damping: 40,
                    stiffness: 300,
                }}
                className="fixed border top-0 right-0 bottom-0 z-[1000] bg-[var(--background)] shadow-2xl will-change-transform w-[600px] max-w-[100vw]"
            >
                <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                            {title}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 -mr-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors flex-shrink-0"
                        >
                            <X className="w-5 h-5"/>
                        </button>
                    </div>
                </div>

                <div
                    className="p-6 overflow-y-auto overscroll-contain h-[calc(100vh-70px)]"
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerMove={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </motion.div>
        </>
    );

    return (
        <AnimatePresence>
            {open && (isWideScreen ? horizontalDrawer : verticalDrawer)}
        </AnimatePresence>
    );
}

export default DBS;
import React, { useRef, useState } from 'react';
import { Button, Card } from './UI';
import { Camera, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { analyzeReceipt } from '../services/gemini';
import { ReceiptAnalysis } from '../types';

interface ReceiptUploaderProps {
    onAnalysisComplete: (data: ReceiptAnalysis) => void;
}

export const ReceiptUploader: React.FC<ReceiptUploaderProps> = ({ onAnalysisComplete }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result as string;
                // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
                const base64Data = base64String.split(',')[1];
                
                try {
                    const analysis = await analyzeReceipt(base64Data);
                    onAnalysisComplete(analysis);
                } catch (err) {
                    setError("Gemini Vision failed to analyze the image.");
                } finally {
                    setIsAnalyzing(false);
                }
            };
            reader.readAsDataURL(file);
        } catch (err) {
            setError("Failed to process image file.");
            setIsAnalyzing(false);
        }
    };

    return (
        <Card className="p-4 border-dashed border-2 border-white/10 hover:border-emerald-500/50 transition-colors bg-transparent">
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
            />
            
            <div className="flex flex-col items-center justify-center py-4 gap-3">
                {isAnalyzing ? (
                    <>
                        <Loader2 className="animate-spin text-emerald-500" size={32} />
                        <span className="text-sm text-gray-400 font-mono animate-pulse">Gemini Vision Analyzing...</span>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-1">
                            <Camera size={24} />
                        </div>
                        <div className="text-center">
                            <h3 className="font-medium text-white">Scan Receipt</h3>
                            <p className="text-xs text-gray-500 mb-3">Upload receipt or food photo</p>
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                className="h-8 text-xs"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                Select Image
                            </Button>
                        </div>
                    </>
                )}
                
                {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs mt-2">
                        <AlertCircle size={12} />
                        {error}
                    </div>
                )}
            </div>
        </Card>
    );
};

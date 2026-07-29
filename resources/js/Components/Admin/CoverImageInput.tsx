import { useEffect, useRef, useState } from 'react';
import { Upload, RefreshCw, X } from 'lucide-react';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_HINT = 'JPG, PNG or WEBP — max 2MB';

interface CoverImageInputProps {
    urlValue: string;
    onUrlChange: (value: string) => void;
    file: File | null;
    onFileChange: (file: File | null) => void;
    existingImage?: string | null;
    error?: string;
    uploading?: boolean;
    progressPercentage?: number | null;
}

export default function CoverImageInput({
    urlValue,
    onUrlChange,
    file,
    onFileChange,
    existingImage,
    error,
    uploading,
    progressPercentage,
}: CoverImageInputProps) {
    const [mode, setMode] = useState<'upload' | 'url'>(() =>
        existingImage && !existingImage.startsWith('/storage/blog/') ? 'url' : 'upload'
    );
    const [dragActive, setDragActive] = useState(false);
    const [localError, setLocalError] = useState('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl(null);
            return;
        }
        const objUrl = URL.createObjectURL(file);
        setPreviewUrl(objUrl);
        return () => URL.revokeObjectURL(objUrl);
    }, [file]);

    function validateAndSetFile(selected: File) {
        if (!ACCEPTED_TYPES.includes(selected.type)) {
            setLocalError('Only JPG, PNG, or WEBP images are allowed.');
            return;
        }
        if (selected.size > MAX_FILE_SIZE) {
            setLocalError('Image must be 2MB or smaller.');
            return;
        }
        setLocalError('');
        onFileChange(selected);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const selected = e.target.files?.[0];
        if (selected) validateAndSetFile(selected);
        e.target.value = '';
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragActive(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped) validateAndSetFile(dropped);
    }

    function clearFile() {
        onFileChange(null);
        setLocalError('');
    }

    const displayPreview = previewUrl ?? (mode === 'upload' ? existingImage : null);

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-[#0F172A] mb-4">Cover Image</h3>

            <div className="flex gap-1 mb-4 bg-gray-100 rounded-lg p-1">
                <button
                    type="button"
                    onClick={() => setMode('upload')}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${
                        mode === 'upload' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#0F172A]/50 hover:text-[#0F172A]/70'
                    }`}
                >
                    Upload File
                </button>
                <button
                    type="button"
                    onClick={() => setMode('url')}
                    className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-colors ${
                        mode === 'url' ? 'bg-white text-[#0F172A] shadow-sm' : 'text-[#0F172A]/50 hover:text-[#0F172A]/70'
                    }`}
                >
                    Use URL
                </button>
            </div>

            {mode === 'upload' ? (
                <div>
                    {displayPreview ? (
                        <div className="relative rounded-xl overflow-hidden border border-gray-100 group">
                            <img
                                src={displayPreview}
                                alt="Cover preview"
                                className="w-full h-32 object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                <button
                                    type="button"
                                    onClick={() => inputRef.current?.click()}
                                    className="flex items-center gap-1.5 text-xs font-medium bg-white text-[#0F172A] px-3 py-1.5 rounded-lg hover:bg-gray-100"
                                >
                                    <RefreshCw className="h-3.5 w-3.5" />
                                    Replace Image
                                </button>
                                {file && (
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        className="flex items-center gap-1.5 text-xs font-medium bg-white text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50"
                                    >
                                        <X className="h-3.5 w-3.5" />
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                            className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl py-8 px-4 cursor-pointer transition-colors ${
                                dragActive ? 'border-[#2563EB] bg-blue-50' : 'border-gray-200 hover:border-gray-300 bg-gray-50/50'
                            }`}
                        >
                            <Upload className="h-6 w-6 text-[#0F172A]/30" />
                            <p className="text-sm text-[#0F172A]/70 text-center">
                                <span className="text-[#2563EB] font-medium">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-[#0F172A]/40">{ACCEPTED_HINT}</p>
                        </div>
                    )}
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleInputChange}
                        className="hidden"
                    />
                    {uploading && progressPercentage != null && (
                        <div className="mt-2">
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#2563EB] transition-all"
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>
                            <p className="text-xs text-[#0F172A]/40 mt-1">Uploading… {progressPercentage}%</p>
                        </div>
                    )}
                    {localError && <p className="text-red-500 text-xs mt-2">{localError}</p>}
                </div>
            ) : (
                <div>
                    <Label htmlFor="cover_image_url" className="text-xs text-[#0F172A]/60 mb-1 block">
                        Image URL
                    </Label>
                    <Input
                        id="cover_image_url"
                        type="url"
                        value={urlValue}
                        onChange={(e) => onUrlChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                    />
                    {urlValue && (
                        <div className="mt-3 rounded-xl overflow-hidden border border-gray-100">
                            <img
                                src={urlValue}
                                alt="Cover preview"
                                className="w-full h-28 object-cover"
                                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                            />
                        </div>
                    )}
                </div>
            )}

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    );
}

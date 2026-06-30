import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Quote, Heading2, Heading3, Link2, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TiptapEditorProps {
    content: string;
    onChange: (html: string) => void;
    className?: string;
}

interface ToolBtnProps {
    onClick: () => void;
    active?: boolean;
    children: React.ReactNode;
    title: string;
}

function ToolBtn({ onClick, active, children, title }: ToolBtnProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            title={title}
            className={cn(
                'p-1.5 rounded text-sm transition-colors',
                active ? 'bg-[#2563EB] text-white' : 'text-gray-600 hover:bg-gray-100',
            )}
        >
            {children}
        </button>
    );
}

export default function TiptapEditor({ content, onChange, className }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: { class: 'text-blue-600 underline' },
            }),
        ],
        content,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {
                class: 'prose prose-sm max-w-none min-h-[300px] px-4 py-3 focus:outline-none',
            },
        },
    });

    if (!editor) return null;

    return (
        <div className={cn('border border-gray-200 rounded-xl overflow-hidden', className)}>
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-1 px-3 py-2 bg-gray-50 border-b border-gray-200">
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    active={editor.isActive('bold')}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    active={editor.isActive('italic')}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </ToolBtn>

                <div className="w-px h-5 bg-gray-200 mx-1" />

                <ToolBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    active={editor.isActive('heading', { level: 2 })}
                    title="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    active={editor.isActive('heading', { level: 3 })}
                    title="Heading 3"
                >
                    <Heading3 className="h-4 w-4" />
                </ToolBtn>

                <div className="w-px h-5 bg-gray-200 mx-1" />

                <ToolBtn
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    active={editor.isActive('bulletList')}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    active={editor.isActive('orderedList')}
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    active={editor.isActive('blockquote')}
                    title="Blockquote"
                >
                    <Quote className="h-4 w-4" />
                </ToolBtn>
                <ToolBtn
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    active={false}
                    title="Horizontal Rule"
                >
                    <Minus className="h-4 w-4" />
                </ToolBtn>

                <div className="w-px h-5 bg-gray-200 mx-1" />

                <ToolBtn
                    title="Add Link"
                    active={editor.isActive('link')}
                    onClick={() => {
                        const url = window.prompt('URL:');
                        if (url) editor.chain().focus().setLink({ href: url }).run();
                    }}
                >
                    <Link2 className="h-4 w-4" />
                </ToolBtn>
            </div>

            {/* Editor area */}
            <div className="bg-white">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

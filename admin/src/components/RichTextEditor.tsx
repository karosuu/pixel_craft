import { useEffect, type ReactNode } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';

type Props = {
	value: string;
	onChange: (html: string) => void;
	disabled?: boolean;
};

export function RichTextEditor({ value, onChange, disabled }: Props) {
	const editor = useEditor({
		immediatelyRender: false,
		editable: !disabled,
		extensions: [
			StarterKit.configure({
				code: false,
				codeBlock: false,
				heading: { levels: [2] },
				link: {
					openOnClick: false,
					autolink: true,
					HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
				},
			}),
			Underline,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Table.configure({
				resizable: false,
				HTMLAttributes: {
					style: 'border-collapse: collapse; width: 100%;',
				},
			}),
			TableRow,
			TableHeader.configure({
				HTMLAttributes: {
					style: 'border: 1px solid #ccc; padding: 6px 8px; background: #f3f4f6; font-weight: 600;',
				},
			}),
			TableCell.configure({
				HTMLAttributes: {
					style: 'border: 1px solid #ccc; padding: 6px 8px; min-width: 80px;',
				},
			}),
			Placeholder.configure({ placeholder: 'Escribe el mensaje…' }),
		],
		content: value || '<p></p>',
		onUpdate: ({ editor: next }) => onChange(next.getHTML()),
		editorProps: {
			attributes: {
				class: 'email-editor-content',
			},
		},
	});

	useEffect(() => {
		if (!editor) return;
		editor.setEditable(!disabled);
	}, [disabled, editor]);

	useEffect(() => {
		if (!editor) return;
		const next = value || '<p></p>';
		const current = editor.getHTML();
		if (next === current) return;
		// TipTap treats empty docs as <p></p>; normalize so we don't loop.
		if (!value && (current === '<p></p>' || current === '')) return;
		editor.commands.setContent(next, { emitUpdate: false });
	}, [editor, value]);

	if (!editor) return <div className="field min-h-40" />;

	const inTable = editor.isActive('table');

	return (
		<div className={`email-editor ${disabled ? 'opacity-60' : ''}`}>
			<div className="email-editor-toolbar">
				<ToolbarButton active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} label="Negrita">
					B
				</ToolbarButton>
				<ToolbarButton active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} label="Cursiva">
					<em>I</em>
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive('underline')}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					label="Subrayado"
				>
					U
				</ToolbarButton>

				<ToolbarSep />

				<ToolbarButton
					active={editor.isActive('heading', { level: 2 })}
					onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
					label="Título"
				>
					H2
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive('blockquote')}
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					label="Cita"
				>
					“”
				</ToolbarButton>
				<ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} label="Línea horizontal">
					―
				</ToolbarButton>

				<ToolbarSep />

				<ToolbarButton
					active={editor.isActive({ textAlign: 'left' })}
					onClick={() => editor.chain().focus().setTextAlign('left').run()}
					label="Alinear izquierda"
				>
					Izq
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive({ textAlign: 'center' })}
					onClick={() => editor.chain().focus().setTextAlign('center').run()}
					label="Centrar"
				>
					Cen
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive({ textAlign: 'right' })}
					onClick={() => editor.chain().focus().setTextAlign('right').run()}
					label="Alinear derecha"
				>
					Der
				</ToolbarButton>

				<ToolbarSep />

				<ToolbarButton
					active={editor.isActive('bulletList')}
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					label="Lista"
				>
					•
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive('orderedList')}
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					label="Lista numerada"
				>
					1.
				</ToolbarButton>

				<ToolbarSep />

				<ToolbarButton
					active={inTable}
					onClick={() => editor.chain().focus().insertTable({ rows: 2, cols: 3, withHeaderRow: true }).run()}
					label="Insertar tabla"
				>
					Tabla
				</ToolbarButton>
				{inTable && (
					<>
						<ToolbarButton onClick={() => editor.chain().focus().addRowAfter().run()} label="Añadir fila">
							Fila+
						</ToolbarButton>
						<ToolbarButton onClick={() => editor.chain().focus().addColumnAfter().run()} label="Añadir columna">
							Col+
						</ToolbarButton>
						<ToolbarButton onClick={() => editor.chain().focus().deleteTable().run()} label="Borrar tabla">
							✕ Tabla
						</ToolbarButton>
					</>
				)}

				<ToolbarSep />

				<ToolbarButton
					active={editor.isActive('link')}
					onClick={() => {
						if (editor.isActive('link')) {
							editor.chain().focus().unsetLink().run();
							return;
						}
						const href = window.prompt('URL del enlace', 'https://');
						if (!href) return;
						editor.chain().focus().setLink({ href }).run();
					}}
					label="Enlace"
				>
					Link
				</ToolbarButton>
			</div>
			<EditorContent editor={editor} />
		</div>
	);
}

function ToolbarSep() {
	return <span className="email-editor-sep" aria-hidden="true" />;
}

function ToolbarButton({
	active,
	onClick,
	label,
	children,
}: {
	active?: boolean;
	onClick: () => void;
	label: string;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			aria-label={label}
			onClick={onClick}
			className={`rounded-md px-2 py-1 text-xs font-semibold ${
				active ? 'bg-page text-cyan' : 'text-muted hover:bg-page hover:text-fg'
			}`}
		>
			{children}
		</button>
	);
}

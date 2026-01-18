import { mergeAttributes } from '@tiptap/core';
import Image from '@tiptap/extension-image';

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        customImage: {
            setImageAlign: (alignment: 'left' | 'center' | 'right') => ReturnType;
            detectImageAlign: () => ReturnType;
        };
    }
}

/**
 * Detects image alignment based on CSS margin styles
 */
const detectAlignmentFromStyle = (style: CSSStyleDeclaration): 'left' | 'center' | 'right' | null => {
    if (style.marginLeft === 'auto' && style.marginRight === 'auto') {
        return 'center';
    }
    if (style.marginLeft === 'auto' && style.marginRight === '0px') {
        return 'right';
    }
    if (style.marginLeft === '0px' && style.marginRight === 'auto') {
        return 'left';
    }
    return null;
};

export const CustomImage = Image.extend({
    name: 'image',

    addAttributes() {
        return {
            src: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('src'),
                renderHTML: (attributes: any) => {
                    if (!attributes.src) return {};
                    return { src: attributes.src };
                },
            },
            alt: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('alt'),
                renderHTML: (attributes: any) => {
                    if (!attributes.alt) return {};
                    return { alt: attributes.alt };
                },
            },
            title: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('title'),
                renderHTML: (attributes: any) => {
                    if (!attributes.title) return {};
                    return { title: attributes.title };
                },
            },
            textAlign: {
                default: null,
                parseHTML: (element: HTMLElement) => {
                    // First, check if the image itself has the data-text-align attribute
                    const dataAlign = element.dataset.textAlign;
                    if (dataAlign) return dataAlign;

                    // Check the inline style of the image
                    const style = element.getAttribute('style');
                    if (style) {
                        if (style.includes('margin-left: auto') && style.includes('margin-right: auto')) {
                            return 'center';
                        } else if (style.includes('margin-left: auto') && style.includes('margin-right: 0')) {
                            return 'right';
                        } else if (style.includes('margin-left: 0') && style.includes('margin-right: auto')) {
                            return 'left';
                        }
                    }

                    // Check the parent container as fallback
                    const parent = element.parentElement;
                    if (parent?.classList.contains('has-text-align-left')) return 'left';
                    if (parent?.classList.contains('has-text-align-center')) return 'center';
                    if (parent?.classList.contains('has-text-align-right')) return 'right';

                    return null;
                },
                renderHTML: (attributes: any) => {
                    if (!attributes.textAlign) return {};
                    return {
                        'data-text-align': attributes.textAlign,
                    };
                },
            },
        };
    },

    addCommands() {
        return {
            setImage:
                (attributes: any) =>
                ({ commands }: any) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: attributes,
                    });
                },
            updateImage:
                (attributes: any) =>
                ({ commands }: any) => {
                    return commands.updateAttributes(this.name, attributes);
                },
            setImageAlign:
                (alignment: 'left' | 'center' | 'right') =>
                ({ commands }: any) => {
                    return commands.updateAttributes('image', { textAlign: alignment });
                },
            detectImageAlign:
                () =>
                ({ editor, state }: any) => {
                    const { selection } = state;

                    // Early return if not in an image
                    if (selection.node?.type.name !== 'image') {
                        return false;
                    }

                    const node = selection.node;
                    const currentAlign = node.attrs.textAlign;

                    // Early return if alignment is already defined
                    if (currentAlign) {
                        return false;
                    }

                    const { $from } = selection;
                    const imgElement = editor.view.nodeDOM($from.pos - 1) as HTMLImageElement;

                    // Early return if element not found
                    if (!imgElement) {
                        return false;
                    }

                    const detectedAlign = detectAlignmentFromStyle(imgElement.style);

                    if (detectedAlign) {
                        return editor.commands.updateAttributes('image', {
                            textAlign: detectedAlign,
                        });
                    }

                    return false;
                },
        };
    },

    renderHTML({ HTMLAttributes }: any) {
        const textAlign = HTMLAttributes.textAlign;
        let style = '';

        if (textAlign === 'left') {
            style = 'margin-left: 0; margin-right: auto;';
        } else if (textAlign === 'center') {
            style = 'margin-left: auto; margin-right: auto;';
        } else if (textAlign === 'right') {
            style = 'margin-left: auto; margin-right: 0;';
        }

        return [
            'img',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: `${this.options.HTMLAttributes?.class || ''} ${HTMLAttributes.class || ''}`.trim(),
                style: style,
                'data-text-align': textAlign,
            }),
        ];
    },

    addNodeView() {
        return ({ node }: any) => {
            const img = document.createElement('img');

            // Apply image attributes
            Object.entries(node.attrs).forEach(([key, value]) => {
                if (key === 'src') {
                    img.src = value as string;
                } else if (key === 'alt') {
                    img.alt = value as string;
                } else if (key === 'title') {
                    img.title = value as string;
                }
            });

            // Apply CSS classes
            img.className = this.options.HTMLAttributes?.class || '';

            // Apply alignment based on textAlign attribute
            const textAlign = node.attrs.textAlign;
            if (textAlign === 'center') {
                img.style.marginLeft = 'auto';
                img.style.marginRight = 'auto';
            } else if (textAlign === 'right') {
                img.style.marginLeft = 'auto';
                img.style.marginRight = '0';
            } else {
                // Default to left alignment (including when textAlign === 'left' or is null/undefined)
                img.style.marginLeft = '0';
                img.style.marginRight = 'auto';
            }

            img.style.display = 'block';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';

            return {
                dom: img,
                update: (updatedNode: any) => {
                    if (updatedNode.type !== node.type) return false;

                    // Update all image attributes
                    Object.entries(updatedNode.attrs).forEach(([key, value]) => {
                        if (key === 'src') {
                            img.src = value as string;
                        } else if (key === 'alt') {
                            img.alt = value as string;
                        } else if (key === 'title') {
                            img.title = value as string;
                        }
                    });

                    // Always update alignment based on the new node
                    const newTextAlign = updatedNode.attrs.textAlign;
                    if (newTextAlign === 'center') {
                        img.style.marginLeft = 'auto';
                        img.style.marginRight = 'auto';
                    } else if (newTextAlign === 'right') {
                        img.style.marginLeft = 'auto';
                        img.style.marginRight = '0';
                    } else {
                        // Default to left alignment (including when newTextAlign === 'left' or is null/undefined)
                        img.style.marginLeft = '0';
                        img.style.marginRight = 'auto';
                    }

                    return true;
                },
            };
        };
    },
});

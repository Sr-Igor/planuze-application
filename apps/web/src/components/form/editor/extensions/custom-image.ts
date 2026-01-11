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
                }
            },
            alt: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('alt'),
                renderHTML: (attributes: any) => {
                    if (!attributes.alt) return {};
                    return { alt: attributes.alt };
                }
            },
            title: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute('title'),
                renderHTML: (attributes: any) => {
                    if (!attributes.title) return {};
                    return { title: attributes.title };
                }
            },
            textAlign: {
                default: null,
                parseHTML: (element: HTMLElement) => {
                    // Primeiro, verificar se a própria imagem tem o atributo data-text-align
                    const dataAlign = element.getAttribute('data-text-align');
                    if (dataAlign) return dataAlign;

                    // Verificar o estilo inline da imagem
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

                    // Verificar o container pai como fallback
                    const parent = element.parentElement;
                    if (parent?.classList.contains('has-text-align-left')) return 'left';
                    if (parent?.classList.contains('has-text-align-center')) return 'center';
                    if (parent?.classList.contains('has-text-align-right')) return 'right';

                    return null;
                },
                renderHTML: (attributes: any) => {
                    if (!attributes.textAlign) return {};
                    return {
                        'data-text-align': attributes.textAlign
                    };
                }
            }
        };
    },

    addCommands() {
        return {
            setImage:
                (attributes: any) =>
                ({ commands }: any) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: attributes
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
                    const { $from } = selection;

                    // Verificar se estamos em uma imagem
                    if (selection.node?.type.name === 'image') {
                        const node = selection.node;
                        const currentAlign = node.attrs.textAlign;

                        // Se não há alinhamento definido, detectar baseado no estilo
                        if (!currentAlign) {
                            const imgElement = editor.view.nodeDOM($from.pos - 1) as HTMLImageElement;
                            if (imgElement) {
                                const style = imgElement.style;
                                let detectedAlign = null;

                                if (style.marginLeft === 'auto' && style.marginRight === 'auto') {
                                    detectedAlign = 'center';
                                } else if (style.marginLeft === 'auto' && style.marginRight === '0px') {
                                    detectedAlign = 'right';
                                } else if (style.marginLeft === '0px' && style.marginRight === 'auto') {
                                    detectedAlign = 'left';
                                }

                                if (detectedAlign) {
                                    return editor.commands.updateAttributes('image', {
                                        textAlign: detectedAlign
                                    });
                                }
                            }
                        }
                    }

                    return false;
                }
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
                'data-text-align': textAlign
            })
        ];
    },

    addNodeView() {
        return ({ node, getPos, editor }: any) => {
            const img = document.createElement('img');

            // Aplicar atributos da imagem
            Object.entries(node.attrs).forEach(([key, value]) => {
                if (key === 'src') {
                    img.src = value as string;
                } else if (key === 'alt') {
                    img.alt = value as string;
                } else if (key === 'title') {
                    img.title = value as string;
                }
            });

            // Aplicar classes CSS
            img.className = this.options.HTMLAttributes?.class || '';

            // Aplicar alinhamento baseado no atributo textAlign
            const textAlign = node.attrs.textAlign;
            if (textAlign === 'center') {
                img.style.marginLeft = 'auto';
                img.style.marginRight = 'auto';
            } else if (textAlign === 'right') {
                img.style.marginLeft = 'auto';
                img.style.marginRight = '0';
            } else if (textAlign === 'left') {
                img.style.marginLeft = '0';
                img.style.marginRight = 'auto';
            } else {
                // Se não há alinhamento definido, usar esquerda como padrão
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

                    // Atualizar todos os atributos da imagem
                    Object.entries(updatedNode.attrs).forEach(([key, value]) => {
                        if (key === 'src') {
                            img.src = value as string;
                        } else if (key === 'alt') {
                            img.alt = value as string;
                        } else if (key === 'title') {
                            img.title = value as string;
                        }
                    });

                    // Sempre atualizar o alinhamento baseado no novo nó
                    const newTextAlign = updatedNode.attrs.textAlign;
                    if (newTextAlign === 'center') {
                        img.style.marginLeft = 'auto';
                        img.style.marginRight = 'auto';
                    } else if (newTextAlign === 'right') {
                        img.style.marginLeft = 'auto';
                        img.style.marginRight = '0';
                    } else if (newTextAlign === 'left') {
                        img.style.marginLeft = '0';
                        img.style.marginRight = 'auto';
                    } else {
                        // Se não há alinhamento definido, usar esquerda como padrão
                        img.style.marginLeft = '0';
                        img.style.marginRight = 'auto';
                    }

                    return true;
                }
            };
        };
    }
});

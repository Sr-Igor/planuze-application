import { toast } from 'sonner';

export const copyToClipboard = async (text: string, t: (key: string) => string): Promise<void> => {
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
    toast.info(t('copied'));
};

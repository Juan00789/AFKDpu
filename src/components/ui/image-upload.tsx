'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Paperclip, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  onImageUploaded: (dataUri: string) => void;
  disabled?: boolean;
}

export const ImageUpload = ({ onImageUploaded, disabled }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: 'Archivo demasiado grande',
          description: 'Por favor, selecciona una imagen de menos de 4MB.',
          variant: 'destructive',
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onImageUploaded(e.target.result);
        }
      };
      reader.onerror = () => {
         toast({
          title: 'Error al leer el archivo',
          description: 'Hubo un problema al procesar tu imagen. Inténtalo de nuevo.',
          variant: 'destructive',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/png, image/jpeg, image/webp, image/gif"
        disabled={disabled}
      />
      <Button variant="outline" onClick={handleButtonClick} disabled={disabled} className="w-full">
        <Paperclip className="mr-2 h-4 w-4" />
        Adjuntar una imagen (Opcional)
      </Button>
    </div>
  );
};

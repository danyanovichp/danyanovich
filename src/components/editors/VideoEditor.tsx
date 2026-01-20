import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Video, ExternalLink, Play } from "lucide-react";
import { useState } from "react";

interface VideoEditorProps {
  videoUrl: string;
  onChange: (url: string) => void;
}

export function VideoEditor({ videoUrl, onChange }: VideoEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;

    // YouTube
    const youtubeMatch = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    // Rutube
    const rutubeMatch = url.match(/rutube\.ru\/video\/([a-zA-Z0-9]+)/);
    if (rutubeMatch) {
      return `https://rutube.ru/play/embed/${rutubeMatch[1]}`;
    }

    // VK Video
    const vkMatch = url.match(/vk\.com\/video(-?\d+)_(\d+)/);
    if (vkMatch) {
      return `https://vk.com/video_ext.php?oid=${vkMatch[1]}&id=${vkMatch[2]}`;
    }

    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);
  const isValidUrl = !!embedUrl;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="h-5 w-5" />
          Видео-обзор
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Ссылка на видео</Label>
          <div className="flex gap-2">
            <Input
              value={videoUrl}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://youtube.com/watch?v=... или https://rutube.ru/video/..."
            />
            {videoUrl && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(videoUrl, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Поддерживаются: YouTube, Rutube, VK Video
          </p>
        </div>

        {videoUrl && (
          <div className="space-y-2">
            {isValidUrl ? (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-600">✓ Ссылка распознана</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    {showPreview ? "Скрыть" : "Превью"}
                  </Button>
                </div>
                {showPreview && (
                  <div className="aspect-video rounded-lg overflow-hidden border">
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      allowFullScreen
                      allow="autoplay; encrypted-media"
                    />
                  </div>
                )}
              </>
            ) : (
              <span className="text-sm text-amber-600">
                ⚠ Формат ссылки не распознан. Проверьте URL.
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

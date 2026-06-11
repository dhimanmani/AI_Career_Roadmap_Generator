import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env';
import { AppError } from '../common/errors/AppError';

let configured = false;

function ensureConfigured(): void {
  if (configured) return;
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) {
    throw new AppError(503, 'File storage not configured', 'STORAGE_UNAVAILABLE');
  }
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  configured = true;
}

export async function uploadEvidence(base64Data: string, folder = 'acrg/evidence'): Promise<string> {
  ensureConfigured();
  const result = await cloudinary.uploader.upload(base64Data, {
    folder,
    resource_type: 'auto',
  });
  return result.secure_url;
}

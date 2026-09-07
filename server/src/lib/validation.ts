import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const videoGenerationSchema = z.object({
  type: z.literal('text').default('text'),
  prompt: z.string().min(1),
  model: z.string().optional().default('default'),
  aspectRatio: z.enum(['16:9', '9:16', '1:1', '4:3']).default('16:9'),
  duration: z.number().min(1).max(60).default(5),
  resolution: z.enum(['720p', '1080p', '4K']).default('1080p'),
});

export const imageToVideoSchema = z.object({
  type: z.literal('image').default('image'),
  imageUrl: z.string(),
  motion: z.enum(['left', 'right', 'up', 'down', 'zoom_in', 'zoom_out', 'pan', 'rotate']),
  motionDescription: z.string().optional(),
  model: z.string().optional().default('default'),
  aspectRatio: z.enum(['16:9', '9:16', '1:1', '4:3']).default('16:9'),
  duration: z.number().min(1).max(60).default(5),
  resolution: z.enum(['720p', '1080p', '4K']).default('1080p'),
});

export const imageGenerationSchema = z.object({
  model: z.string().optional().default('default'),
  prompt: z.string().min(1),
  style: z.enum(['realistic', 'artistic', 'anime', 'photographic', '3d', 'cinematic']).optional(),
  aspectRatio: z.enum(['16:9', '9:16', '1:1', '4:3', '3:4', '9:21']).default('1:1'),
});

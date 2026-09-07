import { Router } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma.js';
import { auth, AuthRequest } from '../middleware/auth.js';
import { videoGenerationSchema, imageToVideoSchema, imageGenerationSchema } from '../lib/validation.js';

const router = Router();

router.use(auth);

// Mock provider — replace with real AI service in production
async function mockProvider(): Promise<string> {
  await new Promise((r) => setTimeout(r, 2000));
  return 'https://example.com/generated-content';
}

router.post('/video', async (req: AuthRequest, res) => {
  try {
    const data = videoGenerationSchema.parse(req.body);
    const generation = await prisma.generation.create({
      data: {
        userId: req.userId!,
        type: 'video',
        prompt: data.prompt,
        status: 'processing',
        modelUsed: data.model,
        aspectRatio: data.aspectRatio,
        duration: data.duration,
        resolution: data.resolution,
      },
    });

    mockProvider()
      .then((videoUrl) =>
        prisma.generation.update({ where: { id: generation.id }, data: { status: 'completed', videoUrl } })
      )
      .catch(() =>
        prisma.generation.update({ where: { id: generation.id }, data: { status: 'failed' } })
      );

    res.json(generation);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: 'Generation failed' });
  }
});

router.post('/video-from-image', async (req: AuthRequest, res) => {
  try {
    const data = imageToVideoSchema.parse(req.body);
    const generation = await prisma.generation.create({
      data: {
        userId: req.userId!,
        type: 'video',
        prompt: data.motionDescription,
        imageUrl: data.imageUrl,
        status: 'processing',
        modelUsed: data.model,
        aspectRatio: data.aspectRatio,
        duration: data.duration,
        resolution: data.resolution,
      },
    });

    mockProvider()
      .then((videoUrl) =>
        prisma.generation.update({ where: { id: generation.id }, data: { status: 'completed', videoUrl } })
      )
      .catch(() =>
        prisma.generation.update({ where: { id: generation.id }, data: { status: 'failed' } })
      );

    res.json(generation);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: 'Generation failed' });
  }
});

router.post('/image', async (req: AuthRequest, res) => {
  try {
    const data = imageGenerationSchema.parse(req.body);
    const generation = await prisma.generation.create({
      data: {
        userId: req.userId!,
        type: 'image',
        prompt: data.prompt,
        status: 'processing',
        modelUsed: data.model,
        aspectRatio: data.aspectRatio,
      },
    });

    mockProvider()
      .then((imageUrl) =>
        prisma.generation.update({ where: { id: generation.id }, data: { status: 'completed', imageUrl } })
      )
      .catch(() =>
        prisma.generation.update({ where: { id: generation.id }, data: { status: 'failed' } })
      );

    res.json(generation);
  } catch (e) {
    if (e instanceof z.ZodError) return res.status(400).json({ error: e.errors });
    res.status(500).json({ error: 'Generation failed' });
  }
});

router.get('/', async (req: AuthRequest, res) => {
  const { filter } = req.query;
  const where: any = { userId: req.userId };
  if (filter === 'video') where.type = 'video';
  else if (filter === 'image') where.type = 'image';
  else if (filter === 'processing') where.status = 'processing';

  const generations = await prisma.generation.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  res.json(generations);
});

router.get('/:id', async (req: AuthRequest, res) => {
  const generation = await prisma.generation.findFirst({
    where: { id: req.params.id, userId: req.userId },
  });
  if (!generation) return res.status(404).json({ error: 'Not found' });
  res.json(generation);
});

export default router;

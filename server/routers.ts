import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getProjects, createProject, updateProject, deleteProject, getSiteContent, updateSiteContent } from "./db";
import { z } from "zod";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  projects: router({
    list: publicProcedure.query(async () => {
      return getProjects();
    }),
    create: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        link: z.string().url(),
        type: z.string(),
        tags: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return createProject(input);
      }),
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        link: z.string().url().optional(),
        type: z.string().optional(),
        tags: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        return updateProject(id, data);
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return deleteProject(input.id);
      }),
  }),

  content: router({
    getAbout: publicProcedure.query(async () => {
      const bio = await getSiteContent('aboutMe');
      const yearsExperience = await getSiteContent('yearsExperience');
      const projectsCount = await getSiteContent('projectsCount');
      const clientsCount = await getSiteContent('clientsCount');
      
      return {
        bio: bio?.value || '',
        yearsExperience: yearsExperience?.value || '5+',
        projectsCount: projectsCount?.value || '50+',
        clientsCount: clientsCount?.value || '30+',
      };
    }),
    getContactLinks: publicProcedure.query(async () => {
      const links = await getSiteContent('contactLinks');
      if (!links) return [];
      try {
        return JSON.parse(links.value);
      } catch {
        return [];
      }
    }),
    updateAbout: protectedProcedure
      .input(z.object({
        bio: z.string(),
        yearsExperience: z.string(),
        projectsCount: z.string(),
        clientsCount: z.string(),
      }))
      .mutation(async ({ input }) => {
        await updateSiteContent('aboutMe', input.bio);
        await updateSiteContent('yearsExperience', input.yearsExperience);
        await updateSiteContent('projectsCount', input.projectsCount);
        await updateSiteContent('clientsCount', input.clientsCount);
        return { success: true };
      }),
    updateContactLinks: protectedProcedure
      .input(z.object({
        links: z.array(z.object({
          label: z.string(),
          url: z.string(),
          icon: z.enum(['email', 'linkedin', 'soundcloud', 'custom']),
        })),
      }))
      .mutation(async ({ input }) => {
        await updateSiteContent('contactLinks', JSON.stringify(input.links));
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;

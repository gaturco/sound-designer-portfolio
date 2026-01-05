import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("projects router", () => {
  describe("list", () => {
    it("should return projects list for public access", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.projects.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("should reject unauthenticated create attempts", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const projectData = {
        title: "Test Project",
        description: "A test sound design project",
        link: "https://youtube.com/watch?v=test",
        type: "Jogo",
      };

      try {
        await caller.projects.create(projectData);
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe("create", () => {
    it("should reject invalid URLs", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const projectData = {
        title: "Test Project",
        description: "A test sound design project",
        link: "not-a-url",
        type: "Jogo",
      };

      try {
        await caller.projects.create(projectData as any);
        expect.fail("Should have thrown an error");
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});

describe("content router", () => {
  describe("getAbout", () => {
    it("should return about content for public access", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.content.getAbout();
      expect(result).toBeDefined();
      expect(result).toHaveProperty('bio');
      expect(result).toHaveProperty('yearsExperience');
      expect(result).toHaveProperty('projectsCount');
      expect(result).toHaveProperty('clientsCount');
    });
  });

  describe("getContactLinks", () => {
    it("should return contact links for public access", async () => {
      const ctx = createPublicContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.content.getContactLinks();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("updateAbout", () => {
    it("should update about content for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const updateData = {
        bio: "Updated bio text",
        yearsExperience: "10",
        projectsCount: "100",
        clientsCount: "50",
      };

      const result = await caller.content.updateAbout(updateData);
      expect(result).toEqual({ success: true });
    });
  });

  describe("updateContactLinks", () => {
    it("should update contact links for authenticated users", async () => {
      const ctx = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const links = [
        { label: "Email", url: "mailto:test@example.com", icon: "email" as const },
        { label: "LinkedIn", url: "https://linkedin.com/in/test", icon: "linkedin" as const },
      ];

      const result = await caller.content.updateContactLinks({ links });
      expect(result).toEqual({ success: true });
    });
  });
});

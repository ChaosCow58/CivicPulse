import prisma from "./prisma";
import { getSession } from "@auth0/nextjs-auth0";

//////////////////////////////////////////////////////
// USER ACTIONS
//////////////////////////////////////////////////////

export async function getOrCreateUser() {
  const session = await getSession();

  if (!session) throw new Error("Unauthorized");

  const auth0Id = session.user.sub;

  let user = await prisma.user.findUnique({
    where: { auth0Id }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        auth0Id,
        email: session.user.email,
        username: session.user.nickname || "Citizen"
      }
    });
  }

  return user;
}

//////////////////////////////////////////////////////
// REPORT ACTIONS
//////////////////////////////////////////////////////

export async function createReport(data) {
  const user = await getOrCreateUser();

  const report = await prisma.report.create({
    data: {
      type: data.type,
      severity: Number(data.severity),
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      userId: user.id
    }
  });

  // increase reputation slightly
  await prisma.user.update({
    where: { id: user.id },
    data: {
      reputation: { increment: data.severity }
    }
  });

  return report;
}

export async function getReports() {
  return prisma.report.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" }
  });
}

//////////////////////////////////////////////////////
// HOTSPOT ACTIONS
//////////////////////////////////////////////////////

export async function saveHotspots(hotspots) {
  // clear old hotspots
  await prisma.hotspot.deleteMany();

  const created = await Promise.all(
    hotspots.map(h =>
      prisma.hotspot.create({
        data: {
          centerLat: h.centerLat,
          centerLng: h.centerLng,
          reportCount: h.reportCount,
          avgSeverity: h.avgSeverity,
          radiusMeters: h.radiusMeters
        }
      })
    )
  );

  return created;
}

export async function getHotspots() {
  return prisma.hotspot.findMany();
}

//////////////////////////////////////////////////////
// ANALYTICS (regression-js)
//////////////////////////////////////////////////////

export async function saveAnalytics(metric, value, metadata = null) {
  return prisma.analytics.upsert({
    where: { metric },
    update: {
      value,
      metadata
    },
    create: {
      metric,
      value,
      metadata
    }
  });
}

export async function getAnalytics() {
  return prisma.analytics.findMany();
}
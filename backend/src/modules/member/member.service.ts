import prisma from '../../config/db';

// ========================================
// GET MEMBER PROFILE
// ========================================
export const getMemberProfile = async (memberId: string) => {
  const member = await prisma.member.findUnique({
    where: { member_id: memberId },
    select: {
      member_id: true,
      name: true,
      email: true,
      age: true,
      gender: true,
      phone: true,
      join_date: true,
      status: true
    }
  });

  if (!member) {
    throw new Error('Member not found');
  }

  return member;
};

// ========================================
// GET MEMBER WORKOUT PLAN
// ========================================
export const getMemberWorkoutPlan = async (memberId: string) => {
  const workoutPlans = await prisma.workoutPlan.findMany({
    where: { member_id: memberId },
    include: {
      trainer: {
        select: {
          trainer_id: true,
          name: true,
          email: true,
          specialization: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return workoutPlans;
};

// ========================================
// GET MEMBER DIET PLAN
// ========================================
export const getMemberDietPlan = async (memberId: string) => {
  const dietPlans = await prisma.dietPlan.findMany({
    where: { member_id: memberId },
    include: {
      trainer: {
        select: {
          trainer_id: true,
          name: true,
          email: true,
          specialization: true
        }
      }
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  return dietPlans;
};

// ========================================
// GET MEMBER ATTENDANCE
// ========================================
export const getMemberAttendance = async (memberId: string) => {
  const attendance = await prisma.attendance.findMany({
    where: { member_id: memberId },
    orderBy: {
      date: 'desc'
    }
  });

  return attendance;
};

// ========================================
// GET MEMBER PROGRESS
// ========================================
export const getMemberProgress = async (memberId: string) => {
  const progress = await prisma.progress.findMany({
    where: { member_id: memberId },
    include: {
      trainer: {
        select: {
          trainer_id: true,
          name: true,
          email: true,
          specialization: true
        }
      }
    },
    orderBy: {
      updated_at: 'desc'
    }
  });

  return progress;
};

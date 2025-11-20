import prisma from '../../config/db';

// ========================================
// GET ALL MEMBERS (TRAINER VIEW)
// ========================================
export const getAllMembers = async () => {
  const members = await prisma.member.findMany({
    select: {
      member_id: true,
      name: true,
      email: true,
      age: true,
      gender: true,
      phone: true,
      join_date: true,
      status: true
    },
    orderBy: {
      join_date: 'desc'
    }
  });

  return members;
};

// ========================================
// UPDATE MEMBER WORKOUT PLAN
// ========================================
export const updateMemberWorkoutPlan = async (
  memberId: string,
  trainerId: string,
  planDetails: string
) => {
  // Verify member exists
  const member = await prisma.member.findUnique({
    where: { member_id: memberId }
  });

  if (!member) {
    throw new Error('Member not found');
  }

  // Create new workout plan
  const workoutPlan = await prisma.workoutPlan.create({
    data: {
      member_id: memberId,
      trainer_id: trainerId,
      plan_details: planDetails
    },
    include: {
      member: {
        select: {
          member_id: true,
          name: true,
          email: true
        }
      },
      trainer: {
        select: {
          trainer_id: true,
          name: true,
          specialization: true
        }
      }
    }
  });

  return workoutPlan;
};

// ========================================
// UPDATE MEMBER DIET PLAN
// ========================================
export const updateMemberDietPlan = async (
  memberId: string,
  trainerId: string,
  dietDetails: string
) => {
  // Verify member exists
  const member = await prisma.member.findUnique({
    where: { member_id: memberId }
  });

  if (!member) {
    throw new Error('Member not found');
  }

  // Create new diet plan
  const dietPlan = await prisma.dietPlan.create({
    data: {
      member_id: memberId,
      trainer_id: trainerId,
      diet_details: dietDetails
    },
    include: {
      member: {
        select: {
          member_id: true,
          name: true,
          email: true
        }
      },
      trainer: {
        select: {
          trainer_id: true,
          name: true,
          specialization: true
        }
      }
    }
  });

  return dietPlan;
};

// ========================================
// UPDATE MEMBER PROGRESS
// ========================================
export const updateMemberProgress = async (
  memberId: string,
  trainerId: string,
  data: {
    weight: number;
    body_fat: number;
    muscle_mass: number;
    notes?: string;
  }
) => {
  // Verify member exists
  const member = await prisma.member.findUnique({
    where: { member_id: memberId }
  });

  if (!member) {
    throw new Error('Member not found');
  }

  // Create progress record
  const progress = await prisma.progress.create({
    data: {
      member_id: memberId,
      trainer_id: trainerId,
      weight: data.weight,
      body_fat: data.body_fat,
      muscle_mass: data.muscle_mass,
      notes: data.notes || ''
    },
    include: {
      member: {
        select: {
          member_id: true,
          name: true,
          email: true
        }
      },
      trainer: {
        select: {
          trainer_id: true,
          name: true,
          specialization: true
        }
      }
    }
  });

  return progress;
};

// ========================================
// CREATE MEMBER ATTENDANCE
// ========================================
export const createMemberAttendance = async (
  memberId: string,
  status: string
) => {
  // Verify member exists
  const member = await prisma.member.findUnique({
    where: { member_id: memberId }
  });

  if (!member) {
    throw new Error('Member not found');
  }

  // Create attendance record
  const attendance = await prisma.attendance.create({
    data: {
      member_id: memberId,
      status,
      date: new Date()
    },
    include: {
      member: {
        select: {
          member_id: true,
          name: true,
          email: true
        }
      }
    }
  });

  return attendance;
};

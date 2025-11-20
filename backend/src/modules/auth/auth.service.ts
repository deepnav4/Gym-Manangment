import prisma from '../../config/db';
import { hashPassword, comparePassword } from '../../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../../utils/jwt';

// ========================================
// MEMBER SIGNUP
// ========================================
export const memberSignup = async (data: {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
}) => {
  // Check if member already exists
  const existingMember = await prisma.member.findUnique({
    where: { email: data.email }
  });

  if (existingMember) {
    throw new Error('Member with this email already exists');
  }

  // Hash password
  const hashedPassword = await hashPassword(data.password);

  // Create new member
  const member = await prisma.member.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      status: 'active'
    },
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

  // Generate tokens
  const accessToken = generateAccessToken({
    id: member.member_id,
    email: member.email,
    role: 'member'
  });

  const refreshToken = generateRefreshToken({
    id: member.member_id,
    email: member.email,
    role: 'member'
  });

  return {
    member,
    accessToken,
    refreshToken
  };
};

// ========================================
// MEMBER LOGIN
// ========================================
export const memberLogin = async (email: string, password: string) => {
  // Find member by email
  const member = await prisma.member.findUnique({
    where: { email }
  });

  if (!member) {
    throw new Error('Invalid email or password');
  }

  // Check if member is active
  if (member.status !== 'active') {
    throw new Error('Account is inactive. Please contact administrator');
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, member.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    id: member.member_id,
    email: member.email,
    role: 'member'
  });

  const refreshToken = generateRefreshToken({
    id: member.member_id,
    email: member.email,
    role: 'member'
  });

  // Return member without password
  const { password: _, ...memberWithoutPassword } = member;

  return {
    member: memberWithoutPassword,
    accessToken,
    refreshToken
  };
};

// ========================================
// TRAINER LOGIN
// ========================================
export const trainerLogin = async (email: string, password: string) => {
  // Find trainer by email
  const trainer = await prisma.trainer.findUnique({
    where: { email }
  });

  if (!trainer) {
    throw new Error('Invalid email or password');
  }

  // Verify password
  const isPasswordValid = await comparePassword(password, trainer.password);

  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  // Generate tokens
  const accessToken = generateAccessToken({
    id: trainer.trainer_id,
    email: trainer.email,
    role: 'trainer'
  });

  const refreshToken = generateRefreshToken({
    id: trainer.trainer_id,
    email: trainer.email,
    role: 'trainer'
  });

  // Return trainer without password
  const { password: _, ...trainerWithoutPassword } = trainer;

  return {
    trainer: trainerWithoutPassword,
    accessToken,
    refreshToken
  };
};

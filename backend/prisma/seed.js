const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../src/utils/password');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create departments
  console.log('📚 Creating departments...');
  const departments = await Promise.all([
    prisma.department.upsert({
      where: { code: 'CSE' },
      update: {},
      create: {
        name: 'Computer Science and Engineering',
        code: 'CSE',
        description: 'Department of Computer Science and Engineering'
      }
    }),
    prisma.department.upsert({
      where: { code: 'ECE' },
      update: {},
      create: {
        name: 'Electronics and Communication Engineering',
        code: 'ECE',
        description: 'Department of Electronics and Communication Engineering'
      }
    }),
    prisma.department.upsert({
      where: { code: 'MECH' },
      update: {},
      create: {
        name: 'Mechanical Engineering',
        code: 'MECH',
        description: 'Department of Mechanical Engineering'
      }
    }),
    prisma.department.upsert({
      where: { code: 'CIVIL' },
      update: {},
      create: {
        name: 'Civil Engineering',
        code: 'CIVIL',
        description: 'Department of Civil Engineering'
      }
    })
  ]);

  console.log(`✅ Created ${departments.length} departments`);

  // Create subjects
  console.log('📖 Creating subjects...');
  const subjects = await Promise.all([
    // CSE Subjects
    prisma.subject.upsert({
      where: { code: 'CSE101' },
      update: {},
      create: {
        name: 'Programming Fundamentals',
        code: 'CSE101',
        credits: 4,
        semester: 1,
        departmentId: departments[0].id
      }
    }),
    prisma.subject.upsert({
      where: { code: 'CSE201' },
      update: {},
      create: {
        name: 'Data Structures and Algorithms',
        code: 'CSE201',
        credits: 4,
        semester: 3,
        departmentId: departments[0].id
      }
    }),
    prisma.subject.upsert({
      where: { code: 'CSE301' },
      update: {},
      create: {
        name: 'Database Management Systems',
        code: 'CSE301',
        credits: 3,
        semester: 5,
        departmentId: departments[0].id
      }
    }),
    // ECE Subjects
    prisma.subject.upsert({
      where: { code: 'ECE101' },
      update: {},
      create: {
        name: 'Circuit Analysis',
        code: 'ECE101',
        credits: 4,
        semester: 1,
        departmentId: departments[1].id
      }
    }),
    prisma.subject.upsert({
      where: { code: 'ECE201' },
      update: {},
      create: {
        name: 'Digital Electronics',
        code: 'ECE201',
        credits: 3,
        semester: 3,
        departmentId: departments[1].id
      }
    })
  ]);

  console.log(`✅ Created ${subjects.length} subjects`);

  // Create admin user
  console.log('👤 Creating admin user...');
  const adminPassword = await hashPassword('Admin@123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@faculty.edu' },
    update: {},
    create: {
      email: 'admin@faculty.edu',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
      phoneNumber: '+1234567890'
    }
  });

  console.log(`✅ Created admin user: ${admin.email}`);

  // Create HOD user
  console.log('👨‍💼 Creating HOD user...');
  const hodPassword = await hashPassword('Hod@123');
  const hod = await prisma.user.upsert({
    where: { email: 'hod.cse@faculty.edu' },
    update: {},
    create: {
      email: 'hod.cse@faculty.edu',
      password: hodPassword,
      firstName: 'John',
      lastName: 'Smith',
      role: 'HOD',
      phoneNumber: '+1234567891',
      departmentId: departments[0].id
    }
  });

  console.log(`✅ Created HOD user: ${hod.email}`);

  // Create faculty users
  console.log('👨‍🏫 Creating faculty users...');
  const facultyPassword = await hashPassword('Faculty@123');
  
  const faculty1 = await prisma.user.upsert({
    where: { email: 'faculty1@faculty.edu' },
    update: {},
    create: {
      email: 'faculty1@faculty.edu',
      password: facultyPassword,
      firstName: 'Alice',
      lastName: 'Johnson',
      role: 'FACULTY',
      phoneNumber: '+1234567892',
      departmentId: departments[0].id
    }
  });

  const faculty2 = await prisma.user.upsert({
    where: { email: 'faculty2@faculty.edu' },
    update: {},
    create: {
      email: 'faculty2@faculty.edu',
      password: facultyPassword,
      firstName: 'Bob',
      lastName: 'Wilson',
      role: 'FACULTY',
      phoneNumber: '+1234567893',
      departmentId: departments[0].id
    }
  });

  // Create leave balances for faculty
  const currentYear = new Date().getFullYear();
  await Promise.all([
    prisma.leaveBalance.upsert({
      where: {
        userId_year: {
          userId: faculty1.id,
          year: currentYear
        }
      },
      update: {},
      create: {
        userId: faculty1.id,
        year: currentYear
      }
    }),
    prisma.leaveBalance.upsert({
      where: {
        userId_year: {
          userId: faculty2.id,
          year: currentYear
        }
      },
      update: {},
      create: {
        userId: faculty2.id,
        year: currentYear
      }
    })
  ]);

  // Assign subjects to faculty
  await Promise.all([
    prisma.userSubject.upsert({
      where: {
        userId_subjectId: {
          userId: faculty1.id,
          subjectId: subjects[0].id
        }
      },
      update: {},
      create: {
        userId: faculty1.id,
        subjectId: subjects[0].id
      }
    }),
    prisma.userSubject.upsert({
      where: {
        userId_subjectId: {
          userId: faculty1.id,
          subjectId: subjects[1].id
        }
      },
      update: {},
      create: {
        userId: faculty1.id,
        subjectId: subjects[1].id
      }
    }),
    prisma.userSubject.upsert({
      where: {
        userId_subjectId: {
          userId: faculty2.id,
          subjectId: subjects[2].id
        }
      },
      update: {},
      create: {
        userId: faculty2.id,
        subjectId: subjects[2].id
      }
    })
  ]);

  console.log(`✅ Created faculty users and assigned subjects`);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📋 Test Accounts Created:');
  console.log('👑 Admin: admin@faculty.edu (password: Admin@123)');
  console.log('👨‍💼 HOD: hod.cse@faculty.edu (password: Hod@123)');
  console.log('👨‍🏫 Faculty: faculty1@faculty.edu (password: Faculty@123)');
  console.log('👩‍🏫 Faculty: faculty2@faculty.edu (password: Faculty@123)');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

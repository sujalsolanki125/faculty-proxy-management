// Mock user data
export const mockUsers = [
  {
    id: '1',
    email: 'admin@faculty.edu',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'ADMIN',
    department: null,
    phoneNumber: '+1234567890',
    isActive: true
  },
  {
    id: '2',
    email: 'hod.cse@faculty.edu',
    firstName: 'Dr. John',
    lastName: 'Smith',
    role: 'HOD',
    department: {
      id: 'dept1',
      name: 'Computer Science and Engineering',
      code: 'CSE'
    },
    phoneNumber: '+1234567891',
    isActive: true
  },
  {
    id: '3',
    email: 'alice.faculty@faculty.edu',
    firstName: 'Alice',
    lastName: 'Johnson',
    role: 'FACULTY',
    department: {
      id: 'dept1',
      name: 'Computer Science and Engineering',
      code: 'CSE'
    },
    phoneNumber: '+1234567892',
    subjects: ['Programming Fundamentals', 'Data Structures'],
    leaveBalance: {
      casualLeaves: 12,
      sickLeaves: 12,
      earnedLeaves: 30,
      usedCasualLeaves: 3,
      usedSickLeaves: 1,
      usedEarnedLeaves: 5
    },
    isActive: true
  },
  {
    id: '4',
    email: 'bob.faculty@faculty.edu',
    firstName: 'Bob',
    lastName: 'Wilson',
    role: 'FACULTY',
    department: {
      id: 'dept1',
      name: 'Computer Science and Engineering',
      code: 'CSE'
    },
    phoneNumber: '+1234567893',
    subjects: ['Database Systems', 'Web Development'],
    leaveBalance: {
      casualLeaves: 12,
      sickLeaves: 12,
      earnedLeaves: 30,
      usedCasualLeaves: 2,
      usedSickLeaves: 0,
      usedEarnedLeaves: 3
    },
    isActive: true
  }
]

// Mock departments
export const mockDepartments = [
  {
    id: 'dept1',
    name: 'Computer Science and Engineering',
    code: 'CSE',
    hodId: '2'
  },
  {
    id: 'dept2',
    name: 'Electronics and Communication Engineering',
    code: 'ECE',
    hodId: null
  }
]

// Mock subjects
export const mockSubjects = [
  {
    id: 'sub1',
    name: 'Programming Fundamentals',
    code: 'CSE101',
    departmentId: 'dept1',
    credits: 4
  },
  {
    id: 'sub2',
    name: 'Data Structures',
    code: 'CSE201',
    departmentId: 'dept1',
    credits: 4
  },
  {
    id: 'sub3',
    name: 'Database Systems',
    code: 'CSE301',
    departmentId: 'dept1',
    credits: 3
  },
  {
    id: 'sub4',
    name: 'Web Development',
    code: 'CSE401',
    departmentId: 'dept1',
    credits: 3
  }
]

// Mock timetable data
export const mockTimetable = [
  {
    id: '1',
    dayOfWeek: 1, // Monday
    lectureSlot: 1,
    startTime: '09:00',
    endTime: '10:00',
    facultyId: '3',
    subjectId: 'sub1',
    room: 'Room 101',
    faculty: mockUsers[2],
    subject: mockSubjects[0]
  },
  {
    id: '2',
    dayOfWeek: 1, // Monday
    lectureSlot: 2,
    startTime: '10:00',
    endTime: '11:00',
    facultyId: '4',
    subjectId: 'sub3',
    room: 'Room 102',
    faculty: mockUsers[3],
    subject: mockSubjects[2]
  },
  // Add more timetable slots...
]

// Mock proxy requests
export const mockProxyRequests = [
  {
    id: '1',
    date: '2025-08-25',
    lectureSlot: 1,
    reason: 'Medical appointment',
    status: 'PENDING',
    requestedAt: '2025-08-24T08:30:00Z',
    requestingFaculty: mockUsers[2],
    subject: mockSubjects[0],
    proxyFaculty: null,
    hodApprover: null
  },
  {
    id: '2',
    date: '2025-08-23',
    lectureSlot: 2,
    reason: 'Conference attendance',
    status: 'PROXY_ACCEPTED',
    requestedAt: '2025-08-22T14:20:00Z',
    respondedAt: '2025-08-22T15:30:00Z',
    requestingFaculty: mockUsers[3],
    subject: mockSubjects[2],
    proxyFaculty: mockUsers[2],
    hodApprover: null
  },
  {
    id: '3',
    date: '2025-08-20',
    lectureSlot: 3,
    reason: 'Family emergency',
    status: 'HOD_APPROVED',
    requestedAt: '2025-08-19T09:15:00Z',
    respondedAt: '2025-08-19T10:00:00Z',
    hodApprovedAt: '2025-08-19T11:30:00Z',
    requestingFaculty: mockUsers[2],
    subject: mockSubjects[1],
    proxyFaculty: mockUsers[3],
    hodApprover: mockUsers[1]
  }
]

// Mock notifications
export const mockNotifications = [
  {
    id: '1',
    title: 'Proxy Request Accepted',
    message: 'Bob Wilson accepted your proxy request for Database Systems',
    type: 'SUCCESS',
    isRead: false,
    createdAt: '2025-08-24T10:30:00Z'
  },
  {
    id: '2',
    title: 'New Proxy Request',
    message: 'Alice Johnson requested a proxy for Programming Fundamentals',
    type: 'INFO',
    isRead: false,
    createdAt: '2025-08-24T09:15:00Z'
  },
  {
    id: '3',
    title: 'HOD Approval Required',
    message: 'Proxy request needs your approval',
    type: 'WARNING',
    isRead: true,
    createdAt: '2025-08-24T08:45:00Z'
  }
]

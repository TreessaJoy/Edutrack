import { Student, Course, PlacementJob, Enrollment, JobApplication, NotificationItem } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std_01',
    rollNo: '2023CSB1042',
    fullName: 'Maya Sharma',
    email: 'maya.sharma@edutrack.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science & Engineering',
    semester: 7,
    cgpa: 8.85,
    graduationYear: 2024,
    bio: 'Passionate about distributed backend systems, microservices, and machine learning. Looking for software engineering and cloud roles.',
    skills: ['Python', 'Django REST', 'React.js', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript', 'Data Structures & Algorithms'],
    certifications: [
      'AWS Certified Cloud Practitioner',
      'Meta Frontend Developer Professional Certificate',
      'DeepLearning.AI Machine Learning Specialization'
    ],
    resumeUrl: 'https://edutrack.edu/resumes/maya_sharma_2024.pdf',
    linkedinUrl: 'https://linkedin.com/in/maya-sharma-tech',
    githubUrl: 'https://github.com/mayasharma-dev',
    placementStatus: 'In Process',
    avatar: '/src/assets/images/avatar_student_default_1793378514853.jpg'
  },
  {
    id: 'std_02',
    rollNo: '2023CSB1088',
    fullName: 'Rohan Verma',
    email: 'rohan.verma@edutrack.edu',
    phone: '+91 98111 22334',
    department: 'Electronics & Communication',
    semester: 7,
    cgpa: 7.65,
    graduationYear: 2024,
    bio: 'Electronics enthusiast transitioning to embedded systems, IoT architecture, and high-performance backend pipelines.',
    skills: ['C++', 'Python', 'Embedded Systems', 'RTOS', 'Linux Kernel', 'Computer Networks'],
    certifications: ['Arm Embedded Architecture Certificate'],
    resumeUrl: 'https://edutrack.edu/resumes/rohan_verma_2024.pdf',
    linkedinUrl: 'https://linkedin.com/in/rohanverma-ece',
    githubUrl: 'https://github.com/rohan-verma',
    placementStatus: 'In Process',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_03',
    rollNo: '2023AIDS1015',
    fullName: 'Priya Nair',
    email: 'priya.nair@edutrack.edu',
    phone: '+91 99887 76655',
    department: 'Artificial Intelligence & Data Science',
    semester: 7,
    cgpa: 9.42,
    graduationYear: 2024,
    bio: 'Machine learning practitioner with 2 IEEE research publications in computer vision and LLM fine-tuning. Placed at Microsoft.',
    skills: ['PyTorch', 'TensorFlow', 'Python', 'NLP', 'Computer Vision', 'LangChain', 'FastAPI'],
    certifications: ['Google Cloud Professional Data Engineer', 'Stanford CS229 ML Certificate'],
    resumeUrl: 'https://edutrack.edu/resumes/priya_nair_2024.pdf',
    linkedinUrl: 'https://linkedin.com/in/priyanair-ai',
    githubUrl: 'https://github.com/priyanair-ml',
    placementStatus: 'Placed',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_04',
    rollNo: '2023IT1029',
    fullName: 'Ananya Patel',
    email: 'ananya.patel@edutrack.edu',
    phone: '+91 97766 55443',
    department: 'Information Technology',
    semester: 7,
    cgpa: 8.20,
    graduationYear: 2024,
    bio: 'Full-stack developer focused on React, Node.js microservices, and GraphQL APIs with keen eye for responsive UI/UX.',
    skills: ['React', 'Node.js', 'Next.js', 'MongoDB', 'Tailwind CSS', 'GraphQL', 'Jest'],
    certifications: ['AWS Certified Developer Associate'],
    resumeUrl: 'https://edutrack.edu/resumes/ananya_patel.pdf',
    linkedinUrl: 'https://linkedin.com/in/ananya-patel',
    githubUrl: 'https://github.com/ananyapatel',
    placementStatus: 'In Process',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_05',
    rollNo: '2023CSB1102',
    fullName: 'Karthik Iyer',
    email: 'karthik.iyer@edutrack.edu',
    phone: '+91 96554 33221',
    department: 'Computer Science & Engineering',
    semester: 7,
    cgpa: 7.30,
    graduationYear: 2024,
    bio: 'DevOps and system administration enthusiast, passionate about CI/CD pipelines, Kubernetes orchestration, and site reliability.',
    skills: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'Prometheus', 'Bash', 'Go'],
    certifications: ['Certified Kubernetes Administrator (CKA)'],
    resumeUrl: 'https://edutrack.edu/resumes/karthik_iyer.pdf',
    linkedinUrl: 'https://linkedin.com/in/karthik-iyer',
    githubUrl: 'https://github.com/karthik-infra',
    placementStatus: 'Unplaced',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'std_06',
    rollNo: '2023AIDS1050',
    fullName: 'Aditya Kulkarni',
    email: 'aditya.kulkarni@edutrack.edu',
    phone: '+91 91234 56789',
    department: 'Artificial Intelligence & Data Science',
    semester: 7,
    cgpa: 8.90,
    graduationYear: 2024,
    bio: 'Specialist in reinforcement learning and algorithmic trading systems. Active competitive programmer (LeetCode Guardian).',
    skills: ['Python', 'C++', 'Data Science', 'PyTorch', 'Algorithms', 'SQL'],
    certifications: ['TensorFlow Developer Certificate'],
    resumeUrl: 'https://edutrack.edu/resumes/aditya_kulkarni.pdf',
    linkedinUrl: 'https://linkedin.com/in/adityakulkarni',
    githubUrl: 'https://github.com/aditya-k',
    placementStatus: 'Placed',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'crs_01',
    code: 'CS401',
    title: 'Distributed Systems & Cloud Architecture',
    category: 'Cloud Computing',
    department: 'Computer Science & Engineering',
    instructor: {
      name: 'Dr. Vikram Malhotra',
      role: 'Professor & Head of Cloud Lab',
      email: 'v.malhotra@edutrack.edu',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    },
    credits: 4,
    durationWeeks: 12,
    difficulty: 'Advanced',
    rating: 4.8,
    enrolledCount: 142,
    description: 'Master the architectural foundations of modern internet-scale software systems. Covers consensus protocols (Raft, Paxos), CAP theorem, distributed storage, event-driven architectures, Kafka pipelines, and fault-tolerant deployment in multi-region cloud infrastructures.',
    prerequisites: ['Operating Systems', 'Computer Networks', 'Data Structures & Algorithms'],
    coverImage: '/src/assets/images/course_cloud_computing_1793378513238.jpg',
    syllabus: [
      {
        id: 'mod_101',
        title: 'Module 1: Foundations of Distributed Systems',
        order: 1,
        lessons: [
          {
            id: 'les_101_1',
            title: 'Network Partitions, Clock Synchronization & Lamport Timestamps',
            type: 'reading',
            durationMin: 25,
            content: `Distributed computing introduces challenges not present in monolithic single-core systems. Communication across a physical network is asynchronous and prone to latency variations, packet drops, and network partitions.

Key Principles:
1. Lamport Clocks: Provide partial ordering of events across nodes without relying on synchronized physical clocks.
2. Vector Clocks: Allow detection of concurrent modifications and causal relationships between states.
3. Network Partitions: When a network splits into disconnected subgraphs, nodes must decide whether to favor availability or consistency (The CAP Theorem).`
          },
          {
            id: 'les_101_2',
            title: 'Checkpoint: Consensus and Consistency Models Quiz',
            type: 'quiz',
            durationMin: 15,
            content: 'Test your understanding of distributed consensus, CAP theorem trade-offs, and clock synchronization.',
            quiz: [
              {
                id: 'q1',
                question: 'Under network partitioning, what does the CAP theorem dictate a distributed system must choose between?',
                options: ['Consistency and Availability', 'Concurrency and Persistence', 'Throughput and Low Latency', 'Fault Tolerance and Encryption'],
                correctIndex: 0,
                explanation: 'The CAP theorem states that under a network partition (P), a distributed system can either guarantee Consistency (C) or Availability (A), but cannot satisfy both simultaneously.'
              },
              {
                id: 'q1_2',
                question: 'Which consensus protocol uses leader election and replicated state machine logs with terms?',
                options: ['Raft', 'Two-Phase Commit', 'Chandy-Lamport', 'Gossip Protocol'],
                correctIndex: 0,
                explanation: 'Raft divides consensus into leader election, log replication, and safety guarantees.'
              }
            ]
          },
          {
            id: 'les_101_3',
            title: 'Distributed Log Replication Hands-on Assignment',
            type: 'assignment',
            durationMin: 45,
            content: 'Architectural case study assignment on designing an idempotent, fault-tolerant message queue.',
            assignmentPrompt: 'Design a high-throughput message ingestion pipeline using Apache Kafka partitioned topics with at-least-once delivery guarantees and an idempotent consumer mechanism.'
          }
        ]
      },
      {
        id: 'mod_102',
        title: 'Module 2: Microservices & Cloud-Native Scaling',
        order: 2,
        lessons: [
          {
            id: 'les_102_1',
            title: 'Service Meshes, Circuit Breakers & Observability',
            type: 'reading',
            durationMin: 30,
            content: `In microservice architectures, cascading failures can bring down entire platforms. Circuit breakers (such as Resilience4j or Envoy filters) prevent repeated doomed calls to failing downstream dependencies.

Observability Pillars:
- Metrics (Prometheus): Numerical time-series data for CPU, memory, request rates.
- Traces (OpenTelemetry, Jaeger): Distributed context propagation across microservice RPC hops.
- Structured Logs: Correlated via trace IDs to reconstruct exact user journey execution.`
          },
          {
            id: 'les_102_2',
            title: 'Architecting Kubernetes Autoscaling & Pod Anti-Affinity',
            type: 'reading',
            durationMin: 20,
            content: 'How Kubernetes Horizontal Pod Autoscaler (HPA) interacts with cluster autoscalers and zone redundancy.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_02',
    code: 'AI302',
    title: 'Applied Machine Learning & Deep Neural Networks',
    category: 'AI & Machine Learning',
    department: 'Artificial Intelligence & Data Science',
    instructor: {
      name: 'Dr. Sunita Rao',
      role: 'Director of AI Research Institute',
      email: 's.rao@edutrack.edu',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    credits: 4,
    durationWeeks: 10,
    difficulty: 'Intermediate',
    rating: 4.9,
    enrolledCount: 215,
    description: 'Comprehensive study of modern predictive modeling, gradient-based optimization, convolutional architectures for vision, transformers for sequence analysis, and real-world deployment of ML inference pipelines.',
    prerequisites: ['Linear Algebra', 'Probability & Statistics', 'Python Programming'],
    coverImage: '/src/assets/images/course_ai_machinelearning_1793378514837.jpg',
    syllabus: [
      {
        id: 'mod_201',
        title: 'Module 1: Supervised Learning & Gradient Optimization',
        order: 1,
        lessons: [
          {
            id: 'les_201_1',
            title: 'Loss Formulations, Regularization (L1/L2), and Adam Optimizer',
            type: 'reading',
            durationMin: 25,
            content: `Deep learning models optimize empirical risk using gradient descent variants.

Key Concepts:
- Adam Optimizer: Combines AdaGrad (adaptive learning rates per parameter) and RMSprop (exponentially decaying average of past squared gradients).
- L2 Regularization (Weight Decay): Penalizes large weights to mitigate overfitting and improve generalization on unseen test distributions.`
          },
          {
            id: 'les_201_2',
            title: 'Interactive Quiz: Backpropagation & Optimization Dynamics',
            type: 'quiz',
            durationMin: 15,
            content: 'Test your understanding of vanishing gradients, backpropagation, and optimization algorithms.',
            quiz: [
              {
                id: 'q_ai_1',
                question: 'Which activation function is most effective in combating the vanishing gradient problem in deep networks?',
                options: ['ReLU (Rectified Linear Unit)', 'Sigmoid', 'Hyperbolic Tangent (Tanh)', 'Step Function'],
                correctIndex: 0,
                explanation: 'ReLU maintains a constant derivative of 1 for all positive inputs, allowing gradient signals to flow through deep layers without exponential attenuation.'
              },
              {
                id: 'q_ai_2',
                question: 'What is the purpose of batch normalization during neural network training?',
                options: ['Reduces internal covariate shift and stabilizes layer activations', 'Encrypts model weights during training', 'Compresses images before passing to convolutions', 'Guarantees 100% training accuracy'],
                correctIndex: 0,
                explanation: 'Batch normalization standardizes layer inputs per mini-batch, smoothing the optimization landscape and speeding up convergence.'
              }
            ]
          }
        ]
      },
      {
        id: 'mod_202',
        title: 'Module 2: Transformers & Attention Mechanisms',
        order: 2,
        lessons: [
          {
            id: 'les_202_1',
            title: 'Scaled Dot-Product Attention & Multi-Head Self Attention',
            type: 'reading',
            durationMin: 30,
            content: `The Transformer architecture replaces recurrence with self-attention. The core formula:
Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V

This allows tokens in a sequence to attend to all other positions in parallel, drastically reducing training time on GPU accelerators.`
          }
        ]
      }
    ]
  },
  {
    id: 'crs_03',
    code: 'CS305',
    title: 'Full-Stack Web Development with React & Django REST',
    category: 'Full-Stack',
    department: 'Computer Science & Engineering',
    instructor: {
      name: 'Prof. Arvind Nambiar',
      role: 'Lead Architect, Software Systems',
      email: 'a.nambiar@edutrack.edu',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    credits: 3,
    durationWeeks: 8,
    difficulty: 'Intermediate',
    rating: 4.7,
    enrolledCount: 189,
    description: 'Build enterprise-grade full-stack web applications. Learn RESTful API design with Python & Django REST Framework, relational schema modeling with MySQL/PostgreSQL, JWT authentication, and interactive React client interfaces.',
    prerequisites: ['Basic Python', 'HTML/CSS/JavaScript'],
    coverImage: '/src/assets/images/edutrack_hero_campus_1793378513176.jpg',
    syllabus: [
      {
        id: 'mod_301',
        title: 'Module 1: Backend Architecture with Django REST Framework',
        order: 1,
        lessons: [
          {
            id: 'les_301_1',
            title: 'Django Models, Serializers & Class-Based APIViews',
            type: 'reading',
            durationMin: 20,
            content: `Django REST Framework (DRF) provides an expressive toolkit for building web APIs.
- ModelSerializer: Automatically inspects Django ORM models and generates validation rules and field mappings.
- ViewSets & Routers: Provide standard CRUD endpoint routes (/students/, /courses/, /enrollments/) with minimal boilerplate.`
          },
          {
            id: 'les_301_2',
            title: 'DRF Authentication & JWT Tokens Checkpoint Quiz',
            type: 'quiz',
            durationMin: 15,
            content: 'Check your knowledge of stateless token authentication and REST conventions.',
            quiz: [
              {
                id: 'q_fs_1',
                question: 'Which HTTP header is typically used to transmit a Bearer JWT token in REST requests?',
                options: ['Authorization', 'Authentication-Token', 'X-JWT-Signature', 'Accept-Encoding'],
                correctIndex: 0,
                explanation: 'Standard Bearer tokens are transmitted in the Authorization header: Authorization: Bearer <token>.'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'crs_04',
    code: 'CS204',
    title: 'Advanced Data Structures & Algorithmic Problem Solving',
    category: 'Full-Stack',
    department: 'Computer Science & Engineering',
    instructor: {
      name: 'Prof. Sneha Deshmukh',
      role: 'Competitive Programming Coach',
      email: 's.deshmukh@edutrack.edu',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
    },
    credits: 4,
    durationWeeks: 10,
    difficulty: 'Advanced',
    rating: 4.9,
    enrolledCount: 298,
    description: 'Essential for technical campus interviews and placement coding assessments. Covers Segment Trees, Fenwick Trees, Disjoint Set Union, Graph Algorithms (Dijkstra, Bellman-Ford, Tarjan), Dynamic Programming, and Bit Manipulation.',
    prerequisites: ['Basic C++/Java/Python', 'Elementary Data Structures'],
    coverImage: '/src/assets/images/course_cloud_computing_1793378513238.jpg',
    syllabus: [
      {
        id: 'mod_401',
        title: 'Module 1: Graphs, Trees & Shortest Path Algorithms',
        order: 1,
        lessons: [
          {
            id: 'les_401_1',
            title: 'Dijkstra with Priority Queues & Bellman-Ford Negative Cycle Detection',
            type: 'reading',
            durationMin: 30,
            content: `Graph search algorithms are standard questions in placement drives at Google, Microsoft, and Amazon.
- Dijkstra: Greedy shortest path algorithm running in O((V + E) log V) with a min-heap.
- Bellman-Ford: Handles negative edge weights and flags negative weight cycles in O(V * E).`
          }
        ]
      }
    ]
  },
  {
    id: 'crs_05',
    code: 'IT309',
    title: 'Enterprise Cybersecurity & Network Defense',
    category: 'Cybersecurity',
    department: 'Information Technology',
    instructor: {
      name: 'Dr. Rajesh Pillai',
      role: 'Cyber Defense Lab Lead',
      email: 'r.pillai@edutrack.edu',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80'
    },
    credits: 3,
    durationWeeks: 8,
    difficulty: 'Intermediate',
    rating: 4.6,
    enrolledCount: 110,
    description: 'Security vulnerabilities (OWASP Top 10), cryptographic protocols (TLS/PKI, AES, RSA), penetration testing methodologies, secure code auditing, and security compliance.',
    prerequisites: ['Computer Networks'],
    coverImage: '/src/assets/images/course_ai_machinelearning_1793378514837.jpg',
    syllabus: [
      {
        id: 'mod_501',
        title: 'Module 1: Web Application Security & OWASP Top 10',
        order: 1,
        lessons: [
          {
            id: 'les_501_1',
            title: 'SQL Injection, Cross-Site Scripting (XSS) & CSRF Defenses',
            type: 'reading',
            durationMin: 25,
            content: 'How parameterized SQL queries and SameSite cookie policies protect web backends.'
          }
        ]
      }
    ]
  },
  {
    id: 'crs_06',
    code: 'BS102',
    title: 'Professional Technical Communication & Interview Etiquette',
    category: 'Soft Skills',
    department: 'Training & Placement Cell',
    instructor: {
      name: 'Dean Meera Sen',
      role: 'Director of Career Services',
      email: 'm.sen@edutrack.edu',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    },
    credits: 2,
    durationWeeks: 6,
    difficulty: 'Beginner',
    rating: 4.8,
    enrolledCount: 340,
    description: 'Master the behavioral aspects of placement interviews: STAR methodology for situational questions, executive presence, resume tailoring, salary negotiation, and group discussion tactics.',
    prerequisites: ['None'],
    coverImage: '/src/assets/images/edutrack_hero_campus_1793378513176.jpg',
    syllabus: [
      {
        id: 'mod_601',
        title: 'Module 1: Behavioral Interviews & STAR Method',
        order: 1,
        lessons: [
          {
            id: 'les_601_1',
            title: 'Structuring Behavioral Answers: Situation, Task, Action, Result',
            type: 'reading',
            durationMin: 20,
            content: 'How to craft compelling stories showcasing leadership, overcoming obstacles, and technical problem solving.'
          }
        ]
      }
    ]
  }
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  {
    id: 'enr_01',
    studentId: 'std_01',
    courseId: 'crs_01',
    enrolledDate: '2024-01-15',
    progressPercentage: 66,
    completedLessonIds: ['les_101_1', 'les_101_2'],
    status: 'In Progress'
  },
  {
    id: 'enr_02',
    studentId: 'std_01',
    courseId: 'crs_02',
    enrolledDate: '2024-02-01',
    progressPercentage: 100,
    completedLessonIds: ['les_201_1', 'les_201_2', 'les_202_1'],
    status: 'Completed',
    grade: 'A+',
    completedDate: '2024-04-10',
    certificateId: 'CERT-EDU-2024-99824'
  },
  {
    id: 'enr_03',
    studentId: 'std_01',
    courseId: 'crs_03',
    enrolledDate: '2024-03-10',
    progressPercentage: 50,
    completedLessonIds: ['les_301_1'],
    status: 'In Progress'
  },
  {
    id: 'enr_04',
    studentId: 'std_03',
    courseId: 'crs_02',
    enrolledDate: '2024-01-10',
    progressPercentage: 100,
    completedLessonIds: ['les_201_1', 'les_201_2', 'les_202_1'],
    status: 'Completed',
    grade: 'A+',
    completedDate: '2024-03-25',
    certificateId: 'CERT-EDU-2024-11029'
  },
  {
    id: 'enr_05',
    studentId: 'std_02',
    courseId: 'crs_04',
    enrolledDate: '2024-02-14',
    progressPercentage: 100,
    completedLessonIds: ['les_401_1'],
    status: 'Completed',
    grade: 'A',
    completedDate: '2024-04-05',
    certificateId: 'CERT-EDU-2024-44123'
  }
];

export const INITIAL_JOBS: PlacementJob[] = [
  {
    id: 'job_01',
    companyName: 'Google',
    companyLogo: 'https://www.google.com/favicon.ico',
    companyWebsite: 'https://careers.google.com',
    roleTitle: 'Software Engineer (Campus 2024)',
    jobType: 'Full-Time',
    packageCTC: '32.5 LPA',
    location: 'Bengaluru / Hyderabad',
    minCGPA: 8.5,
    eligibleBranches: ['Computer Science & Engineering', 'Information Technology', 'Artificial Intelligence & Data Science'],
    deadline: '2026-11-15',
    driveDate: '2026-11-20',
    openings: 8,
    description: 'Join Google core infrastructure and product teams. You will design, develop, test, deploy, maintain, and enhance large-scale distributed software applications.',
    responsibilities: [
      'Write robust, clean, and tested code in C++, Java, or Go',
      'Optimize algorithmic bottlenecks across high-QPS service mesh endpoints',
      'Collaborate with global site reliability engineering and product management teams'
    ],
    requirements: [
      'Strong foundations in Data Structures, Algorithms, and System Design',
      'Solid understanding of multithreading, concurrency, and operating system internals',
      'Minimum CGPA of 8.5 with no active backlogs'
    ],
    selectionStages: ['Online Coding Assessment (90 mins)', 'Technical Round 1 (Data Structures)', 'Technical Round 2 (System Architecture)', 'Googliness & Leadership'],
    status: 'Open'
  },
  {
    id: 'job_02',
    companyName: 'Microsoft',
    companyLogo: 'https://www.microsoft.com/favicon.ico',
    companyWebsite: 'https://careers.microsoft.com',
    roleTitle: 'Software Development Engineer - Azure',
    jobType: 'Full-Time',
    packageCTC: '27.0 LPA',
    location: 'Hyderabad / Noida',
    minCGPA: 8.0,
    eligibleBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Artificial Intelligence & Data Science'],
    deadline: '2026-11-10',
    driveDate: '2026-11-18',
    openings: 12,
    description: 'Work on Microsoft Azure cloud infrastructure, building enterprise container services, scalable databases, and security enclaves.',
    responsibilities: [
      'Build scalable cloud microservices powering Azure hyper-scale cloud',
      'Implement real-time diagnostics, telemetry, and automated remediation systems'
    ],
    requirements: [
      'Proficiency in C#, C++, Java, or Python',
      'Understanding of distributed consensus protocols and REST API best practices',
      'CGPA 8.0 and above'
    ],
    selectionStages: ['Online Assessment', 'Technical Round 1', 'Technical Round 2', 'AA (As Appropriate) Director Round'],
    status: 'Interviewing'
  },
  {
    id: 'job_03',
    companyName: 'Amazon',
    companyLogo: 'https://www.amazon.com/favicon.ico',
    companyWebsite: 'https://amazon.jobs',
    roleTitle: 'Cloud Support Associate & DevOps Trainee',
    jobType: 'Full-Time',
    packageCTC: '18.5 LPA',
    location: 'Bengaluru / Pune',
    minCGPA: 7.5,
    eligibleBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication'],
    deadline: '2026-11-25',
    driveDate: '2026-12-02',
    openings: 15,
    description: 'Deep dive into AWS Cloud infrastructure, diagnosing high-severity customer architectural incidents, automating deployments, and tuning network parameters.',
    responsibilities: [
      'Troubleshoot complex AWS cloud environments (EC2, S3, RDS, VPC)',
      'Automate infrastructure provisioning using CloudFormation and Terraform'
    ],
    requirements: [
      'Strong grasp of Linux OS, TCP/IP networking, and DNS/SSL protocols',
      'Scripting knowledge in Python or Bash',
      'Minimum CGPA 7.5'
    ],
    selectionStages: ['Online Assessment (Aptitude & Linux Debugging)', 'Technical Interview 1', 'Bar Raiser Interview'],
    status: 'Open'
  },
  {
    id: 'job_04',
    companyName: 'Cisco Systems',
    companyLogo: 'https://www.cisco.com/favicon.ico',
    companyWebsite: 'https://cisco.com/careers',
    roleTitle: 'Software Engineer - Networking & Security',
    jobType: 'Full-Time',
    packageCTC: '16.0 LPA',
    location: 'Bengaluru',
    minCGPA: 7.0,
    eligibleBranches: ['Computer Science & Engineering', 'Electronics & Communication', 'Information Technology'],
    deadline: '2026-11-12',
    driveDate: '2026-11-19',
    openings: 10,
    description: 'Develop next-generation SDN controllers, routing algorithms, and enterprise zero-trust security appliances.',
    responsibilities: [
      'Develop kernel-level drivers and socket programming modules in C/C++',
      'Write automated test suites for continuous verification of packet processing'
    ],
    requirements: [
      'Strong command of C/C++ and OSI 7-layer networking stack',
      'Knowledge of routing protocols (BGP, OSPF) is a plus'
    ],
    selectionStages: ['Cisco Virtual Assessment', 'Technical Interview', 'Managerial & HR Interview'],
    status: 'Open'
  },
  {
    id: 'job_05',
    companyName: 'Infosys',
    companyLogo: 'https://www.infosys.com/favicon.ico',
    companyWebsite: 'https://infosys.com/careers',
    roleTitle: 'Specialist Programmer (Power Programmer)',
    jobType: 'Full-Time',
    packageCTC: '9.5 LPA',
    location: 'Mysuru / Bengaluru / Pune',
    minCGPA: 6.5,
    eligibleBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Artificial Intelligence & Data Science'],
    deadline: '2026-11-30',
    driveDate: '2026-12-08',
    openings: 25,
    description: 'High-performing elite engineering cadre at Infosys focused on full-stack modern digital transformations, enterprise AI, and high-velocity development.',
    responsibilities: [
      'Develop modern cloud-native web backends and microservices',
      'Build scalable data integration pipelines'
    ],
    requirements: [
      'Problem solving in Python, Java, or C++',
      'Understanding of modern database architectures'
    ],
    selectionStages: ['HackWithInfy / Coding Round', 'Technical Interview', 'HR Interview'],
    status: 'Open'
  },
  {
    id: 'job_06',
    companyName: 'Deloitte',
    companyLogo: 'https://www2.deloitte.com/favicon.ico',
    companyWebsite: 'https://deloitte.com/careers',
    roleTitle: 'Technology & Cloud Consultant Trainee',
    jobType: 'Full-Time',
    packageCTC: '8.2 LPA',
    location: 'Hyderabad / Mumbai',
    minCGPA: 7.0,
    eligibleBranches: ['Computer Science & Engineering', 'Information Technology', 'Electronics & Communication', 'Artificial Intelligence & Data Science'],
    deadline: '2026-11-28',
    driveDate: '2026-12-05',
    openings: 20,
    description: 'Consult Fortune 500 enterprises on digital system integration, ERP architectures, cloud migration, and IT compliance.',
    responsibilities: [
      'Analyze enterprise business workflows and translate them into IT architectures',
      'Facilitate client workshops and configure cloud SaaS workflows'
    ],
    requirements: [
      'Strong analytical and interpersonal communication skills',
      'Basic programming awareness and database familiarity'
    ],
    selectionStages: ['Versant & Aptitude Test', 'Case Study Round', 'Partner Interview'],
    status: 'Open'
  }
];

export const INITIAL_APPLICATIONS: JobApplication[] = [
  {
    id: 'app_01',
    studentId: 'std_01',
    jobId: 'job_01',
    appliedDate: '2026-10-25',
    status: 'Shortlisted',
    resumeUsed: 'https://edutrack.edu/resumes/maya_sharma_2024.pdf',
    notes: 'Online test cleared with 98th percentile score. Ready for Technical Round 1.'
  },
  {
    id: 'app_02',
    studentId: 'std_01',
    jobId: 'job_02',
    appliedDate: '2026-10-22',
    status: 'Interview Scheduled',
    resumeUsed: 'https://edutrack.edu/resumes/maya_sharma_2024.pdf',
    interviewDetails: {
      date: '2026-11-04',
      time: '14:30 IST',
      round: 'Technical Round 1: Distributed Systems & DSA',
      mode: 'Online (Google Meet)',
      link: 'https://meet.google.com/abc-edutrack-msft'
    },
    notes: 'Candidate has strong cloud coursework and high CGPA.'
  },
  {
    id: 'app_03',
    studentId: 'std_03',
    jobId: 'job_02',
    appliedDate: '2026-10-18',
    status: 'Offer Extended',
    resumeUsed: 'https://edutrack.edu/resumes/priya_nair_2024.pdf',
    notes: 'Exceptional performance in all 3 interview rounds. Offer letter dispatched with package 27.0 LPA.'
  },
  {
    id: 'app_04',
    studentId: 'std_02',
    jobId: 'job_04',
    appliedDate: '2026-10-20',
    status: 'Shortlisted',
    resumeUsed: 'https://edutrack.edu/resumes/rohan_verma_2024.pdf',
    notes: 'Shortlisted based on networking and C++ assessment.'
  },
  {
    id: 'app_05',
    studentId: 'std_04',
    jobId: 'job_03',
    appliedDate: '2026-10-24',
    status: 'Applied',
    resumeUsed: 'https://edutrack.edu/resumes/ananya_patel.pdf'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Interview Scheduled: Microsoft Azure',
    message: 'Your Technical Round 1 is scheduled for Nov 04, 2026 at 14:30 IST via Google Meet.',
    type: 'placement',
    timestamp: '2 hours ago',
    read: false,
    linkTab: 'placements'
  },
  {
    id: 'notif_02',
    title: 'New Campus Drive Announced: Google SWE',
    message: 'Google has opened registration for Software Engineer roles (32.5 LPA). Deadline: Nov 15.',
    type: 'placement',
    timestamp: 'Yesterday',
    read: false,
    linkTab: 'placements'
  },
  {
    id: 'notif_03',
    title: 'Certificate Issued!',
    message: 'Congratulations! You completed Applied Machine Learning with Grade A+. View certificate.',
    type: 'course',
    timestamp: '3 days ago',
    read: true,
    linkTab: 'courses'
  }
];

export const PLACEMENT_PREP_DATA = {
  aptitudeQuestions: [
    {
      id: 'apt_1',
      category: 'Quantitative Aptitude',
      question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
      options: ['65 seconds', '89 seconds', '75 seconds', '100 seconds'],
      correctIndex: 1,
      explanation: 'Speed = 240 / 24 = 10 m/s. Total distance to cross platform = 240 + 650 = 890 m. Time = 890 / 10 = 89 seconds.'
    },
    {
      id: 'apt_2',
      category: 'Logical Reasoning',
      question: 'If CLOUD is coded as ENQWF, how is SERVER coded in that same language?',
      options: ['UGTXGT', 'VHTYHT', 'UGTWGT', 'TGTVGT'],
      correctIndex: 0,
      explanation: 'Each letter is shifted forward by +2 positions in the alphabetical series: C(+2)->E, L(+2)->N, O(+2)->Q, U(+2)->W, D(+2)->F. Similarly, S->U, E->G, R->T, V->X, E->G, R->T.'
    },
    {
      id: 'apt_3',
      category: 'Technical CS Concepts',
      question: 'Which of the following database isolation levels prevents dirty reads but permits non-repeatable reads?',
      options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
      correctIndex: 1,
      explanation: 'Read Committed guarantees that any data read was committed at the moment it is read, preventing dirty reads, but queries re-read during the transaction may observe committed updates.'
    },
    {
      id: 'apt_4',
      category: 'Algorithms & Complexity',
      question: 'What is the worst-case time complexity of finding the median in an unsorted array of size N using Quickselect?',
      options: ['O(N log N)', 'O(N^2)', 'O(1)', 'O(N)'],
      correctIndex: 1,
      explanation: 'Standard Quickselect with naive pivot selection degrades to O(N^2) in the worst case (though average time is O(N)). Median-of-medians algorithm guarantees O(N) worst-case.'
    }
  ],
  interviewTips: [
    {
      company: 'Google',
      focus: 'Data Structures, Graph Traversals, Big-O Optimization, Clear Communication',
      tip: 'Do not rush into writing code. State clarifying questions, specify edge cases (empty inputs, integer overflow), and explain time/space trade-offs before typing code.'
    },
    {
      company: 'Microsoft',
      focus: 'System Architecture, Clean Modular Code, Exception Handling, Unit Testing',
      tip: 'Microsoft interviewers love candidates who proactively write unit tests and dry-run their code line-by-line with sample inputs before declaring they are finished.'
    },
    {
      company: 'Amazon',
      focus: '16 Leadership Principles, Scalable Cloud Design, STAR Behavioral Method',
      tip: 'Tie every behavioral answer directly to Customer Obsession, Ownership, and Bias for Action. Provide quantified metrics of impact (e.g., reduced response latency by 35%).'
    },
    {
      company: 'TCS & Infosys',
      focus: 'Object Oriented Programming, SQL Joins & Normalization, Operating System Basics',
      tip: 'Be crystal clear on OOP pillars (Inheritance, Polymorphism, Abstraction, Encapsulation) with real-world analogies and write clean SQL queries for second-highest salary.'
    }
  ]
};

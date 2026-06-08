import fs from 'fs';
import path from 'path';

const COURSES = [
  "B PHARMA",
  "BA ENG",
  "BA JMC",
  "BBA",
  "BCA",
  "BCOM H",
  "BHM",
  "BSC ANIMATION",
  "BSC NURSING",
  "BTECH",
  "DIPLOMA",
  "MBA",
  "MCA",
  "MTECH",
];

const SEMESTERS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];

const SUBJECTS = {
  "Sem 1": ["Mathematics I", "Physics", "Chemistry", "English", "Basic Electronics"],
  "Sem 2": ["Mathematics II", "Engineering Drawing", "Data Structures", "Communication Skills", "Environmental Science"],
  "Sem 3": ["Algorithms", "OOP with Java", "Database Systems", "Discrete Mathematics", "Digital Electronics"],
  "Sem 4": ["Operating Systems", "Computer Networks", "Software Engineering", "Theory of Computation", "Web Technologies"],
  "Sem 5": ["Compiler Design", "Artificial Intelligence", "Machine Learning", "Cloud Computing", "Mobile Computing"],
  "Sem 6": ["Distributed Systems", "Information Security", "Big Data Analytics", "Elective I", "Elective II"],
  "Sem 7": ["Project Work I", "Elective III", "Elective IV", "Internship"],
  "Sem 8": ["Project Work II", "Elective V", "Seminar"],
};

const BASE_DIR = path.resolve('public/courses');

function makeDir(...segments) {
  const dirPath = path.join(BASE_DIR, ...segments);
  fs.mkdirSync(dirPath, { recursive: true });
}

// Generate folders
COURSES.forEach((course) => {
  makeDir(course);

  if (course === "BTECH") {
    const branches = ["Ce", "Cse", "Ece", "Me", "Year 1"];
    branches.forEach((branch) => {
      const branchSems = branch === "Year 1"
        ? ["Common", "Sem 1", "Sem 2"]
        : branch === "Ce"
          ? ["Sem 3", "Sem 4", "Sem 5", "Sem 8"]
          : branch === "Me"
            ? ["Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7"]
            : ["Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];

      branchSems.forEach((sem) => {
        let subjects = [];
        if (branch === "Ce") {
          if (sem === "Sem 3") {
            subjects = [
              "Fluid Mechanics",
              "Geomatics Engineering",
              "Mechanics Of Solids",
              "Mathamatics 3",
              "Universal Human Values 2"
            ];
          } else if (sem === "Sem 4") {
            subjects = [
              "Concrete Technology",
              "Hydraulics And Hydralic Machines",
              "Municipal Solid Waste Management",
              "Soil Mechanics",
              "Structural Analysis"
            ];
          } else if (sem === "Sem 5") {
            subjects = [
              "Advanced Structural Analysis",
              "Air And Noise Pollution",
              "Geotechnical And Foundation Engineering",
              "Hydrology And Irrigation Engineering",
              "Reinforced Cement Concrete"
            ];
          } else if (sem === "Sem 8") {
            subjects = [
              "Construction And Planning Scheduling",
              "Non Conventional Energy Resources",
              "Water Power Engieneering"
            ];
          }
        } else if (branch === "Cse") {
          if (sem === "Sem 3") {
            subjects = [
              "Application Based Programming In Python",
              "Career Skills",
              "Data Structures With C",
              "Discrete Structure And Combinatorics",
              "Fundamentals Of Cloud Computing And Big Data",
              "Fundamentals Of Information Security And Block Chain",
              "Fundamentals Of Iot",
              "Introduction To Cryptography",
              "Introduction To Statistical Data Science",
              "Logic Design And Computer Organization",
              "Oops With Cpp",
              "Probability And Random Process",
              "Python Programming"
            ];
          } else if (sem === "Sem 4") {
            subjects = [
              "Career Skills",
              "Deep Learning",
              "Design And Analysis Of Algorithms",
              "Finite Automata And Formal Language",
              "Fundamental Of Cyber Security",
              "Fundamental Of Statistics And Ai",
              "Indian Constitution",
              "Java Programming",
              "Microprocessors",
              "OTHERS",
              "R",
              "Virtualization And Cloud Computing"
            ];
          } else if (sem === "Sem 5") {
            subjects = [
              "Al And Ml",
              "Career Skills",
              "Cbnst",
              "Cloud Based Application Development",
              "Communication Models And Protocols",
              "Computer Network 1",
              "Computer System Security",
              "Dbms",
              "Deep Learning Fundamentals",
              "Ethical Hacking",
              "Indian Knowledge System",
              "Machine Learning",
              "Nlp And Computer Vision",
              "Operating Systems",
              "OTHERS",
              "Security Audit And Compliance 1",
              "System Software"
            ];
          } else if (sem === "Sem 6") {
            subjects = [
              "Advanced Machine Learning",
              "Bigdata Storage And Processing",
              "Career Skills",
              "Compiler Design",
              "Computer Network 2",
              "Full Stack Web Development",
              "Image Processing And Computer Vision",
              "Introduction To Virtual Reality",
              "Llm And Generative Al",
              "Network And System Security",
              "Security Audit And Compliance 2",
              "Software Engineering"
            ];
          } else if (sem === "Sem 7") {
            subjects = [
              "Advanced Computer Architecture",
              "Artificial Intelligence",
              "Computer Forensics",
              "Cryptography And Network Security",
              "Data Warehousing And Data Mining",
              "Human Computer Interaction",
              "OLD"
            ];
          } else if (sem === "Sem 8") {
            subjects = [
              "Disaster Management",
              "Distributed Systems",
              "Mobile Application Development",
              "Mobile Computing",
              "Soft Computing",
              "Storage Networks",
              "Wind And Solar Energy"
            ];
          }
        } else if (branch === "Ece") {
          if (sem === "Sem 3") {
            subjects = [
              "Advance Engineering Mathematics",
              "Digitial System Design",
              "Eletronic Devices And Circuits",
              "Network Theory",
              "Signal And Systems"
            ];
          } else if (sem === "Sem 4") {
            subjects = [
              "Analog Circuit",
              "Control System",
              "Microcontroller",
              "Operation Research"
            ];
          } else if (sem === "Sem 5") {
            subjects = [
              "Analog And Digital Communication",
              "Data Communication Network",
              "Digital Sigal Processing",
              "Electromagnetic Waves",
              "Oop Using Cpp",
              "Probablity Theory"
            ];
          } else if (sem === "Sem 6") {
            subjects = [
              "Cmos Design",
              "Digital Signal Processing",
              "Electric Vehicle Technology",
              "Mircowave Engineering",
              "Values And Ethics"
            ];
          } else if (sem === "Sem 7") {
            subjects = [
              "Digital Image Processing",
              "Fundamentals Of Cybersecurity",
              "Principles Of Management",
              "Wireless Communication"
            ];
          } else if (sem === "Sem 8") {
            subjects = [
              "Disaster Management",
              "Optical Fibre Communication",
              "Satellite Communications"
            ];
          }
        } else if (branch === "Me") {
          if (sem === "Sem 3") {
            subjects = [
              "Engineering Mathematics 3",
              "Engineering Mechanics",
              "Entrepreneurship For Engineers",
              "Material Science",
              "Production Technology",
              "Thermal Engineering",
              "Universal Human Values 2"
            ];
          } else if (sem === "Sem 4") {
            subjects = [
              "Additive Manufacturing",
              "Automation In Production",
              "Fluid Mechanics And Fluid Machines",
              "Mechanics Of Materials",
              "Mechantronics"
            ];
          } else if (sem === "Sem 5") {
            subjects = [
              "Design Of Machine Elements 1",
              "Heat Transfer",
              "Mechanical Measurement And Metrology",
              "Renewable Energy",
              "Supply Chain Management",
              "Theory Of Machines"
            ];
          } else if (sem === "Sem 6") {
            subjects = [
              "Computer Aided Manufacturing",
              "Design Of Machine Elements 2",
              "Finite Element Method",
              "Fintine Element Method",
              "Industrial Engnerring And Project Management",
              "Mechanical Vibrations"
            ];
          } else if (sem === "Sem 7") {
            subjects = [];
          }
        } else if (branch === "Year 1") {
          if (sem === "Common") {
            subjects = [
              "Basic Electrical Engineering",
              "Basic Electronics Engineering",
              "Basics Of Civil Engineering",
              "Engineering Chemistry",
              "Engineering Physics",
              "Environmental Science",
              "Healthy Living And Fitness"
            ];
          } else if (sem === "Sem 1") {
            subjects = [
              "Cs 1",
              "Engineering Mathematics 1",
              "Mathematics For Ai 1",
              "OTHERS",
              "Professional Communication",
              "Python"
            ];
          } else if (sem === "Sem 2") {
            subjects = [
              "Advanced Professional Communication",
              "Cs 2",
              "Engineering Mathematics 2",
              "Fundamentals Of Ai And Ml",
              "Mathematics For Ai 2",
              "OTHERS"
            ];
          }
        }

        subjects.forEach((subject) => {
          makeDir(course, branch, sem, subject);

          let nestedSubjects = [];
          if (branch === "Cse") {
            if (subject === "OTHERS") {
              if (sem === "Sem 4") {
                nestedSubjects = ["Data Communication And Network"];
              } else if (sem === "Sem 5") {
                nestedSubjects = ["Software Project Management"];
              }
            } else if (subject === "OLD" && sem === "Sem 7") {
              nestedSubjects = ["Business Intelligence", "Computer Graphics"];
            }
          } else if (branch === "Year 1") {
            if (subject === "OTHERS") {
              if (sem === "Sem 1") {
                nestedSubjects = ["Calculus And Linear Algebra"];
              } else if (sem === "Sem 2") {
                nestedSubjects = ["Probability And Differential Equation"];
              }
            }
          }

          nestedSubjects.forEach((nestSub) => {
            makeDir(course, branch, sem, subject, nestSub);
          });
        });
      });
    });
    return;
  }

  if (course === "DIPLOMA") {
    const branches = ["Ce", "Cs", "Year 1"];
    branches.forEach((branch) => {
      const branchSems = branch === "Year 1"
        ? ["Sem 1", "Sem 2"]
        : branch === "Ce"
          ? ["Sem 3"]
          : ["Sem 3", "Sem 4", "Sem 5", "Sem 6"];

      branchSems.forEach((sem) => {
        let subjects = [];
        if (branch === "Ce") {
          if (sem === "Sem 3") {
            subjects = [
              "Building Construction",
              "Building Drwaing",
              "Concrete Technology",
              "Surveying"
            ];
          }
        } else if (branch === "Cs") {
          if (sem === "Sem 3") {
            subjects = [
              "Applied Mathematics",
              "Digital Logic",
              "Object Oriented Programming",
              "Rdbms",
              "Software Engineering"
            ];
          } else if (sem === "Sem 4") {
            subjects = [
              "Computer Architecture And Maintenance",
              "Computer Networks",
              "Data Structures",
              "Management Informtaion System",
              "Python Programming"
            ];
          } else if (sem === "Sem 5") {
            subjects = [
              "Java Programming",
              "Microprocessor And Programming",
              "Multimedia And Animation Techniques",
              "Network Management And Adminstration",
              "Operating System"
            ];
          } else if (sem === "Sem 6") {
            subjects = [
              "Computer Graphics",
              "Entrepreneurship",
              "Insformation Security",
              "Web Technology"
            ];
          }
        } else if (branch === "Year 1") {
          if (sem === "Sem 1") {
            subjects = [
              "Applied Chemistry 1",
              "Applied Mathematics 1",
              "Applied Physics 1",
              "English And Communication Skills",
              "Fundamental Of It"
            ];
          } else if (sem === "Sem 2") {
            subjects = [
              "Applied Chemistry 2",
              "Applied Mathematics 2",
              "Applied Physics 2",
              "English And Communication Skills 2",
              "Fundamental Of Information Technology 2"
            ];
          }
        }

        subjects.forEach((subject) => {
          makeDir(course, branch, sem, subject);
        });
      });
    });
    return;
  }

  const courseSemesters = course === "B PHARMA"
    ? ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 6", "Sem 8"]
    : course === "BA ENG"
      ? ["Sem 6"]
      : course === "BHM"
        ? ["Sem 1", "Sem 2", "Sem 3", "Sem 5", "Sem 6", "Sem 7"]
        : course === "BSC ANIMATION"
          ? ["Sem 1", "Sem 2"]
          : course === "BSC NURSING"
            ? ["Sem 2", "Sem 4", "Sem 6"]
            : (course === "BA JMC" || course === "BBA" || course === "BCA" || course === "BCOM H")
              ? ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6"]
              : (course === "MBA" || course === "MCA" || course === "MTECH")
                ? ["Sem 1", "Sem 2", "Sem 3", "Sem 4"]
                : SEMESTERS;

  courseSemesters.forEach((sem) => {
    let subjects = SUBJECTS[sem] || [];

    if (course === "B PHARMA") {
      if (sem === "Sem 1") {
        subjects = [
          "Communication Skills",
          "Human Anatomy And Physiology 1",
          "Pharmaceutical Analysis",
          "Pharmaceutical Inorganic Chemistry",
          "Pharmaceutics 1",
          "Remedial Biology",
          "Remedial Mathematics"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Biochemistry",
          "Computer Applications In Pharmacy",
          "Environmental Science",
          "Human Anatomy And Physiology 2",
          "Pathophysiology",
          "Pharmaceutical Organic Chemistry 1"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Pharmaceutical Engineering",
          "Pharmaceutical Microbiology",
          "Pharmaceutical Organic Chemistry 2",
          "Physical Pharmaceutics 1"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Medicinal Chemistry 1",
          "Pharmaceutical Organic Chemistry 3",
          "Pharmacognosy And Phytochemistry 1",
          "Pharmacology 1",
          "Physical Pharmaceutics 2"
        ];
      } else if (sem === "Sem 6") {
        subjects = [
          "Biopharmaceutics And Pharmacokinetics",
          "Herbal Drug Technology",
          "Medicinal Chemistry 3",
          "Pharmaceutical Biotechnology",
          "Pharmaceutical Quality Assurance",
          "Pharmacology 3"
        ];
      } else if (sem === "Sem 8") {
        subjects = [
          "Advance Instrumentation Techniques",
          "Biostatistics And Research Methodology",
          "Cosmetic Science",
          "Dietary Supplements And Nutraceuticals",
          "Experimental Pharmacology",
          "Pharmaceutical Regulatory Science",
          "Pharmacovigilance",
          "Social And Preventive Pharmacy"
        ];
      }
    } else if (course === "BA ENG") {
      if (sem === "Sem 6") {
        subjects = [
          "Literary Criticism",
          "Modern European Drama",
          "Post Colonial Literature"
        ];
      }
    } else if (course === "BA JMC") {
      if (sem === "Sem 1") {
        subjects = [
          "Anchoring",
          "Basic Introduction To Print Media",
          "Introduction To Mass Communication"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Introduction To Digital Media",
          "Life Skills",
          "Mass Media Writing",
          "Social And Political System Of India",
          "Theories And Models Of Mass Communication"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Media Management",
          "Photography And Photojournalism",
          "Video Production"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Media Law And Ethics",
          "Pr And Event Management",
          "Radio Production & Podcast",
          "Social And Political System Of India",
          "Television Journalism And Production"
        ];
      } else if (sem === "Sem 5") {
        subjects = [
          "Advertising & Integrated Communication",
          "Development Communication",
          "Documentary Production",
          "Fact Checking And Verification"
        ];
      } else if (sem === "Sem 6") {
        subjects = [
          "Advanced Video Production",
          "Communication Research",
          "Film Studies",
          "Global Communication",
          "India And Contemporary World",
          "Media Research",
          "Mobile Journalism",
          "Video Editing"
        ];
      }
    } else if (course === "BBA") {
      if (sem === "Sem 1") {
        subjects = [
          "Business Communication",
          "Business Economics",
          "Business Law",
          "Computer Application In Management",
          "Economics For Life",
          "Environmental Science",
          "Financial Accounting",
          "Indian Knowledge System",
          "Principles And Practices Of Management"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Business Communication 2",
          "Business Environment",
          "Business Statistics",
          "Computer Application In Business",
          "Economics For Life 2",
          "Environmental Science",
          "Financial Management",
          "Indian Constitution",
          "Marketing Management",
          "Organizational Behaviour",
          "Principles Of Marketing"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Accounting For Managers",
          "Business Environment",
          "Business Statistics",
          "Career Skills",
          "Consumer Protection Act",
          "Entrepreneurship",
          "Human Resource Management",
          "Legal And Ethical Issues In Business",
          "Macro Economics",
          "Management Accounting",
          "Management Information System"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Business Reasearch",
          "Career Skills",
          "Digital Marketing",
          "Entrepreneurship And Startup Ecosystem",
          "Financial Management",
          "International Business",
          "Logistics And Supply Chain Management",
          "Management Accounting",
          "Production And Opeartions Management",
          "Wellness And Stress Management"
        ];
      } else if (sem === "Sem 5") {
        subjects = [
          "Advertising",
          "Business Strategy",
          "Career Skills",
          "Direct Tax Law",
          "E Commerce",
          "Financial Institutions And Services",
          "Indian Economy",
          "Industrial Relations",
          "Logistics And Supply Chain Management",
          "Performance Management",
          "Sales Management",
          "Strategic Management",
          "Working Capital Management"
        ];
      } else if (sem === "Sem 6") {
        subjects = [
          "Business Ethics And Values",
          "Business Taxation",
          "Consumer Behaviour",
          "Corporate Tax Planning",
          "Financial Institutions And Services",
          "Gst",
          "Investment Analysis And Portfolio Management",
          "Money Banking And Finance",
          "Project Management",
          "Rural Marketing",
          "Training And Development",
          "Wages And Salary Administration"
        ];
      }
    } else if (course === "BCOM H") {
      if (sem === "Sem 1") {
        subjects = [
          "Accountant In Business",
          "Business Communication",
          "Business Mathematics",
          "Business Organization",
          "Financial Accounting",
          "Fundamentals Of Computers",
          "Micro Economics",
          "Principles Of Management"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Business Environment",
          "Business Finance",
          "Business Statistics",
          "Computerized Accounting",
          "Environmental Science",
          "Financial Awareness",
          "Financial Control",
          "Financial Reporting",
          "Human Resource Management",
          "Indian Constitution",
          "Macro Economics",
          "Managemet Accounting",
          "Principles Of Management"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Audit And Assurance",
          "Business Law",
          "Business Statistics",
          "Corporate Accounting",
          "Financial Management",
          "Indian Knowledge System",
          "Industry Law",
          "Investing In Stock Markets",
          "Management Of Financial Institutes And Services",
          "Performance Management",
          "Principles Of Marketing",
          "Working Capital Management"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Advance Financial Management",
          "Advanced Perfromance Management",
          "Business Mathematics",
          "Career Skills",
          "Company Law",
          "Computer Application In Business",
          "Computerized Accounting",
          "Corporate And Business Law",
          "Corporate Law",
          "Corporate Reporting",
          "Cost Accounting",
          "Digital Marketing",
          "Entrepreneurship And Small Business",
          "Fundamentals Of Capital Market",
          "Indian Economy",
          "International Investment Appraisal",
          "Introduction To Fin Tech",
          "Investment Analysis And Portfolio Management",
          "Strategic Busniess Reporting"
        ];
      } else if (sem === "Sem 5") {
        subjects = [
          "Auditing",
          "Business Analysis",
          "Consumer Behaviour",
          "Entrepreneurship And Small Business",
          "Fundamentals Of Financial Management",
          "Governance Risks And Ethics",
          "Income Tax Law And Practice",
          "Integrated Marketing Communication",
          "International Business",
          "Management Accounting",
          "Market Research",
          "Organisational Behaviour",
          "Principles Of Marketing",
          "Sustainable Development"
        ];
      } else if (sem === "Sem 6") {
        subjects = [
          "Auditing And Corporate Governance",
          "Baking And Insurance",
          "Business Research Methods And Project Work",
          "Compensation Management",
          "Consumer Behaviour",
          "Consumer Relationship Management",
          "Corporate Governance And Business Ethics",
          "Financial Derivatives",
          "Finacial Markets And Finacial Services",
          "Fundamentals Of Investment",
          "Gst Laws",
          "Hr Analytics",
          "Indirect Tax Law",
          "Investment Management",
          "Management Accounting",
          "Management Of Financial Institutions And Services",
          "Multinational Financial Systems",
          "Project Management",
          "Research Methodology",
          "Sales Management",
          "Strategic Management"
        ];
      }
    } else if (course === "BHM") {
      if (sem === "Sem 1") {
        subjects = [
          "Accommodation Foundation 1",
          "Communication Skills",
          "F & B Service Foundation 1",
          "Food Production Foundation 1",
          "Front Office Foundation 1",
          "Fundamentals Of Computers",
          "Introduction To Tourism"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Accommodation Foundation 2",
          "Communication Skills",
          "Environment Science",
          "F And B Service Foundation 2",
          "Food Production Foundation 2",
          "Front Office Foundation 2",
          "Introduction To Commodities",
          "North Indian Tourism",
          "Universal Human Values"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Accommodation Operation 1",
          "Bar Operation",
          "Food Production And Bakery Operation",
          "Front Office Operation 1",
          "Hotel Accounting",
          "Indian Knowledge System",
          "Sustainable Tourism"
        ];
      } else if (sem === "Sem 5") {
        subjects = [
          "Advance Accommodation Management",
          "Advance Food And Beverage Service",
          "Advance Front Office Management",
          "Culinary Arts And Gastronomy Tourism",
          "Food Production Regional Cuisine Of India",
          "Foreign Language French",
          "Regional Cuisine Of India",
          "Tourism Policy And Planning"
        ];
      } else if (sem === "Sem 6") {
        subjects = [
          "Advance Food Production And Patisserie",
          "Food And Beverage Service Management 1",
          "Foreign Language French",
          "Front Office & Accommodation Management 1",
          "Hospitality Marketing",
          "Research Methodology"
        ];
      } else if (sem === "Sem 7") {
        subjects = [
          "Accommodation Management 2 D",
          "Disaster Management",
          "Entrepreneurship Development",
          "Food & Beverage Service Management 2 C",
          "Food Production Management 2 A",
          "Front Office Management 2 B",
          "Organizational Behaviour"
        ];
      }
    } else if (course === "BSC ANIMATION") {
      if (sem === "Sem 1") {
        subjects = [
          "Design Thinking",
          "Fundamentals Of Animation",
          "History Of Art And Design",
          "Professional Communication"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Concept Of Communication Design",
          "History Of Animation"
        ];
      }
    } else if (course === "BSC NURSING") {
      if (sem === "Sem 2") {
        subjects = [
          "Applied Biochemistry",
          "Health Nursing Informatics And Technology",
          "Nursing Foundation"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Adult Health Nursing 2",
          "Educational Technology Nursing Education",
          "Pharmacology And Pathology And Genetics",
          "Professionalism Professional Value And Ethics In Nursing"
        ];
      } else if (sem === "Sem 6") {
        subjects = [
          "Child Health Nursing",
          "Nursing Management And Leadership",
          "Obstetrics And Gynaecology Nursing 1"
        ];
      }
    } else if (course === "BCA") {
      if (sem === "Sem 1") {
        subjects = [
          "Basic Mathematics 1",
          "C",
          "Computational Thinking And Fundamentals Of It",
          "Mathematical Foundation For Ai",
          "Mathematical Foundation Of Computer Science",
          "OTHERS",
          "Professional Communication 1",
          "Python Programming"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Discrete Mathematics",
          "Foundations Of Ai",
          "Fundamentals Of Python Programming",
          "Introduction To Data Science",
          "Oop Using Cpp",
          "Operating System",
          "OTHERS",
          "Probability And Statistics",
          "Programming For Problem Solving"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Career Skills",
          "Data Structures",
          "Dbms",
          "Digital Logic Design",
          "Fundamentals Of Cloud Computing",
          "Introduction To Soft Computing",
          "Probability And Statistics",
          "R Programming"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Alogrithm Design And Analysis",
          "Big Data Analytics",
          "Career Skills",
          "Computer Organization",
          "Data Analytics Using Python",
          "Data Communication And Computer Networks",
          "Management Information System",
          "Microprocessor",
          "OTHERS",
          "Software Engineering",
          "Web Application Development"
        ];
      } else if (sem === "Sem 5") {
        subjects = [
          "Career Skills",
          "Introduction To Ai",
          "Java Programming",
          "Microcontrollers",
          "Object Oriented Analysis And Design",
          "Optimization Techniques",
          "OTHERS",
          "Programming With Dotnet C Sharp"
        ];
      } else if (sem === "Sem 6") {
        subjects = [
          "Computer Graphics",
          "Cryptography",
          "Cyber Security",
          "Data Wharehousing And Data Mining",
          "Fundamentals Of Ai",
          "Fundamentals Of Machine Learning",
          "Introduction To Ml",
          "Mobile Application Development",
          "Mobile Computing",
          "Network Security And Cyber Laws",
          "OTHERS"
        ];
      }
    } else if (course === "MBA") {
      if (sem === "Sem 1") {
        subjects = [
          "Accounting For Managers",
          "Business Analytics",
          "Business Communication",
          "Business Environment",
          "Business Statistics And Analytics For Decision Making",
          "Career Skills",
          "Data Driven Decision Making",
          "Financial Statement Analysis And Repoting",
          "Human Resource Management",
          "Legal Aspects Of Business",
          "Management Concepts And Organizational Behaviour",
          "Managerial Economics",
          "Marketing Management",
          "Orgazinational Design And Behaviour",
          "Professional Communication"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Business Analytics",
          "Business Analytics And Research Methods",
          "Business Research Method",
          "Career Skills",
          "Compensation And Reward Management",
          "Consumer Behaviour And Insights",
          "Corporate Finance",
          "Corporate Tax Planning",
          "Cross Cultural Management",
          "Data Mining",
          "Entrepreneurship",
          "Financial And Tax Planning",
          "Financial Institutions And Markets",
          "Financial Management",
          "Fundamentals Of Business Analytics",
          "Human Resource Management",
          "Indian Ethos And Business Ethics",
          "Industrial Relation And Labour Laws",
          "Integrated Market Communications",
          "International Business",
          "Marketing Management",
          "Operations Research",
          "Orgazinational Behaviour",
          "Quantitative Techniques",
          "Research Methodology",
          "Retail And E Commerce Management",
          "Sales Force And Channel Management",
          "Security Analysis And Portfolio Management",
          "Services Management",
          "Supply Chain Management",
          "Warehousing And Inventory Management"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Business Intelligence",
          "Compensation And Benifits Management",
          "Consumer Behaviour",
          "Corporate Strategy",
          "Data Mining",
          "Data Science Using R",
          "Data Science With Python",
          "Data Visualization",
          "Employee Relations",
          "Financial Derivatives",
          "Financial Institution And Services",
          "Hr Analytics",
          "Integrated Marketing Communication",
          "Investment Analysis And Portfolio Management",
          "Logistics And Supply Chain Management",
          "Managing Banks And Financial Institutions",
          "Organizational Change And Development",
          "Performance Management System",
          "Retail Logistics",
          "Sales And Distributed Management",
          "Security Analysis And Portfolio Management",
          "Stratagic Management",
          "Stratagic Supply Chain Management",
          "Training And Development",
          "Warehousing And Inventory Management",
          "Working Capital Management"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Ai And Ml For Business Management",
          "Corporate Governance And Ethics",
          "Corporate Taxation",
          "Data Science Using R",
          "Data Science With Python",
          "Data Visualization For Manager",
          "Digital Marketing",
          "Entreprenurship And Project Management",
          "Export And Trade Documentation",
          "Financial Derivatives",
          "Hr Analytics",
          "International Finance",
          "International Marketing",
          "It Application",
          "Lean Supply Chain Management",
          "Manpower Planning Recruitment And Selection",
          "Orgazinational Change And Development",
          "Product And Brand Management",
          "Project Management",
          "Retail Management",
          "Rural Marketing",
          "Strategic Hrm",
          "Talent Management",
          "Working Capital Management"
        ];
      }
    } else if (course === "MCA") {
      if (sem === "Sem 1") {
        subjects = [
          "Advance Os",
          "C",
          "Career Skills",
          "Cloud Computing",
          "Coa",
          "Computer Networks",
          "Discrete Structures And Combinatorics",
          "Full Stack Development",
          "Probability And Statistics",
          "Python Programming"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Advance Dbms",
          "Ai",
          "Career Skills",
          "Computer Network",
          "Data Warehousing And Mining",
          "Dbms",
          "Ds",
          "Iot",
          "Java",
          "Machine Learning",
          "Software Engineering"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Ai And Ml",
          "Big Data And Visualization",
          "Career Skills",
          "Daa",
          "Image Processing And Computer Vision",
          "Mobile Application Development",
          "Optimization Techniques",
          "Theory Of Computation And Compiler Construction"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Advanced Software Testing",
          "Data Mining And Warehousing",
          "Deep Learning",
          "Enterprise Architecture Using C Sharp",
          "Graphics And Visual Computing",
          "Network Security And Cryptography",
          "R",
          "Soft Computing",
          "Software Project Management"
        ];
      }
    } else if (course === "MTECH") {
      if (sem === "Sem 1") {
        subjects = [
          "Applied Data Science",
          "Artificial Intelligence",
          "Big Data Analytics",
          "Cryptography And Netowork Security",
          "Data Structures And Algorithms",
          "Data Warehousing & Data Mining",
          "Internet Of Things"
        ];
      } else if (sem === "Sem 2") {
        subjects = [
          "Advanced Operating Systems",
          "Applied Cyber Security",
          "Cyber Security Compliance",
          "Data Science And Nlp",
          "Deep Learning",
          "Introduction To Research Methodology",
          "Reinforcement Learning",
          "Software Design And Architecture"
        ];
      } else if (sem === "Sem 3") {
        subjects = [
          "Introduction To Research Methodology",
          "Quantun Computing"
        ];
      } else if (sem === "Sem 4") {
        subjects = [
          "Full Stack Web Development",
          "Soft Computing"
        ];
      }
    }

    subjects.forEach((subject) => {
      makeDir(course, sem, subject);

      let othersSubjects = [];
      if (course === "BCA" && subject === "OTHERS") {
        if (sem === "Sem 1") {
          othersSubjects = ["Health Education", "Principles Of Management"];
        } else if (sem === "Sem 2") {
          othersSubjects = ["Biomedical Waste Management"];
        } else if (sem === "Sem 4") {
          othersSubjects = ["Cbnst", "Entrepreneurship Development", "Introduction To Ai And Ml"];
        } else if (sem === "Sem 5") {
          othersSubjects = ["Financial Accounting", "Iot"];
        } else if (sem === "Sem 6") {
          othersSubjects = ["Fundamentals Of Data Analytics", "Multimedia Technology And Applications"];
        }
      }

      othersSubjects.forEach((othSub) => {
        makeDir(course, sem, subject, othSub);
      });
    });
  });
});

console.log("Successfully generated all course directories under public/courses!");

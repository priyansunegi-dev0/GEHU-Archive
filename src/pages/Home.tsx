import { useEffect, useState } from 'react';
import { SEO } from '@/components/SEO';
import { FileText, ArrowUp, Eye } from 'lucide-react';
import type { Folder as FolderType, PDF } from '@/types';

const FolderImg = ({ name }: { name: string }) => {
  const isSpecial = name.toLowerCase() === "others" || name.toLowerCase() === "old";
  return (
    <img
      src={isSpecial ? "https://img.icons8.com/material-rounded/192/4D4D4D/folder-invoices.png" : "https://res.cloudinary.com/dkm7v4iel/image/upload/v1780732437/lcltkqspqjyaoolu680l.svg"}
      alt="folder"
      className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0"
    />
  );
};

const FolderImgLg = () => (
  <img
    src="https://res.cloudinary.com/dkm7v4iel/image/upload/v1780732437/lcltkqspqjyaoolu680l.svg"
    alt="folder"
    className="h-8 w-8 mx-auto mb-3 opacity-40"
  />
);

interface BreadcrumbItem {
  id: string | null;
  name: string;
}

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

const SUBJECTS: Record<string, string[]> = {
  "Sem 1": ["Mathematics I", "Physics", "Chemistry", "English", "Basic Electronics"],
  "Sem 2": ["Mathematics II", "Engineering Drawing", "Data Structures", "Communication Skills", "Environmental Science"],
  "Sem 3": ["Algorithms", "OOP with Java", "Database Systems", "Discrete Mathematics", "Digital Electronics"],
  "Sem 4": ["Operating Systems", "Computer Networks", "Software Engineering", "Theory of Computation", "Web Technologies"],
  "Sem 5": ["Compiler Design", "Artificial Intelligence", "Machine Learning", "Cloud Computing", "Mobile Computing"],
  "Sem 6": ["Distributed Systems", "Information Security", "Big Data Analytics", "Elective I", "Elective II"],
  "Sem 7": ["Project Work I", "Elective III", "Elective IV", "Internship"],
  "Sem 8": ["Project Work II", "Elective V", "Seminar"],
};



// Programmatically construct the folders and PDFs structure
const FOLDERS: FolderType[] = [];
const PDFS: PDF[] = [];

// Generate Root Course Folders
COURSES.forEach((course) => {
  FOLDERS.push({
    id: course,
    name: course,
    parent_id: null,
    allow_contributions: false,
    created_at: new Date().toISOString(),
    created_by: '0',
    updated_at: new Date().toISOString()
  });

  if (course === "BTECH") {
    const branches = ["Ce", "Cse", "Ece", "Me", "Year 1"];
    branches.forEach((branch) => {
      const branchId = `${course}-${branch}`;
      FOLDERS.push({
        id: branchId,
        name: branch,
        parent_id: course,
        allow_contributions: false,
        created_at: new Date().toISOString(),
        created_by: '0',
        updated_at: new Date().toISOString()
      });

      const branchSems = branch === "Year 1"
        ? ["Common", "Sem 1", "Sem 2"]
        : branch === "Ce"
          ? ["Sem 3", "Sem 4", "Sem 5", "Sem 8"]
          : branch === "Me"
            ? ["Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7"]
            : ["Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];

      branchSems.forEach((sem) => {
        const semId = `${branchId}-${sem}`;
        FOLDERS.push({
          id: semId,
          name: sem,
          parent_id: branchId,
          allow_contributions: false,
          created_at: new Date().toISOString(),
          created_by: '0',
          updated_at: new Date().toISOString()
        });

        let subjects: string[] = [];
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
          const subId = `${semId}-${subject}`;
          FOLDERS.push({
            id: subId,
            name: subject,
            parent_id: semId,
            allow_contributions: false,
            created_at: new Date().toISOString(),
            created_by: '0',
            updated_at: new Date().toISOString()
          });

          // Handle nested folders inside "OTHERS" and "OLD" for BTECH CSE
          let nestedSubjects: string[] = [];
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

          if (nestedSubjects.length > 0) {
            nestedSubjects.forEach((nestSub) => {
              const nestSubId = `${subId}-${nestSub}`;
              FOLDERS.push({
                id: nestSubId,
                name: nestSub,
                parent_id: subId,
                allow_contributions: false,
                created_at: new Date().toISOString(),
                created_by: '0',
                updated_at: new Date().toISOString()
              });
            });
          }
        });
      });
    });
    return; // Skip normal semester generation for BTECH
  }

  if (course === "DIPLOMA") {
    const branches = ["Ce", "Cs", "Year 1"];
    branches.forEach((branch) => {
      const branchId = `${course}-${branch}`;
      FOLDERS.push({
        id: branchId,
        name: branch,
        parent_id: course,
        allow_contributions: false,
        created_at: new Date().toISOString(),
        created_by: '0',
        updated_at: new Date().toISOString()
      });

      const branchSems = branch === "Year 1"
        ? ["Sem 1", "Sem 2"]
        : branch === "Ce"
          ? ["Sem 3"]
          : ["Sem 3", "Sem 4", "Sem 5", "Sem 6"];

      branchSems.forEach((sem) => {
        const semId = `${branchId}-${sem}`;
        FOLDERS.push({
          id: semId,
          name: sem,
          parent_id: branchId,
          allow_contributions: false,
          created_at: new Date().toISOString(),
          created_by: '0',
          updated_at: new Date().toISOString()
        });

        let subjects: string[] = [];
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
          const subId = `${semId}-${subject}`;
          FOLDERS.push({
            id: subId,
            name: subject,
            parent_id: semId,
            allow_contributions: false,
            created_at: new Date().toISOString(),
            created_by: '0',
            updated_at: new Date().toISOString()
          });
        });
      });
    });
    return; // Skip normal semester generation for DIPLOMA
  }

  // Determine semesters for this course
  // B PHARMA has Sem 1, Sem 2, Sem 3, Sem 4, Sem 6, Sem 8
  // BA ENG has Sem 6 only
  // BA JMC, BBA, and BCA have Sem 1, Sem 2, Sem 3, Sem 4, Sem 5, Sem 6
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

  // Generate Semester Folders inside the Course
  courseSemesters.forEach((sem) => {
    const semId = `${course}-${sem}`;
    FOLDERS.push({
      id: semId,
      name: sem,
      parent_id: course,
      allow_contributions: false,
      created_at: new Date().toISOString(),
      created_by: '0',
      updated_at: new Date().toISOString()
    });

    // Determine Subject list for each Semester
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
      } else {
        subjects = [];
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
      } else {
        subjects = [];
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
      } else {
        subjects = [];
      }
    }

    // Generate Subject Folders inside each Semester
    subjects.forEach((subject) => {
      const subId = `${semId}-${subject}`;
      FOLDERS.push({
        id: subId,
        name: subject,
        parent_id: semId,
        allow_contributions: false,
        created_at: new Date().toISOString(),
        created_by: '0',
        updated_at: new Date().toISOString()
      });

      // Handle nested folders inside "OTHERS" for BCA
      let othersSubjects: string[] = [];
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

      if (othersSubjects.length > 0) {
        othersSubjects.forEach((othSub) => {
          const othSubId = `${subId}-${othSub}`;
          FOLDERS.push({
            id: othSubId,
            name: othSub,
            parent_id: subId,
            allow_contributions: false,
            created_at: new Date().toISOString(),
            created_by: '0',
            updated_at: new Date().toISOString()
          });
        });
      }
    });
  });
});

export function Home() {
  const [currentFolder, setCurrentFolder] = useState<FolderType | null>(null);
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbItem[]>([{ id: null, name: 'PYQs' }]);
  const [subFolders, setSubFolders] = useState<FolderType[]>([]);
  const [pdfs, setPdfs] = useState<PDF[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hostname = window.location.hostname;
    let campusSuffix = "GEHU PYQs Archive";
    if (hostname.includes("dehradun")) campusSuffix = "Dehradun Campus";
    else if (hostname.includes("haldwani")) campusSuffix = "Haldwani Campus";
    else if (hostname.includes("bhimtal")) campusSuffix = "Bhimtal Campus";
    else if (hostname.includes("doubts")) campusSuffix = "Doubts Portal";

    const path = breadcrumb.map((item: BreadcrumbItem) => item.name).filter(Boolean).join(' / ');
    document.title = `${path} | ${campusSuffix}`;
  }, [breadcrumb]);

  useEffect(() => {
    const cleanup = fetchContents(currentFolder?.id ?? null);
    return cleanup;
  }, [currentFolder]);

  const fetchContents = (parentId: string | null) => {
    setLoading(true);
    const timer = setTimeout(() => {
      const folders = FOLDERS.filter((f: FolderType) => f.parent_id === parentId);
      const fileList = parentId ? PDFS.filter((p: PDF) => p.folder_id === parentId) : [];
      setSubFolders(folders);
      setPdfs(fileList);
      setLoading(false);
    }, 120);
    return () => clearTimeout(timer);
  };

  const openFolder = (folder: FolderType) => {
    setCurrentFolder(folder);
    setBreadcrumb(prev => [...prev, { id: folder.id, name: folder.name }]);
    // Scroll to top when opening a folder
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateBreadcrumb = (index: number) => {
    const crumb = breadcrumb[index];
    const newBreadcrumb = breadcrumb.slice(0, index + 1);
    setBreadcrumb(newBreadcrumb);
    if (crumb.id) {
      const found = FOLDERS.find((f: FolderType) => f.id === crumb.id);
      if (found) setCurrentFolder(found);
    } else {
      setCurrentFolder(null);
    }
  };

  const goUpOneLevel = () => {
    if (breadcrumb.length > 1) {
      const newIndex = breadcrumb.length - 2;
      navigateBreadcrumb(newIndex);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  const isEmpty = !loading && subFolders.length === 0 && pdfs.length === 0;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SEO page="home" />

      {/* Top Header Section with Breadcrumb and Upload button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 border-b border-zinc-150 dark:border-zinc-900 pb-5">
        <nav className="flex items-center gap-1 text-base md:text-lg flex-wrap">
          {currentFolder && (
            <ArrowUp className="h-5 w-5 cursor-pointer mr-2" onClick={goUpOneLevel} />
          )}
          {breadcrumb.map((crumb: BreadcrumbItem, index: number) => (
            <div key={index} className="flex items-center gap-1">
              {index > 0 && <span className="text-gray-400">/</span>}
              <button
                onClick={() => navigateBreadcrumb(index)}
                disabled={index === breadcrumb.length - 1}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors text-sm md:text-base ${index === breadcrumb.length - 1
                  ? 'text-black dark:text-white font-semibold cursor-default'
                  : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {crumb.name}
              </button>
            </div>
          ))}
        </nav>

      </div>

      {/* File Browser */}
      <div>
        {loading ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {[...Array(5)].map((_, i: number) => (
              <div key={i} className="px-4 py-3 flex items-center gap-3 animate-pulse">
                <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : isEmpty ? (
          <div className="py-16 text-center">
            <FolderImgLg />
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              {currentFolder ? 'This folder is empty' : 'No folders yet'}
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col mt-4 divide-y divide-zinc-200 dark:divide-zinc-800">
              {subFolders.map((folder: FolderType) => (
                <div key={folder.id} className="py-4">
                  <button
                    onClick={() => openFolder(folder)}
                    className="flex w-full items-center gap-3 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <FolderImg name={folder.name} />
                    <span style={{ fontFamily: "'Roboto', sans-serif" }} className="text-xs md:text-sm lg:text-base">
                      {!currentFolder
                        ? folder.name.toUpperCase()
                        : (folder.name.toUpperCase() === "OTHERS" || folder.name.toUpperCase() === "OLD")
                          ? folder.name.toUpperCase()
                          : folder.name.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
                    </span>
                  </button>
                </div>
              ))}
            </div>
            {pdfs.length > 0 && (
              <div className="mt-3 border border-zinc-300 dark:border-zinc-700 rounded-xl overflow-hidden bg-white dark:bg-black divide-y divide-gray-100 dark:divide-zinc-900">
                {pdfs.map((pdf: PDF) => (
                  <div key={pdf.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-zinc-950/40 transition-colors">
                    <FileText className="h-6 w-6 text-red-500 flex-shrink-0" />
                    <span className="flex-1 text-black dark:text-white truncate font-medium text-sm md:text-base">{pdf.file_name}</span>
                    <span className="hidden sm:block w-24 text-right text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {formatFileSize(pdf.file_size)}
                    </span>
                    <span className="hidden sm:block w-28 text-right text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
                      {new Date(pdf.created_at).toLocaleDateString()}
                    </span>
                    <a
                      href={pdf.file_path || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex-shrink-0 shadow-sm"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* WhatsApp Community Section */}
      {!currentFolder && !loading && (
        <div className="mt-16 space-y-3">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white">
            Join Whatsapp Community | 1300+ students
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 dark:text-zinc-400">
            Join{" "}
            <a
              href="https://chat.whatsapp.com/CLCyjRtMnXWKwRpzh3TqFV"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white font-bold underline decoration-1 underline-offset-4 hover:opacity-85 transition-opacity"
            >
              GRAPHIANS
            </a>
          </p>
        </div>
      )}

    </main>
  );
}

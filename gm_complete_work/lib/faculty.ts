// Faculty data, verified from the profile cards supplied by the client
// (public/faculty/). Qualification, designation and a teaching quote are
// only included where that card actually showed them — nothing here is
// invented. There is no faculty-course mapping in the spreadsheet, so
// courseIds is intentionally omitted rather than guessed from subject names.
//
// PHOTOS: four supplied photos (Apoorva Sen, Krishna Gopal Mandloi, Hemlata Yadav, Shivani Sen) contained
// leftover fragments of old card text inside the image pixels. No clean originals exist in the project, so
// background-only cleaned copies live in public/faculty/cleaned/ (faces, hair, clothing untouched; originals
// are kept in public/faculty/). When clean originals arrive, point `image` back at them.

export type FacultyMember = {
  id: string;
  name: string;
  displayName?: string;
  image: string;
  // Intrinsic pixel size of the photo file — used to reserve the exact frame so the whole photo shows (never cropped).
  imageWidth: number;
  imageHeight: number;
  subjects: string[];
  isDirector?: boolean;
  isFounder?: boolean;
  designation?: string;
  qualification?: string;
  experience?: string;
  quote?: string;
};

export const faculty: FacultyMember[] = [
  {
    id: "vinod-gupta",
    name: "Vinod Kumar Gupta",
    displayName: "Mr. Vinod Gupta Sir",
    image: "/faculty/vk-gupta-poster.png",
    imageWidth: 1229,
    imageHeight: 1536,
    subjects: ["Mathematics", "Physics", "Science"],
    isFounder: true,
    designation: "Founder & Senior Faculty",
    qualification: "M.Sc. (Maths) + B.Ed.",
    experience: "10+ Years",
    quote: "Making Mathematics Simple & Conceptual",
  },
  {
    id: "vaishali-mam",
    name: "Vaishali Mam",
    image: "/faculty/vaishali-mam-banner.png",
    imageWidth: 1170,
    imageHeight: 1280,
    subjects: ["Hindi", "Sanskrit"],
    experience: "10+ Years",
    quote: "Making Language Learning Simple & Meaningful",
  },
  {
    id: "mithun-chouhan",
    name: "Mithun Chouhan",
    image: "/faculty/mithun-chouhan-banner.png",
    imageWidth: 1536,
    imageHeight: 1024,
    subjects: ["Biology", "Chemistry"],
    experience: "10+ Years",
  },
  {
    id: "ganesh-parmar",
    name: "Ganesh Parmar",
    image: "/faculty/ganesh-parmar.jpg",
    imageWidth: 1280,
    imageHeight: 1536,
    subjects: ["Chemistry", "Biology"],
    experience: "10+ Years",
    quote: "Making Science Simple, Conceptual & Interesting",
  },
  {
    id: "apoorva-sen",
    name: "Apoorva Sen",
    displayName: "Mrs. Apoorva Sen Ma’am",
    image: "/faculty/apoorva-sen-director.jpg",
    imageWidth: 1280,
    imageHeight: 1536,
    subjects: ["Biology", "Botany"],
    isDirector: true,
    designation: "Director",
    qualification: "M.Sc. Botany + B.Ed.",
    experience: "6 Years",
    quote: "Making Biology Simple, Conceptual & Interesting",
  },
  {
    id: "krishna-gopal-mandloi",
    name: "Krishna Gopal Mandloi",
    image: "/faculty/cleaned/krishna-gopal-mandloi.png",
    imageWidth: 1280,
    imageHeight: 1536,
    subjects: ["SST"],
    experience: "6+ Years",
    quote: "Making Social Studies Simple, Practical & Interesting",
  },
  {
    id: "shivani-sen",
    name: "Shivani Sen",
    displayName: "Shivani Sen",
    image: "/faculty/shivani-sen-poster.png",
    imageWidth: 1280,
    imageHeight: 1536,
    subjects: ["Mathematics", "English"],
    experience: "5+ Years",
    quote: "Making Concepts Simple, Clear & Confident",
  },
  {
    id: "hemlata-yadav",
    name: "Hemlata Yadav",
    displayName: "Hemlata Yadav",
    image: "/faculty/hemlata-yadav-poster.png",
    imageWidth: 1280,
    imageHeight: 1536,
    subjects: ["SST", "Science", "Computer"],
    experience: "3+ Years",
    quote: "Making Learning Simple, Practical & Engaging",
  },
  {
    id: "shivam-pandey",
    name: "Shivam Pandey",
    image: "/faculty/shivam-pandey-history.jpg",
    imageWidth: 1536,
    imageHeight: 1280,
    subjects: ["History"],
    experience: "11 Years",
    quote: "Making History Interesting & Relevant for Real Life",
  },
  {
    id: "kratika-yadav",
    name: "Kratika Yadav",
    image: "/faculty/kratika-yadav.jpg",
    imageWidth: 1536,
    imageHeight: 1280,
    subjects: ["Hindi", "English", "Science"],
    experience: "2+ Years",
    quote: "Making Concepts Simple & Interesting",
  },
];

export function getFacultyMember(id: string) {
  return faculty.find((f) => f.id === id);
}

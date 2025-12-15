import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, User, Building } from "lucide-react"
import { getMembers } from "@/lib/members"
import MembersClient from "./members-client"

interface Member {
  id: string
  organization: string
  address: string
  headName: string
  headDesignation: string
  headEmail: string
  focalName: string
  focalDesignation: string
  focalEmail: string
  division: string
}

const sampleMembers: Member[] = [
  // Barishal Division
  {
    id: "1",
    organization: "Aid Organization",
    address: "Jaifia Plaza, Battala, Nabagram Road, Barisal",
    headName: "Md. Moniruzzaman",
    headDesignation: "Executive Director",
    headEmail: "aid.org.bsl@gmail.com",
    focalName: "Md. Moniruzzaman",
    focalDesignation: "Executive Director",
    focalEmail: "aidorgbd@gmail.com",
    division: "Barishal"
  },
  {
    id: "2",
    organization: "Association of Voluntary Actions for Society - AVAS",
    address: "AVAS Bhaban, Amirkutir Lane, Alekanda, Barisal Sadar, Barisal- 8200",
    headName: "Rahima Sultana Kazal",
    headDesignation: "Executive Director",
    headEmail: "rskazal@gmail.com",
    focalName: "Mr. Sanjay Biswas",
    focalDesignation: "Project Coordinator",
    focalEmail: "biswas.sk2@gmail.com",
    division: "Barishal"
  },
  {
    id: "3",
    organization: "Community Advancement Development Center (CDAC)",
    address: "House#199, Nirala Bhaban G/F, Sabujbag, Patuakhali- 8600",
    headName: "S.M. Shafique Elahee Chowdhury",
    headDesignation: "Executive Director",
    headEmail: "cdac.org@gmail.com",
    focalName: "Dr. Md. Golam Mostafa",
    focalDesignation: "Honorary Chief Advisor",
    focalEmail: "gmostafa2010@gmail.com",
    division: "Barishal"
  },
  {
    id: "4",
    organization: "JAGO NARI",
    address: "Ashahi Mansion (2nd Floor), College Road, Barguna- 8700",
    headName: "Hosne Ara Hasi",
    headDesignation: "Chief Executive",
    headEmail: "jago_nari@yahoo.com",
    focalName: "Mostafizur Rahman",
    focalDesignation: "Project Manager",
    focalEmail: "reecall_brg@yahoo.com",
    division: "Barishal"
  },
  {
    id: "5",
    organization: "Protibandi Unnayan Sangstha",
    address: "15 Station Road. Jhalakathi-8400",
    headName: "MD.Foysal Rahaman",
    headDesignation: "Executive Director",
    headEmail: "foysalpus@gmail.com",
    focalName: "Amir Hossin",
    focalDesignation: "Program Officer",
    focalEmail: "pus.jktbd@gmail.com",
    division: "Barishal"
  },
  {
    id: "6",
    organization: "Reach to Unreached (RUN)",
    address: "Razapur Lodge, Oxford Mission Road, Barisal",
    headName: "Md. Rafiqul Alam",
    headDesignation: "Executive Director",
    headEmail: "orgrun@gmail.com",
    focalName: "Fatema Tuz Johora",
    focalDesignation: "Program Coordinator",
    focalEmail: "orgrun@gmail.com",
    division: "Barishal"
  },
  {
    id: "7",
    organization: "SpeedTrust",
    address: "SpeedTrust, 170 Sham Babu Ln., Gora Chand Das Rd., Barishal-8200",
    headName: "AHM Shamsul Islam- Dipu",
    headDesignation: "Mission Head",
    headEmail: "islam.dipu@gmail.com",
    focalName: "AHM Shamsul Islam-Dipu",
    focalDesignation: "Education Focal",
    focalEmail: "islam.dipu@gmail.com",
    division: "Barishal"
  },
  
  // Chattogram Division
  {
    id: "8",
    organization: "Association for Women Empowerment and Child Rights- AWAC",
    address: "Rangunia College Road, Rangunia, Chattogram",
    headName: "Safiul Azam Seraje",
    headDesignation: "Chief Executive",
    headEmail: "serajeawac2012@gmail.com",
    focalName: "Sanjit Kumer Das",
    focalDesignation: "Manager-IGA",
    focalEmail: "awacrangunia@gmail.com",
    division: "Chattogram"
  },
  {
    id: "9",
    organization: "Bright Bangladesh Forum",
    address: "House # 23/B, Road # 03, Katal Gonj R /A, Panchlish, Chittagong – 4203",
    headName: "Utpal Baura",
    headDesignation: "Chief Executive",
    headEmail: "utpal@brightbangladeshforum.org",
    focalName: "Sohai Ud Doza",
    focalDesignation: "Program Manager",
    focalEmail: "sohaill@brightbangladeshforum.org",
    division: "Chattogram"
  },
  {
    id: "10",
    organization: "Center for Rural Child Development (CRCD)",
    address: "Sabuj Billa, 1505 sayed sha road, West bakalia, Chwakbazar, Chattogram",
    headName: "Quazi Iqbql Bahar Sabery",
    headDesignation: "Executive Director",
    headEmail: "crcdbd@gmail.com",
    focalName: "Roxana Momtaz",
    focalDesignation: "Program Coordinator",
    focalEmail: "crcdbd@gmail.com",
    division: "Chattogram"
  },
  {
    id: "11",
    organization: "Community Development Centre (CODEC)",
    address: "CODEC Bhaban, Plot-2, Road-2, Lake Valley R/A, Foy's Lake, Khulshi, Chattogram",
    headName: "Khursid Alam Ph.D",
    headDesignation: "Executive Director",
    headEmail: "khursidcodec@gmail.com",
    focalName: "Tasadduk Hossain Dulu",
    focalDesignation: "Deputy Director",
    focalEmail: "duluip@gmail.com",
    division: "Chattogram"
  },
  {
    id: "12",
    organization: "Dristy",
    address: "Jahanara Mansion, Moulovipara, North Agrabad, Chattogram- 4100",
    headName: "Helal Uddin Mahboob",
    headDesignation: "Chief Executive Officer",
    headEmail: "helaldristyctg@gmail.com",
    focalName: "Suraiya Parvin",
    focalDesignation: "Program Officer",
    focalEmail: "dristyctg@yahoo.com",
    division: "Chattogram"
  },
  {
    id: "13",
    organization: "Integrated Social Development Effort (ISDE) Bangladesh",
    address: "House - 84, Road- 05, Block- B, Chandgaon R/A, Chattogram",
    headName: "S M Nazer Hossain",
    headDesignation: "Executive Director",
    headEmail: "info.isdebd@gmail.com",
    focalName: "Md Jahangir Alam",
    focalDesignation: "Programme Coordinator",
    focalEmail: "jahangir.isdebd@gmail.com",
    division: "Chattogram"
  },
  {
    id: "14",
    organization: "Kids cultural institute",
    address: "864 Mehedibag Chittagong",
    headName: "Dr Md Shakhawat Ullah Chowdhury",
    headDesignation: "Chef Executive",
    headEmail: "shakhawat.uk@gmail.com",
    focalName: "Jobeda ratna",
    focalDesignation: "Program manager",
    focalEmail: "jogajogngo@gmail.com",
    division: "Chattogram"
  },
  {
    id: "15",
    organization: "SONGSHOPTAQUE",
    address: "SUFIA Tower (2nd Floor) 05, Avay Mitra Ghat Lane, Firingi Bazar, Kotwali, Chattogram-4000",
    headName: "Liton Chowdhury",
    headDesignation: "Chief Executive",
    headEmail: "litonchysst@gmail.com",
    focalName: "Agradut Dasgupta",
    focalDesignation: "Deputy Director",
    focalEmail: "agradut.songshoptaque@gmail.com",
    division: "Chattogram"
  },
  {
    id: "16",
    organization: "Sustainable Social Services in CHT (SSSCHT)",
    address: "Chittagong Hill Tracts Development Board (CHTDB), Rangamati",
    headName: "Mohammad Eyasinul Hoq",
    headDesignation: "Project Director",
    headEmail: "eyasinulhoq.chk.ctg@gmail.com",
    focalName: "A T M Shoeb Chowdhury",
    focalDesignation: "Program Coordinator",
    focalEmail: "shoeb.icdp@gmail.com",
    division: "Chattogram"
  },
  {
    id: "17",
    organization: "YPSA (Young Power in Social Action)",
    address: "House# F(10)p, Block# B, Road# 13, Chandgaon R/A, Chittagong-4212",
    headName: "Md. Arifur Rahman",
    headDesignation: "Chief Executive",
    headEmail: "ypsa_arif@yahoo.com",
    focalName: "Shyamashree Das",
    focalDesignation: "Program Manager",
    focalEmail: "ypsa.secretariat@gmail.com",
    division: "Chattogram"
  },

  // Dhaka Division (Selected - too many to list all 64)
  {
    id: "18",
    organization: "ACORD",
    address: "298 W. Brahmondi. Narsingdi",
    headName: "ABM Azraf Tipu",
    headDesignation: "Executive Director",
    headEmail: "acord.nsd@gmail.com",
    focalName: "Parvin Azraf",
    focalDesignation: "Project Director",
    focalEmail: "acord.nsd@gmail.com",
    division: "Dhaka"
  },
  {
    id: "19",
    organization: "Bangladesh Shishu Academy",
    address: "Doyel Chattor Sorak, Shahbag, Dhaka-1000",
    headName: "Dilara Begum",
    headDesignation: "Director General",
    headEmail: "dgbsa22@gmail.com",
    focalName: "Dilara Begum",
    focalDesignation: "Director General",
    focalEmail: "dgbsa22@gmail.com",
    division: "Dhaka"
  },
  {
    id: "20",
    organization: "BRAC",
    address: "75 Mohakhali, BRAC Center, Dhaka 1212",
    headName: "Mr. Safi Rahman",
    headDesignation: "Director, BRAC Education Programme",
    headEmail: "safi.khan@brac.net",
    focalName: "Moushomi Ahamed Silvi",
    focalDesignation: "Deputy Manager, BRAC Education Programme",
    focalEmail: "moushomi.ahamed@brac.net",
    division: "Dhaka"
  },
  {
    id: "21",
    organization: "BRAC Institute of Educational Development (BRAC IED)",
    address: "House: 113/A, Road: 02, Niketon, Gulshan – 1, Dhaka – 1212",
    headName: "Dr. Erum Marium",
    headDesignation: "Executive Director",
    headEmail: "erum.m@brac.net",
    focalName: "Syeda Sazia Zaman",
    focalDesignation: "Program Head",
    focalEmail: "sazia.zaman@bracu.ac.bd",
    division: "Dhaka"
  },
  {
    id: "22",
    organization: "Campaign for Popular Education (CAMPE)",
    address: "5/14 Humayun Road, Mohammadpur, Dhaka-1207",
    headName: "Rasheda K. Choudhury",
    headDesignation: "Executive Director",
    headEmail: "rasheda@campebd.org",
    focalName: "Dr. Manzoor Ahmed",
    focalDesignation: "Adviser to CAMPE Council",
    focalEmail: "amahmed40@yahoo.com",
    division: "Dhaka"
  },
  {
    id: "23",
    organization: "Centre for Disability in Development (CDD)",
    address: "A-18/6, Genda, Savar, Dhaka",
    headName: "A H M Noman Khan",
    headDesignation: "Executive Director",
    headEmail: "noman50@gmail.com",
    focalName: "Sk. Md. Faisal Hossain",
    focalDesignation: "ECD Focal Person (CDD), Project Manager, SMILE Project",
    focalEmail: "amirfaisal18@gmail.com",
    division: "Dhaka"
  },
  {
    id: "24",
    organization: "Plan International Bangladesh",
    address: "House CWN(B) 14, Road 35, Gulshan-2, Dhaka – 1212",
    headName: "Kabita Bose",
    headDesignation: "Country Director",
    headEmail: "Kabita.Bose@plan-international.org",
    focalName: "Ahsan Mahmud",
    focalDesignation: "Advisor – Early Childhood Development and Inclusive Education",
    focalEmail: "Ahsan.Mahmud@plan-international.org",
    division: "Dhaka"
  },
  {
    id: "25",
    organization: "Save the Children",
    address: "House No, CWN(A)35, Road No -43, Gulshan-2, Dhaka-1212",
    headName: "Onno Van Manen",
    headDesignation: "Country Director - Bangladesh",
    headEmail: "Onno.VanManen@savethechildren.org",
    focalName: "Zannatun Nahar",
    focalDesignation: "Manager – ECCD, Shishuder Jonno Program, Education",
    focalEmail: "zannatun.nahar@savethechildren.org",
    division: "Dhaka"
  },
  {
    id: "26",
    organization: "UNICEF",
    address: "UNICEF House, Plot E-30, Syed Mahbub Morshed Avenue, Sher-e-Bangla Nagar, Dhaka 1207",
    headName: "Rana Flowers",
    headDesignation: "Representative",
    headEmail: "rflowers@unicef.org",
    focalName: "Iffat Farhana",
    focalDesignation: "Education Officer",
    focalEmail: "ifarhana@unicef.org",
    division: "Dhaka"
  },
  {
    id: "27",
    organization: "UNESCO",
    address: "UNESCO Dhaka Office, House 122, Road 1, Block F, Banani, Dhaka 1213",
    headName: "Beatrice Kaldun",
    headDesignation: "Head of Office and UNESCO Representative to Bangladesh",
    headEmail: "b.kaldun@unesco.org",
    focalName: "Mahfuza Rahman",
    focalDesignation: "Project Officer - Education",
    focalEmail: "ma.rahman@unesco.org",
    division: "Dhaka"
  },
  {
    id: "28",
    organization: "World Vision Bangladesh",
    address: "Abedin Tower, 35, Kemal Ataturk Avenue, Banani, Dhaka 1213",
    headName: "Suresh Bertlett",
    headDesignation: "National Director",
    headEmail: "suresh_bertlett@wvi.org",
    focalName: "Tapon Philip Rodrigues",
    focalDesignation: "Sr. Technical Manager-Education & Child Protection",
    focalEmail: "TaponRodrigues@wvi.org",
    division: "Dhaka"
  },

  // Khulna Division (Sample)
  {
    id: "29",
    organization: "Jagorani Chakra Foundation (JCF)",
    address: "46, Mujib Sarak, Jashore",
    headName: "Md. Azadul Kabir Arzoo",
    headDesignation: "Executive Director",
    headEmail: "es@jcf.org.bd",
    focalName: "Kazi Mazed Nawaz",
    focalDesignation: "Director (Programs)",
    focalEmail: "kazimazednawaz@yahoo.com",
    division: "Khulna"
  },

  // Rajshahi Division (Sample)
  {
    id: "30",
    organization: "Access toward Livelihood and Welfare Organisation (ALWO)",
    address: "81/01, Hazra, Post: Natore- 6400, P.S: Natore, Dist: Natore",
    headName: "Shamima Laizu Neela",
    headDesignation: "Executive Director",
    headEmail: "alwonat@gmail.com",
    focalName: "Shamima Laizu Neela",
    focalDesignation: "Executive Director",
    focalEmail: "alwonat@gmail.com",
    division: "Rajshahi"
  },

  // Rangpur Division (Sample)
  {
    id: "31",
    organization: "Bangladesh Rural Improvement Foundation (BRIF)",
    address: "BRIF Campus, Goaldihi, Khansama, Dinajpur",
    headName: "Shah Ahsan Habib",
    headDesignation: "Executive Director",
    headEmail: "habib@brif.org",
    focalName: "Farzana Islam",
    focalDesignation: "Coordinator",
    focalEmail: "info@brif.org",
    division: "Rangpur"
  },

  // Sylhet Division (Sample)
  {
    id: "32",
    organization: "ASED HABIGONJ",
    address: "Srabon Vila, House # 5485/3, Koborstan Road, Rajnagar Residential Area, Habigonj",
    headName: "JAFAR IQBAL CHOWDHURY",
    headDesignation: "Chief Executive",
    headEmail: "jafar@asedbd.org",
    focalName: "Jamil Mustaque",
    focalDesignation: "Chief of Program",
    focalEmail: "jamil.mustaque@gmail.com",
    division: "Sylhet"
  },
]

export default async function MembersPage() {
  // Load all members from CSV
  const allMembers = await getMembers()
  const members = allMembers.length > 0 ? allMembers : sampleMembers

  return (
    <div className="flex flex-col">
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Member Organizations</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Bangladesh ECD Network comprises {members.length} member organizations across the country, including Government agencies, UN agencies, academic institutes, research institutes, national and international organizations, and local NGOs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <MembersClient initialMembers={members} />
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              
              <span className="font-bold text-lg">Bangladesh ECD Network (BEN)</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
               Building partnership for Early Childhood Development (ECD).
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/bangladeshecdnetwork/" className="text-primary-foreground/80 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/bangladeshecdnetwork/" className="text-primary-foreground/80 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://www.linkedin.com/company/bangladesh-ecd-network/" className="text-primary-foreground/80 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://www.youtube.com/@BangladeshECDNetwork" className="text-primary-foreground/80 hover:text-primary-foreground" target="_blank" rel="noopener noreferrer">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/members" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                  Our Members
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/media/news" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                  News & Events
                </Link>
              </li>
              <li>
                <Link href="/learning" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                  Learning Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources/research-reports"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Research & Reports
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/newsletter"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  href="/resources/policies"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Policies & Links
                </Link>
              </li>
              <li>
                <Link
                  href="/media/gallery"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-8 w-8 mt-1 text-primary-foreground/80" />
                <div className="text-sm text-primary-foreground/80">
                  <p>House 113, Road 2, Block A, Niketon, Gulshan 1, Dhaka 1212, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h8 w-8 text-primary-foreground/80" />
                <a
                  href="mailto:bangladehecdnetwork@gmail.com"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  bangladehecdnetwork@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-sm text-primary-foreground/80">Tel: +88 02 58810627</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-sm text-primary-foreground/80">Mob: +88 017 3825 9267</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/80">© 2026 Bangladesh ECD Network (BEN). All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/images/PP.pdf" target="_blank" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                Privacy Policy
              </Link>
              <Link href="/images/ToS.pdf" target="_blank" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

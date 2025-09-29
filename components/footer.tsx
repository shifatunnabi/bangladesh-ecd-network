import Link from "next/link"
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary-foreground flex items-center justify-center">
                <span className="text-primary font-bold text-sm">BD</span>
              </div>
              <span className="font-bold text-lg">Bangladesh ECD Network</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              A professional network focused on improving outcomes for young children and their caregivers in
              Bangladesh.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
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
                <MapPin className="h-4 w-4 mt-1 text-primary-foreground/80" />
                <div className="text-sm text-primary-foreground/80">
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-foreground/80" />
                <a
                  href="mailto:info@bangladeshecdnetwork.org"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground"
                >
                  info@bangladeshecdnetwork.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-foreground/80" />
                <span className="text-sm text-primary-foreground/80">+880 1XXX-XXXXXX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/80">© 2024 Bangladesh ECD Network. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-primary-foreground/80 hover:text-primary-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

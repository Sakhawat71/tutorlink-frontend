import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                {/* Logo & Description */}
                <div>
                    <h2 className="text-2xl font-bold text-white">TutorLink</h2>
                    <p className="mt-2 text-sm">
                        Connecting students with expert tutors for personalized learning. Empower your education with ease and trust.
                    </p>
                </div>

                {/* Explore Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Explore</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/tutors">Find Tutors</Link></li>
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/about">About</Link></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/help">Help Center</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                        <li><Link href="/privacy">Privacy Policy</Link></li>
                        <li><Link href="/terms">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
                    <div className="flex space-x-4 mt-2">
                        <Link href="https://facebook.com" target="_blank"><FaFacebook size={20} /></Link>
                        <Link href="https://twitter.com" target="_blank"><FaTwitter size={20} /></Link>
                        <Link href="https://github.com/Sakhawat71" target="_blank"><FaGithub size={20} /></Link>
                        <Link href="https://linkedin.com/in/s3h" target="_blank"><FaLinkedin size={20} /></Link>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-400">
                © {new Date().getFullYear()} TutorLink — All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

import Link from "next/link";
import { FiSun, FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-20">
      <div className="footer p-10 max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FiSun className="text-primary text-3xl" />
            <span className="font-black text-2xl text-primary">SunCart</span>
          </div>
          <p>
            SunCart Summer Store Ltd.
            <br />
            Providing reliable summer essentials since 2024
          </p>
        </div>
        
        <div>
          <span className="footer-title">Contact Info</span>
          <a className="link link-hover flex items-center gap-2"><FiMapPin /> Adabor, Shymoli, Mohammodpur</a>
          <a className="link link-hover flex items-center gap-2"><FiPhone /> +8801234567891</a>
          <a className="link link-hover flex items-center gap-2"><FiMail /> contact@sunchart.com</a>
        </div>
        
        <div>
          <span className="footer-title">Legal</span>
          <Link href="#" className="link link-hover">Terms of use</Link>
          <Link href="#" className="link link-hover">Privacy policy</Link>
          <Link href="#" className="link link-hover">Cookie policy</Link>
        </div>
      </div>
      
      <div className="footer px-10 py-4 border-t border-base-300 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="items-center grid-flow-col">
          <p>© 2024 SunCart. All rights reserved.</p>
        </div> 
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="#" className="text-2xl hover:text-primary transition-colors"><FiTwitter /></a>
            <a href="#" className="text-2xl hover:text-primary transition-colors"><FiFacebook /></a>
            <a href="#" className="text-2xl hover:text-primary transition-colors"><FiInstagram /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

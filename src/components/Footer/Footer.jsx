import amazonPayLogo from "../../assets/images/amazon-pay.png"
import amercanExpressLogo from "../../assets/images/American-Express-Color.png"
import masterCardLogo from "../../assets/images/mastercard.webp"
import payPalLogo from "../../assets/images/paypal.png"
import appleStoreLogo from "../../assets/images/get-apple-store.png"
import googlePlayLogo from "../../assets/images/get-google-play.png"




export default function Footer() {
  return <>
    <footer className="bg-slate-100 py-8 ">
      <div className="container space-y-4">
      <header>
        <h2 className="text-xl font-semibold text-slate-800">Get The Freshcart App</h2>
        <p className="text-slate-400">We Will Send You a Link, Open It In Your Phone To Download The App</p>
      </header>
      <div className="flex gap-2 ">
        <input className="form-control grow" type="email" placeholder="Email Address" />
        <button className="btn uppercase bg-primary-800 hover:bg-primary-900 text-white font-semibold text-sm">Share App Link</button>
      </div>
      <div className="flex justify-between items-center py-4 border-y-2 border-slate-300 border-opacity-50">
        <div className="payment-partenrs flex items-center gap-3">
          <h3>Payment Partenrs</h3>
          <img className="w-20" src={amazonPayLogo} alt="" />
          <img className="w-20" src={amercanExpressLogo} alt="" />
          <img className="w-14" src={masterCardLogo} alt="" />
          <img className="w-20" src={payPalLogo} alt="" />



        </div>
        <div className="download flex gap-3 items-center">
          <h3>Get Deliveries With Freshcart</h3>
          <img className="w-24" src={appleStoreLogo} alt="" />
          <img className="w-[110px]" src={googlePlayLogo} alt="" />
        </div>
      </div>
      </div>
     
    </footer>

  </>


}

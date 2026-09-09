import MobileCheckoutIntro from "./mobile-checkout/mobile-checkout-intro";
import MobileQrCode from "./mobile-checkout/mobile-qr-code";
import ProcessSteps from "./ProcessSteps";

export default function MobileCheckout() {
  return (
    <section className="bg-sky-50/70 bg-dotted py-30 px-40 border-t border-gray-500/20 grid grid-cols-[55%_auto] gap-30">
      <div>
        <MobileCheckoutIntro />
        <ProcessSteps />
      </div>

      <MobileQrCode />
    </section>
  );
}

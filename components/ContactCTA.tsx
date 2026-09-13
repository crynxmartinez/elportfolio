import Link from "next/link";
export default function ContactCTA() {
  return (
    <section className="contact-band">
      <div className="wide contact-grid">
        <div>
          <p className="eyebrow">Your next chapter</p>
          <h2>
            Let’s make your
            <br />
            website work <em>together.</em>
          </h2>
        </div>
        <div>
          <p>
            Have a website that needs a fresh start, or a system that needs
            connecting? Tell me where you are and what you want to improve.
          </p>
          <Link className="button button-dark" href="/contact">
            Discuss my website ↗
          </Link>
          <span className="small-note">
            A conversation first. A clear scope before we start.
          </span>
        </div>
      </div>
    </section>
  );
}

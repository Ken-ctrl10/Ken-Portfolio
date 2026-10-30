function ContactCard({ item, IconComponent }) {
  return <a
    href={item.href}
    className={`contact-card ${item.primary ? "contact-card-primary" : ""}`}
    // undefined, not `false`: `item.external && "_blank"` rendered
    // target="false" on every internal link.
    target={item.external ? "_blank" : undefined}
    rel={item.external ? "noopener noreferrer" : undefined}
    aria-label={item.label}
  >
    <span className="contact-card-icon">{IconComponent && <IconComponent />}</span>
    <div className="contact-card-text">
      <h3>{item.label}</h3>
      <p>{item.helper}</p>
    </div>
  </a>
}

export default ContactCard;
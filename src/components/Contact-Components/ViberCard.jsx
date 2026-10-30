import QrCode2Icon from "@mui/icons-material/QrCode2";

function ViberCard({onOpen}) {
  return (
    <button
      type="button"
      className="contact-card"
      onClick={onOpen}
      aria-label="Open Viber QR code"
    >
      <span className="contact-card-icon">
        <QrCode2Icon />
      </span>

      <div className="contact-card-text">
        <h3>Viber</h3>
        <p>Open QR code</p>
      </div>
    </button>
  );
}

export default ViberCard;
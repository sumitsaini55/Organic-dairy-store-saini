import React from "react";

const Footer = () => {
  return (
    <footer className="footer-section py-4">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <span className="small text-muted">
          © {new Date().getFullYear()} OrganicDairy. All rights reserved.
        </span>
        <span className="small text-muted">
          Crafted with 💚 in India • 100% organic dairy
        </span>
      </div>
    </footer>
  );
};

export default Footer;
